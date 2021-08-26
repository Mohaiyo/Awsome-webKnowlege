// 类型断言的语法

/**
 * 值 as 类型
 * 或者
 * <类型>值
 */

interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function getAnimalName(animal: Cat | Fish) {
  return animal.name;
}

// function isFish(animal: Cat | Fish) {
//   if (typeof animal.swim === 'function') {
//       return true;
//   }
//   return false;
// }

function isTFish(animal: Cat | Fish) {
  if (typeof (<Fish>animal).swim === 'function') {
    return true;
  }
  return false;
}

function swimming(animal: Cat | Fish) {
  // (animal as Fish).swim();
  (<Fish>animal).swim()
}

const tomM: Cat = {
  name: 'Tom',
  run() { console.log('run') }
};
swim(tomM);


function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tomCat = getCacheData('tom') as Cat;
tomCat.run();

function getCacheDataFn<T>(key: string): T {
  return (window as any).cache[key];
}

const tomMao = getCacheDataFn<Cat>('tom')

tomMao.run()