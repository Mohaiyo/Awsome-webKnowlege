var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var li = new Animal('lilith');
console.log(li.name);
li.name = 'tom';
console.log(li.name);
var AnimalB = /** @class */ (function () {
    function AnimalB(name) {
        this.name = name;
    }
    return AnimalB;
}());
var lib = new AnimalB('lilith');
console.log(lib.name);
lib.name = 'tom';
console.log(lib.name);
