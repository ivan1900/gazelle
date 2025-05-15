'use server';

import ReportByTypes from '@/Contexts/Activity/application/ReportByTypes';
import isUserAuth from '../../shared/checkUserAuth';
import { TimeByTypes } from '../../shared/types/TimeByTipes';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';

export default async function getTimeByTypes(dateRange: {
  from: Date;
  to: Date;
}): Promise<TimeByTypes[]> {
  try {
    const session = await isUserAuth();
    const report = new ReportByTypes(new ActivityRepositoryPrisma());
    const timeByTypesReport = await report.execute({
      from: dateRange.from,
      to: dateRange.to,
      accountId: session.user.accountId,
    });
    return timeByTypesReport;
  } catch (e) {
    console.error(e);
    return [];
  }
}
