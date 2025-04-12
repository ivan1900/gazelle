import { FilterType } from './FilterType';
import type ICriteria from './ICriteria';
import type OrderType from './OrderType';

interface CriteriaParams {
  fields?: string[]; // todo define type (fieldType) or delete if not nedeed
  filters?: FilterType[];
  joins?: string[]; // todo define type (joinType) or delete if not nedeed
  order?: OrderType;
  offset?: number;
  limit?: number;
}

export default class Criteria implements ICriteria {
  private _order: OrderType;
  private _fields: string[];
  private _filters: FilterType[];
  private _joins: string[];
  private _offset: number;
  private _limit: number;

  constructor(params: CriteriaParams) {
    this._order = params.order || { by: '', type: '' };
    this._fields = params.fields || [];
    this._filters = params.filters || [];
    this._joins = params.joins || [];
    this._offset = params.offset || 0;
    this._limit = params.limit || 0;
  }

  static create(params: CriteriaParams): Criteria {
    return new Criteria(params);
  }

  orderBy(): string {
    return this._order.by;
  }

  orderType(): string {
    return this._order.type;
  }

  fields(): string[] {
    return this._fields;
  }

  filters(): FilterType[] {
    return this._filters;
  }

  joins(): string[] {
    return this._joins;
  }

  offset(): number {
    return this._offset;
  }

  limit(): number {
    return this._limit;
  }
}
