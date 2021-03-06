'use strict';
export class Carrier {
  ammostore: number;
  health: number;
  planes: Aircraft[];
  totaldamage: number;

  constructor() {
    this.planes = [];
    this.ammostore = 1000;
    this.health = 5000;
    this.totaldamage = 0;
  }

  addPlane(pl: Aircraft) {
    this.planes.push(pl);
  }

  add() {
    this.planes.push(new F16);
    this.planes.push(new F35);
  }
  getStatus() {
    console.log(`The carrier has ${this.planes.length} aircrafts. It has ${this.ammostore} ammo in storage. It\'a total damage is: ${this.totaldamage}. It\'s health points: ${this.health}`) 
  }

  fill() {
    if (this.ammostore <= 0) {
      return ('Sorry, no fuel!')
    } 
    for (let i: number = 0; i < this.planes.length; i++) {
      if (this.planes[i].isPriority() && this.planes[i].refillNeed()){
        this.ammostore = this.planes[i].refill(this.ammostore);
      }
    }
    for (let i: number = 0; i < this.planes.length; i++) {
      if (!this.planes[i].isPriority() && this.planes[i].refillNeed()){
        this.ammostore = this.planes[i].refill(this.ammostore);
      }
    }  
    return this.ammostore; 
  }

  fight(anothership: Carrier) {
        for (let i: number = 0; i < this.planes.length; i++) {
          this.totaldamage += this.planes[i].fight();
          this.ammostore -= this.ammostore;
          anothership.health -= this.totaldamage;
        } 
        if (anothership.health <= 0) {
        console.log (`It is dead, Jim!`);
      } else {
        return this.totaldamage;
    }
  } 
}  

export class Aircraft extends Carrier {
  ammo: number;
  type: string;
  maxammo: number;
  basedamage: number;
  alldamage: number;

  constructor(ammo: number) {
    super()
    this.ammo = 0;
    this.alldamage = 0;
  }

  getType(){
    return this.type;
  }

  getStatus() {
    console.log(`Type: ${this.type}, Ammo: ${this.ammostore}, Base Damage: ${this.basedamage}, All Damage: ${this.alldamage}`) 
  }

  fight() {
    if (this.ammo <= 0) {
      return;
    } else {
    this.alldamage += this.basedamage * this.ammo;
    this.ammo -= this.ammo;
    return this.alldamage;
  }
}

  refill(amount: number) {
    for (let i:number = 0; i < amount; i++) {
      if (this.ammo < this.maxammo) {
        this.ammo += 1;
        amount--;
      } 
    } 
    return amount;  
  } 

  isPriority() {}
  refillNeed() {}
}  

export class F16 extends Aircraft {
  basedamage: number;
  type: string;
  maxammo: number;
  
  constructor(ammo?: number, basedamage?: number) {
    super(ammo);
    this.basedamage = 30;
    this.type = 'F16';
    this.maxammo = 8;
  }

  isPriority(): boolean {
    return false;
  }
  
  refillNeed() {
    if (this.ammo < this.maxammo) {
      return true;
    }
  }
}

export class F35 extends Aircraft {
  basedamage: number;
  type: string;
  maxammo: number;

  constructor(ammo?: number, basedamage?: number) {
    super(ammo);
    this.basedamage = 50;
    this.type = 'F35';
    this.maxammo = 12;
  }

  isPriority(): boolean {
    return true;
  }

  refillNeed() {
    if (this.ammo < this.maxammo) {
      return true;
    }
  }
}

let sanyi = new F16();
let lali = new F35();
/*console.log(lali.getStatus());
lali.refill(40);
console.log(lali.getStatus());
lali.fight();
console.log(lali.getStatus());
sanyi.refill(30);
console.log(sanyi.getStatus());
sanyi.fight();
console.log(sanyi.getStatus());
console.log(sanyi.isPriority()); */

let hulu = new Carrier();
let bela = new Carrier();
hulu.addPlane(sanyi);
hulu.addPlane(lali);
hulu.fill();

hulu.getStatus();
bela.getStatus();
hulu.fill();
hulu.getStatus();
hulu.fill();
hulu.fight(bela);
bela.fight(hulu);
hulu.getStatus();

/*
hulu.fight(bela);
hulu.fill();
hulu.getStatus();
console.log(bela);
hulu.fight(bela);
hulu.fill();
hulu.getStatus();
console.log(bela);
hulu.fight(bela);
hulu.fill();
hulu.getStatus();
console.log(bela); */
