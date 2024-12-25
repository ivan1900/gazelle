'use server';
import { ActivityTypeDto } from '@/Contexts/ActivityType/domain/ActivityTypeDto';
import ActivityTypeCreator from '@/Contexts/ActivityType/application/ActivityTypeCreator';
import ActivityTypeRepositoryPrisma from '@/Contexts/ActivityType/repository/ActivityTypeRepositoryPrimsa';
import { ResponseAction } from '@/Contexts/shared/responseAction';
import { z } from 'zod';
import { getServerAuthSession } from '../../auth/auth';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'introduce un nombre de al menos 3 caracteres' }),
  isProductive: z.boolean(),
  color: z
    .string()
    .startsWith('#', { message: 'Introduce un color rgb valido' })
    .min(3, { message: 'El color debe tener al menos 3 caracteres' }),
});

const CreateActivityType = FormSchema;

export async function createActivityType(
  prevState: ResponseAction,
  formDate: FormData
): Promise<ResponseAction> {
  const session = await getServerAuthSession();
  if (!session) {
    redirect('/login');
  }
  const validateFields = CreateActivityType.safeParse({
    name: formDate.get('name') as string,
    color: formDate.get('color') as string,
    isProductive: !formDate.get('isProductive') ? false : true,
  });
  if (!validateFields.success) {
    console.log(validateFields.error);
    const errors = validateFields.error.errors.map((error) => error.message);
    return {
      message: errors.join(', '),
      ok: false,
    };
  }

  const dto: ActivityTypeDto = {
    name: validateFields.data.name,
    isProductive: validateFields.data.isProductive,
    accountId: session.user.accountId,
    color: validateFields.data.color,
  };
  const activityTypeCreator = new ActivityTypeCreator(
    new ActivityTypeRepositoryPrisma()
  );
  try {
    const result = await activityTypeCreator.exec(dto);
    if (result) {
      return {
        ok: true,
        message: 'Tipo de actividad creada',
      };
    }
    return {
      ok: false,
      message: 'La creación del tipo de actividad ha fallado',
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        ok: false,
        message: e.message,
      };
    }
    return {
      ok: false,
      message: 'Error desconocido',
    };
  }
}
