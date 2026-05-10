import { Prisma } from '@/generated/prisma/client';

type PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
const PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;

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
  console.error('[prismaErrorHandle]', e);

  // instanceof may fail across module instances; fall back to duck-typing
  if (e instanceof PrismaClientKnownRequestError) {
    return prismaErrorMessage(e.code);
  }

  // Duck-typed fallback for PrismaClientKnownRequestError
  if (
    e &&
    typeof e === 'object' &&
    'code' in e &&
    typeof (e as { code: unknown }).code === 'string'
  ) {
    const code = (e as { code: string }).code;
    if (code.startsWith('P')) {
      return prismaErrorMessage(code);
    }
  }

  // PrismaClientValidationError — bad input types / missing required fields
  if (
    e &&
    typeof e === 'object' &&
    'name' in e &&
    (e as { name: unknown }).name === 'PrismaClientValidationError'
  ) {
    return 'Datos inválidos en la solicitud';
  }

  return prismaErrorMessage('unknown');
};
