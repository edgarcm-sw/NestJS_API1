import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCar, UpdateCar } from 'src/models/car.model';
import { UppercasePipe } from '../pipes/upper-case/upper-case.pipe';

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carService.findAllCars();
  }

  @Get(':id')
  getCarsById(@Param('id', ParseIntPipe) id: number) {
    return this.carService.getCarById(id);
  }

  @Post()
  createCar(@Body() createCar: CreateCar) {
    return this.carService.createCar(createCar);
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCar: UpdateCar,
  ) {
    return this.carService.updateCar(id, updateCar);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return this.carService.deleteCar(id);
  }

  @Get(':id/:model')
  getModelByCarId(
    @Param('id', ParseIntPipe) id: number,
    @Param('model', UppercasePipe) model: string,
  ) {
    return { id, model };
  }
}