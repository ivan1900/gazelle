import { ValueObject } from './ValueObject';

export default class EnumValueObject<T> {
  readonly value: T;

  constructor(
    value: T,
    public readonly validValues: T[]
  ) {
    this.value = value;
  }

  public checkIsValidValue(value: T): void {
    if (!this.validValues.includes(value)) {
      throw new Error(`Invalid value for ${this.constructor.name}`);
    }
  }
}
