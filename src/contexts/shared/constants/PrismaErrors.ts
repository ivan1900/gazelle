import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { unknown } from 'zod';

const PrismaErrors: { [key: string]: string } = {
  P2002: 'No se pudo guardar, ya existe un registro con el mismo nombre o id',
  P2024: 'No se pudo establecer conexión con la base de datos',
  P2025: 'El registro no existe',
  unknown: 'Error desconocido',
};

const prismaErrorMessage = (code: string): string => {
  return PrismaErrors[code] ?? 'Error desconocido';
};

export const prismaErrorHandle = (e: unknown): string => {
  console.error(
    e instanceof PrismaClientKnownRequestError ? e.message : 'unknown error'
  );
  if (e instanceof PrismaClientKnownRequestError) {
    return prismaErrorMessage(e.code);
  }
  return prismaErrorMessage('unknown');
};
