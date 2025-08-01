import prisma from '../../../../../app/db';
import { Content } from '@google/genai';

export default class MCPRepository {
  async saveConversation(
    accountId: number,
    conversation: Content[]
  ): Promise<void> {
    this.cleanConversations(accountId);
    const jsonConversation = JSON.stringify(conversation);
    await prisma.conversation_history.create({
      data: {
        account_id: accountId,
        conversation: jsonConversation,
      },
    });
  }

  async getConversations(accountId: number): Promise<Content[]> {
    const history = await prisma.conversation_history.findFirst({
      where: { account_id: accountId },
    });
    if (!history || !history.conversation) {
      return [];
    }
    if (typeof history.conversation === 'string') {
      return JSON.parse(history.conversation) as Content[];
    }
    return history.conversation as Content[];
  }

  async cleanConversations(accountId: number): Promise<void> {
    await prisma.conversation_history.deleteMany({
      where: { account_id: accountId },
    });
  }
}
