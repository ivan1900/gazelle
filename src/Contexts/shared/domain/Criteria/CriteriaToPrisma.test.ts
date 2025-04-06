import Criteria from './Criteria';
import CriteriaToPrisma from './CriteriaToPrisma';

describe('CriteriaToPrisma', () => {
  it('should convert Criteria to Prisma query correctly', () => {
    const clientId = 123;
    const take = 10;

    const criteria = new Criteria({
      filters: [
        {
          field: 'client_id',
          operator: 'gt',
          value: clientId,
        },
        {
          field: 'usual_retail',
          operator: 'eq',
          value: '',
          isOr: true,
        },
        {
          field: 'usual_retail',
          operator: 'eq',
          value: null,
          isOr: true,
        },
      ],
      order: {
        by: 'id',
        type: 'asc',
      },
      limit: take,
    });

    const expectedQuery = {
      where: {
        AND: [{ client_id: { gt: clientId } }],
        OR: [
          { usual_retail: { equals: '' } },
          { usual_retail: { equals: null } },
        ],
      },
      orderBy: {
        id: 'asc',
      },
      take,
    };

    const prismaQuery = CriteriaToPrisma.convert(criteria);

    expect(JSON.stringify(prismaQuery)).toEqual(JSON.stringify(expectedQuery));
  });
});
