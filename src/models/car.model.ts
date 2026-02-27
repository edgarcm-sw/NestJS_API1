export class Car {
  id: number;
  name: string;
  model: number;
}

export class CreateCar {
  readonly name: string;
  readonly model: number;
}

export class UpdateCar {
  readonly name?: string;
  readonly model?: number;
}