'use server';
import isUserAuth from '../../shared/checkUserAuth';
import { ActionResponse } from '../../shared/responseAction';
import MCPRepository from './repository/mcpRepository';

export default async function mcpCleanHistory(): Promise<ActionResponse> {
  try {
    const session = await isUserAuth();
    if (!session) {
      throw new Error('No session found');
    }

    const repository = new MCPRepository();
    await repository.cleanConversations(session.user.accountId);

    return {
      ok: true,
      message: 'Historial de conversaciones limpiado exitosamente.',
    };
  } catch (error) {
    console.error('Error cleaning conversation history:', error);
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : 'Error al limpiar el historial de conversaciones',
    };
  }
}
