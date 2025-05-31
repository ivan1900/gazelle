import ActivityCreator from '@/Contexts/Activity/application/ActivityCreator';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import { NextRequest, NextResponse } from 'next/server';
import { ActivityDto } from '@/Contexts/Activity/domain/AcitvityDto';
import { ActivityStatusOption } from '@/Contexts/shared/domain/constants/ActivityStatus';

export async function POST(request: NextRequest) {
  try {
    const { name, description, activityTypeId, accountId } =
      await request.json();
    const activityDto: ActivityDto = {
      name,
      description,
      status: ActivityStatusOption.WAITING,
      activityTypeId,
      accountId,
    };
    const creator = new ActivityCreator(new ActivityRepositoryPrisma());
    const activity = await creator.exec(activityDto);

    if (!activity) {
      return NextResponse.json(
        { error: 'Failed to create activity' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Activity created successfully',
        activity: {
          id: activity.id,
          name: activity.name,
          description: activity.description,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
