function countChar(str1, str2) {
  return str1
    .toLowerCase()
    .split("")
    .filter((item) => item === str2).length;
}

console.log(countChar("aakjsdkajshdkajsdhas", "j")); //  3

function countAllChar(string) {
  let obj = {};
  for (let i = 0; i < string.length; i++) {
    let str = string[i];
    obj[str] ? obj[str]++ : (obj[str] = 1);
  }
  return obj;
}

console.log(countAllChar("aabbcccvvv")); // {a: 2, b: 2, c: 3, v:3}

function deepCompare(obj1, obj2) {
  let arr1 = Object.keys(obj1);
  let arr2 = Object.keys(obj2);

  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (obj1[arr1[i] !== obj2[arr1[i]]]) {
      return false;
    }
  }
  return true;
}

console.log(deepCompare({ one: 1, two: "2" }, { one: 1, two: "2" }));

//true

console.log(deepCompare({ one: 1, two: "2" }, { two: "2" }));

//false

console.log(deepCompare({ one: 1, two: "2" }, { one: 1, two: 2 }));

//false

console.log(deepCompare({ one: 1, two: "2" }, { two: "2", one: 1 }));

//true"

function chessBoard(num1, num2) {
  let result = "";
  for (let i = 0; i < num2; i++) {
    for (let j = 0; j < num1; j++) {
      if (i % 2 !== 0) {
        result += j % 2 === 0 ? " " : "#";
      } else {
        result += j % 2 === 0 ? "#" : " ";
      }
    }
    result += "\n";
  }
  return result;
}

console.log(chessBoard(8, 4)); //
// # # # #
// # # # #
// # # # #
// # # # #"

function makeRange(start, end, num) {
  let result = [];
  if (num == undefined) {
    num = 1;
  }

  if (num > 0) {
    for (let i = start; i <= end; i += num) result.push(i);
  } else {
    for (let i = start; i >= end; i += num) result.push(i);
  }
  if (start > end) {
    for (let i = start; i >= end; i -= num) result.push(i);
  }

  return result;
}

console.log(makeRange(1, 10));
//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(makeRange(1, 10, 2));
//[1, 3, 5, 7, 9]

console.log(makeRange(10, 1, 2));
//[10, 8, 6, 4, 2]"

let alphabet = ["A", "B", "c", "D", "e"];

function reverse(alphabet) {
  let result = [];
  for (let i = 0; i < alphabet.length; i++) {
    console.log(i);
    result.push(alphabet[alphabet.length - 1 - i]);
  }
  return result;
}

console.log(reverse(alphabet));
// ['e','D','c', 'B','A']"

function mergeArrays(arr1, arr2, arr3) {
  return [...new Set([...arr1, ...arr2, ...arr3])];
}

console.log(mergeArrays([1, 2], ["а", 4], ["b", 6]));
//[1, 2, a, 4, b, 6]

console.log(mergeArrays([1, 2], ["a", 4], ["a", 6]));
//[1, 2, a, 4, 6]"
