import type { FilterType } from './FilterType';

export default interface ICriteria {
  orderBy(): string;
  orderType(): string;
  fields(): string[];
  filters(): FilterType[];
  joins(): string[];
  offset(): number;
  limit(): number;
}
