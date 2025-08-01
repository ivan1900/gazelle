import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { GoogleGenAI, Content, mcpToTool } from '@google/genai';
import MCPRepository from './repository/mcpRepository';

const LIMIT_HISTORY = 10;

export default class MCPClientGenAi {
  private mcp: Client;
  private llm: GoogleGenAI;
  private transport: StdioClientTransport;
  private conversationHistory: Content[];
  private repository: MCPRepository;
  private accountId: number;

  constructor(accountId: number, serverScriptPath: string) {
    this.accountId = accountId;
    this.llm = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || '',
    });
    this.mcp = new Client({ name: 'Gazelle', version: '0.1.0' });
    this.transport = new StdioClientTransport({
      command: 'npx',
      args: serverScriptPath.split(' '),
    });
    this.conversationHistory = [];
    this.repository = new MCPRepository();
  }

  async connectToServer(): Promise<void> {
    await this.mcp.connect(this.transport);
  }

  async processQuery(query: string): Promise<string> {
    const history = await this.repository.getConversations(this.accountId || 0);
    if (history.length > LIMIT_HISTORY) {
      history.shift();
    }
    if (history && history.length > 0) {
      this.conversationHistory = history;
    }
    const userContent: Content = { role: 'user', parts: [{ text: query }] };
    const content = [...this.conversationHistory, userContent];

    const modelResponse = await this.llm.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: content,
      config: {
        maxOutputTokens: 1000,
        tools: [mcpToTool(this.mcp)],
      },
    });

    const responseText =
      modelResponse.text || 'No se pudo procesar la consulta.';

    // Actualizar el historial de conversación para respuestas sin function calls
    this.conversationHistory.push(userContent, {
      role: 'model',
      parts: [{ text: responseText }],
    });

    this.repository.saveConversation(this.accountId, this.conversationHistory);

    console.log(`history:`, this.getHistory());

    this.cleanup();
    return responseText;
  }

  async cleanup(): Promise<void> {
    await this.mcp.close();
  }

  getHistory(): Content[] {
    return [...this.conversationHistory];
  }
}
