import { NextRequest, NextResponse } from 'next/server';
import { GetActivityType } from '@/Contexts/ActivityType/application/GetActivityType';
import ActivityTypeRepositoryPrisma from '@/Contexts/ActivityType/repository/ActivityTypeRepositoryPrimsa';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('account_id');

    if (!accountId) {
      return NextResponse.json(
        { error: 'AccountId parameter is required' },
        { status: 400 }
      );
    }

    const accountIdNumber = parseInt(accountId);
    if (isNaN(accountIdNumber)) {
      return NextResponse.json(
        { error: 'AccountId must be a valid number' },
        { status: 400 }
      );
    }

    // Obtener activityTypes del usuario
    const repository = new ActivityTypeRepositoryPrisma();
    const getActivityType = new GetActivityType(repository);
    const activityTypes = await getActivityType.exec(accountIdNumber);

    return NextResponse.json(
      {
        message: 'Activity types retrieved successfully',
        activityTypes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error getting activity types:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve activity types' },
      { status: 500 }
    );
  }
}
