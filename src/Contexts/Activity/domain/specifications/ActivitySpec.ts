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
}
