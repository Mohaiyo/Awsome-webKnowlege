class Animal {
  public name
  public constructor(name) {
    this.name = name
  }
}

let li = new Animal('lilith')
console.log(li.name)
li.name = 'tom'

console.log(li.name)

// class AnimalB {
//   private name
//   public constructor(name) {
//     this.name = name
//   }
// }

// let lib = new AnimalB('lilith')
// console.log(lib.name)
// lib.name = 'tom'

// console.log(lib.name)
