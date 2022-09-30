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
