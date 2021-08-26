// 类型断言的语法
function getName(animal) {
    return animal.name;
}
// function isFish(animal: Cat | Fish) {
//   if (typeof animal.swim === 'function') {
//       return true;
//   }
//   return false;
// }
function isFish(animal) {
    if (typeof animal.swim === 'function') {
        return true;
    }
    return false;
}
function swim(animal) {
    // (animal as Fish).swim();
    animal.swim();
}
var tom = {
    name: 'Tom',
    run: function () { console.log('run'); }
};
swim(tom);
