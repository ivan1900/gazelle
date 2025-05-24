import { ActivityStatusOption } from '@/Contexts/shared/domain/constants/ActivityStatus';
import Criteria from '@/Contexts/shared/domain/Criteria/Criteria';

export default class ActivitySpec {
  static isSatisfiedByIds(ids: number[]): Criteria {
    const criteria = Criteria.create({
      filters: [
        {
          field: 'id',
          operator: 'in',
          value: ids,
        },
      ],
    });
    return criteria;
  }

  static isSatisfiedByStatusOnProgress(account_id: number): Criteria {
    const criteria = Criteria.create({
      filters: [
        {
          field: 'status',
          operator: 'ne',
          value: ActivityStatusOption.COMPLETED,
        },
        {
          field: 'account_id',
          operator: 'eq',
          value: account_id,
        },
      ],
    });
    return criteria;
  }
}
