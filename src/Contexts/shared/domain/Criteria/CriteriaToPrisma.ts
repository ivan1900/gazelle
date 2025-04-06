import type { FilterType } from './FilterType';
import ICriteria from './ICriteria';

interface PrismaQuery {
  where?: Record<string, any>;
  orderBy?: Record<string, any>;
  take?: number;
  skip?: number;
  select?: Record<string, boolean>;
}

export default class CriteriaToPrisma {
  static convert(criteria: ICriteria): PrismaQuery {
    const query: PrismaQuery = {};

    // Handle filters
    if (criteria.filters().length > 0) {
      query.where = this.buildWhere(criteria.filters());
    }

    // Handle order
    if (criteria.orderBy() && criteria.orderType()) {
      query.orderBy = {
        [criteria.orderBy()]: criteria.orderType(),
      };
    }

    // Handle limit and offset
    if (criteria.limit() > 0) {
      query.take = criteria.limit();
    }
    if (criteria.offset() > 0) {
      query.skip = criteria.offset();
    }

    // Handle selected fields
    if (criteria.fields().length > 0) {
      query.select = criteria.fields().reduce(
        (acc, field) => {
          acc[field] = true;
          return acc;
        },
        {} as Record<string, boolean>,
      );
    }

    return query;
  }

  private static buildWhere(filters: FilterType[]): Record<string, any> {
    const where: Record<string, any> = {};

    filters.forEach((filter) => {
      const { field, operator, value, isOr } = filter;

      const condition = this.mapOperatorToPrisma(operator, value);

      if (isOr) {
        where.OR = where.OR || [];
        where.OR.push({ [field]: condition });
      } else {
        where.AND = where.AND || [];
        where.AND.push({ [field]: condition });
      }
    });
    return where;
  }

  private static mapOperatorToPrisma(
    operator: string,
    value: any,
  ): Record<string, any> {
    switch (operator) {
      case 'eq':
        return { equals: value };
      case 'ne':
        return { not: value };
      case 'lt':
        return { lt: value };
      case 'lte':
        return { lte: value };
      case 'gt':
        return { gt: value };
      case 'gte':
        return { gte: value };
      case 'in':
        return { in: value };
      case 'notIn':
        return { notIn: value };
      case 'contains':
        return { contains: value };
      case 'startsWith':
        return { startsWith: value };
      case 'endsWith':
        return { endsWith: value };
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }
}
