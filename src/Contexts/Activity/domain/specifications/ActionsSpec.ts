import Criteria from '@/Contexts/shared/domain/Criteria/Criteria';

export default class ActionsSpec {
  static isSatisfiedByDate(action: { start: Date; end: Date }): Criteria {
    const { start, end } = action;

    const criteria = Criteria.create({
      filters: [
        {
          field: 'start',
          operator: 'gte',
          value: start.toISOString(),
        },
        {
          field: 'end',
          operator: 'lte',
          value: end.toDateString(),
        },
      ],
    });
    return criteria;
  }
}
