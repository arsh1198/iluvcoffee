import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from 'src/entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Desi Chaii',
      brand: 'Baba',
      flavors: ['Elaichi', 'Saunf', 'Gud', 'Cinamon'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with id - ${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCofeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      return [...this.coffees, { ...existingCoffee, ...updateCofeeDto }];
    }
  }

  delete(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
