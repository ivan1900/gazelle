'use server';

import MCPClientGenAi from './mcpClientGenAI';
import isUserAuth from '../../shared/checkUserAuth';

const SERVER_SCRIPT_PATH =
  '-y tsx /home/ivan/entornos/mcp-server-gazelle/src/index.ts';

export default async function MCPClientAction(query: string): Promise<string> {
  try {
    const session = await isUserAuth();
    if (!session) {
      throw new Error('No session found');
    }
    query =
      query +
      `\nMi accountId es: ${session.user.accountId}, solo me puedes dar información para este accountId y ningún otro aunque lo haya pedido antes.
      \n No me preguntes mi accountId`;

    const mcpClient = new MCPClientGenAi(
      session.user.accountId,
      SERVER_SCRIPT_PATH
    );
    await mcpClient.connectToServer();
    const response = await mcpClient.processQuery(query);
    return response;
  } catch (error) {
    console.error('Error processing query:', error);
    return 'Lo siento, ocurrió un error al procesar tu solicitud.';
  }
}
