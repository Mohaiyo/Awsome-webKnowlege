// 函数声明
function sum(a, b) {
    return a + b;
}
sum(1, 2);
// sum(1)
// 函数表达式 typscript中 => 表示函数的定义 左边是输入类型 右边是输出类型
var mySumFn = function (a, b) {
    return a + b;
};
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
// 可选参数
function sayName(firstName, lastName) {
    console.log('firstName', firstName);
    console.log('lastName', lastName);
    if (lastName) {
        return firstName + ' ' + lastName;
    }
    return firstName;
}
var wayneLiang = sayName('wayne', 'liang');
var wayne = sayName('wayne');
// 默认参数
function buildName(firstName, lastName) {
    if (lastName === void 0) { lastName = 'liang'; }
    return firstName + ' ' + lastName;
}
var myName = buildName('wayne', 'cai');
console.log('myName', myName);
// 剩余参数
function restFn(array) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (item) {
        array.push(item);
    });
}
var a = [];
restFn(a, 1, 2, 3);
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
console.log(reverse('123456'));
console.log(reverse(123456));
console.log(reverse(1234444));
