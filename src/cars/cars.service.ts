import { Injectable, NotFoundException } from '@nestjs/common';
import { Car, CreateCar, UpdateCar } from 'src/models/car.model';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: 1, name: 'Toyota', model: 2025 },
    { id: 2, name: 'Tesla', model: 2025 },
    { id: 3, name: 'Mazda', model: 2025 },
  ];

  findAllCars() {
    return this.cars;
  }

  getCarById(id: number): Car {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id: ${id} doesn't exist`);
    return car;
  }

  createCar(createCar: CreateCar): Car {
    const nextId = this.cars.length > 0 
      ? Math.max(...this.cars.map((c) => c.id)) + 1 
      : 1;

    const newCar: Car = {
      id: nextId,
      ...createCar,
    };

    this.cars.push(newCar);
    return newCar;
  }

  updateCar(id: number, updateCarDto: UpdateCar): Car {
    let car = this.getCarById(id);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        car = { ...car, ...updateCarDto, id };
        return car;
      }
      return car;
    });

    return car;
  }

  deleteCar(id: number) {
    this.getCarById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return { status: 'deleted', id };
  }
}