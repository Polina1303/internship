function opposite(number) {
  return -number;
}

console.log(opposite(-5)); //5
console.log(opposite(3.3333333)); // -3.3333333))

function basicOp(operation, value1, value2) {
  switch (operation) {
    case "+":
      return value1 + value2;
    case "-":
      return value1 - value2;
    case "*":
      return value1 * value2;
    case "/":
      return value1 / value2;
  }
}

console.log(basicOp("-", 15, 18)); // -3)
console.log(basicOp("+", 4, 7)); // 11)
console.log(basicOp("*", 5, 5)); // 25))
console.log(basicOp("/", 49, 7)); // 7)

function printArray(array) {
  return array.join(",");
}

console.log(printArray(["h", "o", "l", "a"])); //"h,o,l,a"

function rentalCarCost(d) {
  if (d <= 2) {
    return d * 40;
  } else if (d >= 3 && d <= 6) {
    return d * 40 - 20;
  } else if (d >= 7) {
    return d * 40 - 50;
  }
}

console.log(rentalCarCost(1)); // 40)
console.log(rentalCarCost(4)); // 140))

function getMiddle(s) {
  let num = s.length;
  if (s.length % 2 === 0) {
    return s
      .split("")
      .splice(Math.floor(num / 2 - 1), 2)
      .join("");
  } else {
    return s
      .split("")
      .splice(Math.floor(num / 2), 1)
      .join("");
  }
}

console.log(getMiddle("test")); //"es"))
console.log(getMiddle("testing")); //"t"))

let items = [1, 2, 3, 4, 5, 6];
function isEven(n) {
  return n % 2 == 0;
}
let i = partitionOn(isEven, items);

function partitionOn(pred, items) {
  let arr1 = items.filter(function (e) {
    return !pred(e);
  });

  let arr2 = items.filter(pred);

  items.length = 0;
  for (let i = 0; i < f.length; i++) {
    items.push(arr1[i]);
  }
  for (let i = 0; i < t.length; i++) {
    items.push(arr2[i]);
  }
}

console.log(items.slice(i));

function fun(callback) {
  return typeof callback === "function" ? callback(value) : value;
}

function zero(callback) {
  const value = 0;
  return fun(callback);
}
function one(callback) {
  const value = 1;
  return fun(callback);
}
function two(callback) {
  const value = 2;
  return fun(callback);
}
function three(callback) {
  const value = 3;
  return fun(callback);
}
function four(callback) {
  const value = 4;
  return fun(callback);
}
function five(callback) {
  const value = 5;
  return fun(callback);
}
function six(callback) {
  const value = 6;
  return fun(callback);
}
function seven(callback) {
  const value = 7;
  return fun(callback);
}
function eight(callback) {
  const value = 8;
  return fun(callback);
}
function nine(callback) {
  const value = 9;
  return fun(callback);
}

function plus(a) {
  return function (b) {
    return a + b;
  };
}
function minus(a) {
  return function (b) {
    return a - b;
  };
}
function times(a) {
  return function (b) {
    return a * b;
  };
}
function dividedBy(a) {
  return function (b) {
    return Math.floor(a / b);
  };
}

console.log(seven(times(five())), 35);
console.log(four(plus(nine())), 13);
console.log(eight(minus(three())), 5);
console.log(six(dividedBy(two())), 3);
