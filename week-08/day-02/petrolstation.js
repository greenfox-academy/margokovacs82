'use strict';
// Create and object called car
//  - It should store its petrol level called petrolLevel
//  - It should store its petrol capacity called petrolCapacity
//  - It should have a refill(amount) method, that increments the petrol level,
//    than returns how much petrol it consumed from the given amount
//  - Initialize the petrol level to zero and the capacity to 50 

const car = {
  petrolLevel: 0,
  petrolCapacity: 50,
  consumption: 0.12,
  km: 35,
  refill: function (amount) {
    this.petrolLevel += amount;
    amount -= this.km * this.consumption; 
  },
  ride: function (km) {
    this.kms += km;
    this.petrolLevel -= km * this.consumption; 
  }
};

// Create an object called station
//  - It should store petrol amount called petrolStorage
//  - It should have a provide(car) method that calls the refill method of the car
//    with the stored petrol amount as a parameter, then decrement the used petrol
//  - Initialize the petrol amount to 3000

const station = {
  petrolStorage: 3000,
  provide: function (car) {
    const amount = car.petrolCapacity - car.petrolLevel;   
    car.refill(amount);
      this.petrolStorage -= amount;
      return this.petrolStorage;
   } 
}

console.log(car.petrolLevel);
car.refill(30);
console.log(car.petrolLevel);
car.ride(30);
console.log(car.petrolLevel);


console.log(station.petrolStorage);

console.log(station.provide(car));

console.log(car.petrolLevel);
console.log(station.petrolStorage);