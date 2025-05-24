export interface FilterType {
  field: string;
  operator: operatorType;
  value: string | string[] | number | number[] | Date | null;
  isOr?: boolean;
}

export const operators = {
  eq: 'eq',
  eqc: 'eqc',
  ne: 'ne',
  lt: 'lt',
  lte: 'lte',
  gt: 'gt',
  gte: 'gte',
  in: 'in',
  notIn: 'notIn',
  contains: 'contains',
  nonContains: 'nonContains',
  containsc: 'containsc',
  // null: 'null',
  notNull: 'notNull',
  between: 'between',
  notBetween: 'notBetween',
  startsWith: 'startsWith',
  startsWithc: 'startsWithc',
  endsWith: 'endsWith',
  endsWithc: 'endsWithc',
  or: 'or',
  and: 'and',
} as const;

export const arrayOperators = ['in', 'notIn'];

export type operatorType = (typeof operators)[keyof typeof operators];
