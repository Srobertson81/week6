'use strict'

const ezRead = {
  any: function(callback, array) {
    if (typeof callback === 'function' && Array.isArray(array)) {
      return array.some(callback);
    }
    else {
      return `Expected: (function, array)\n Actual: (${typeof callback}, ${typeof array})`;
    }
    
  },

  average: function(arr) {
    const summedArray =  arr.reduce((acc, current) => acc + current, 0);
    const result = summedArray / arr.length;
    return result;
  },

  cond: function(...args) {
    for (let i = 0; i < args.length; i++) {
      if (i % 2 === 0) {
        if (i === args.length - 1 && (typeof args[i] === 'function')) {
          return args[i]();
        } 
        else if (i === args.length - 1) {
          return args[i];
        }
        else if (args[i] && (typeof args[i + 1] === 'function')) {
          return args[i + 1]();
        } 
        else if (args[i]) {
          return args[i + 1];
        } 
      }
    }
  },

  digit: function(char) {
    const digits = [0,1,2,3,4,5,6,7,8,9];
    const isDigit = digits.includes(char);
    return isDigit;
  },

  drop: function(num, item) {
      if (typeof num === 'number' && (typeof item === 'string' || Array.isArray(item))) {
        return item.slice(num)
      }
      else {
          throw new TypeError(`Expected: (number, (string or array))\n Actual: (${typeof num}, ${typeof item})`)
      }
  },

  empty: function(item) {
    const isEmpty = item.length === 0
    if (typeof item === 'string' || Array.isArray(item)) {
      return isEmpty;
    }
    else if (typeof item === 'object') {
      for (prop in item) {
        if (item.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true;
    }
    else {
      throw new TypeError(`Expected a string, array, or object.\n Actual: ${typeof item}`);
    }
  },

  even: function(num) {
    if (typeof num === 'number') {
      return num % 2 === 0;
    }
    else if (Array.isArray(num)) {
      throw new TypeError('Expected: number.\n Actual: array');
    }
    else {
      throw new TypeError(`Expected: number.\n Actual: ${typeof num}`);
    }
  },

  flattenAll: function(...arrays) {
    let levelArray = [];
    for (let i = 0; i < arrays.length; i++) {
        if(!Array.isArray(arrays[i])) {
            levelArray.push(arrays[i]);
            continue;
        }
        let newArray = arrays[i].flat(Infinity);
        levelArray.push(newArray);
    }
    let flatArray = levelArray.flat();
    return flatArray;
  },

  freeze: function(item) {
    if (item === null) {
      throw new TypeError('Expected: object or array.\n Cannot freeze null value');
    }
    else if (typeof item === 'object' || Array.isArray(item)) {
      Object.freeze(item);

      Object.getOwnPropertyNames(item).forEach(prop => {
        if (item.hasOwnProperty(prop)
        && item[prop] !== null
        && (typeof item[prop] === "object" || typeof item[prop] === "function")
        && !Object.isFrozen(item[prop])) {
          Object.freeze(item[prop]);
        }
      });
      
      return item;
    }
    else {
      throw new TypeError(`Can only freeze objects.\n Expected: 'object'\n Actual ${typeof item}`);
    }
  },

  frozen: function(item) {
    if (typeof item === 'object') {
      return Object.isFrozen(item);
    }
    else {
      throw new TypeError(`Expected: object or array\n Actual: ${typeof item}`)
    }
  },

  head: function(item) {
      if ((typeof item === 'string' || Array.isArray(item)) && item !== '' && item !== []) {
        return item[0]
      }
      else if ((typeof item === 'string' || Array.isArray(item)) && (item === '' || item === [])) {
          throw new Error(`Empty input:\nCannot retrieve head of empty string or array`);
      }
      else {
          throw new TypeError(`Expected: string or array\n Actual: ${typeof item}`);
      }
  },

  ifThen: function(cond, callback) {
    if (cond && (typeof callback === 'function')) {
      return callback();
    } else if (cond) {
      return callback;
    } else {
      return null;
    }
  },

  ifThenElse: function(cond, callback, elseCallback) {
    if (cond && (typeof callback === 'function')) {
      return callback();
    } else if (cond) {
      return callback;
    } else if (!cond && (typeof elseCallback === 'function')) {
        return elseCallback();
    } else {
      return elseCallback;
    }
  },

  init: function(item) {
    if ((typeof item === 'string' || Array.isArray(item)) && item !== '' && item !== []) {
      return item.slice(0, item.length - 1);
    }
    else if ((typeof item === 'string' || Array.isArray(item)) && (item === '' || item === [])) {
        throw new Error(`Empty input:\nCannot retrieve init of empty string or array`);
    }
    else {
        throw new TypeError(`Expected: string or array\n Actual: ${typeof item}`);
    }
  },

  input: function(prompt) {
    const userInput = readlineSync.question(prompt);
    return userInput;
  },

  integer: function(item) {
    return Number.isInteger(item);
  },

  is: function(item) {
    return item;
  },

  last: function(item) {
    if ((typeof item === 'string' || Array.isArray(item)) && item !== '' && item !== []) {
      return item[item.length - 1];
    }
    else if ((typeof item === 'string' || Array.isArray(item)) && (item === '' || item === [])) {
        throw new Error(`Empty input:\nCannot retrieve last of empty string or array`);
    }
    else {
        throw new TypeError(`Expected: string or array\n Actual: ${typeof item}`);
    }
    },

  nil: function(item) {
    const isNil = item === null || item === undefined;
    return isNil;
  },

  not: function(bool) {
    if (typeof bool === 'boolean') {
      return !bool;
    }
    else {
      throw new TypeError(`Expected: boolean\n Actual: ${typeof bool}`);
    }
  },

  number: function(item) {
    const isNumber = typeof item === 'number' && !isNaN(item);
    return isNumber;
  },

  odd: function(num) {
    if (typeof num === 'number') {
      return num % 2 !== 0;
    }
    else if (Array.isArray(num)) {
      throw new TypeError('Expected: number.\n Actual: array');
    }
    else {
      throw new TypeError(`Expected: number.\n Actual: ${typeof num}`);
    }
  },

  onlyDigits: function (string) {
    if (typeof string === 'string') {
      let digitsOnly = string.replace(/[^\d]/g, '');
      return digitsOnly;
    }
    else if (Array.isArray(string)) {
      throw new TypeError('Expected: number.\n Actual: array');
    }
    else {
      throw new TypeError(`@onlyDigits\nExpected: string\n Actual: ${typeof string}`);
    }
  },

  onlyLetters: function (string) {
    if (typeof string === 'string') {
      let newString = string.replace(/[^a-zA-z]/g, '');
      return newString;
    }
    else if (Array.isArray(string)) {
      throw new TypeError('Expected: number.\n Actual: array');
    }
    else {
      throw new TypeError(`@onlyLetters\nExpected: string\n Actual: ${typeof string}`);
    }
  },

  print: function(item) {
    console.log(item);
  },
  
  randomInt: function(min, max) {
    if (typeof min === 'number' && typeof max === 'number') {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    else {
      throw new TypeError(`Expected: (number, number)\n Actual: (${typeof min}, ${typeof max})`);
    }
  },

  randomChoice: function(array) {
    if (Array.isArray(array)) {
      let chosenInt = Math.floor(Math.random() * array.length);
      return array[chosenInt];
    }
    else {
      throw new TypeError(`Expected array:\n Actual: ${typeof array}`);
    }
  },

  range: function(firstNumber, secondNumber) {
    if (typeof firstNumber !== 'number' || typeof secondNumber !== 'number') {
      throw new TypeError(`Expected: (number, number)\n Actual: (${typeof firstNumber}, ${typeof secondNumber})`);
    }
 
    if (firstNumber < 0 && secondNumber === undefined) {
      secondNumber = 0;
      return makeArray(firstNumber, secondNumber);
    } 
    
    else if (secondNumber === undefined) {
      secondNumber = firstNumber;
      firstNumber = 0;
      return makeArray(firstNumber, secondNumber);
    } 
    
    else if (firstNumber <= secondNumber) {
      return makeArray(firstNumber, secondNumber);
    } 
    
    else if (firstNumber >= secondNumber) {
      return makeReverseArray(firstNumber, secondNumber);
    }

    return rangeArray;
  },


  reverse: function(item) {
    if (Array.isArray(item)) {
      return item.reverse();
    } 
    else if (typeof item === 'string') {
      let newWord = item.split('').reverse().join('');
      return newWord;
    }
    else {
      throw new TypeError(`Expected: string or array\n Actual: ${typeof item}`);
    }
  },


  seal: function(item) {
    if (item === null) {
      throw new TypeError('Expected: object or array.\n Cannot seal null value');
    }
    else if (typeof item === 'object' || Array.isArray(item)) {
      return Object.seal(item);
    }
    else {
      throw new TypeError(`Can only seal objects.\n Expected: 'object'\n Actual ${typeof item}`);
    }
  },

  shuffle: function(array) {
    if (Array.isArray(array)) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    return array;
    }
    else {
      throw new TypeError(`Expected: array\n Actual: ${typeof array}`);
    }
  },

  splitEvery: function(num, array) {
      if (typeof num === 'number' && Array.isArray(array)) {
        let splitArray = []
        let currentArray = []
        for (let i = 1; i < array.length + 1; i++) {
          currentArray.push(array[i - 1])
          if (i % num === 0) {
              splitArray.push(currentArray)
              currentArray = []
          } 
          else if (i === array.length) {
              splitArray.push(currentArray)
          }
        }
        return splitArray
      }
      else if (Array.isArray(num), Array.isArray(array)){
          return `Expected: (number, array)\n Actual: (array, array)`
      }
      else if (!Array.isArray(num), Array.isArray(array)) {
        return `Expected: (number, array)\n Actual: (${typeof num}, array)`
      }
      else {
        return `Expected: (number, array)\n Actual: (${typeof num}, ${typeof array})`
      }
  },

  sum: function(...numbers) {
    let numbersFlattened = numbers.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

    let numbersToBeSummed = numbersFlattened.map((item) => Number(item));

    let sum = numbersToBeSummed.reduce((accumulator, currentValue) => accumulator + currentValue);
    return sum;
  },

  tail: function(item) {
    if ((typeof item === 'string' || Array.isArray(item)) && item !== '' && item !== []) {
      return item.slice(1, item.length);
    }
    else if ((typeof item === 'string' || Array.isArray(item)) && (item === '' || item === [])) {
        throw new Error(`Empty input:\nCannot retrieve init of empty string or array`);
    }
    else {
        throw new TypeError(`Expected: string or array\n Actual: ${typeof item}`);
    }
  },

  take: function(number, item) {
      const result = item.slice(0, number);
      return result;
  },

  unique: function(arr) {
    if (Array.isArray(arr)) {
      let uniques = [];
      for (let item of arr) {
        if(uniques.indexOf(item) === -1) {
          uniques.push(item);
        }
      }
      return uniques;
    }
    else {
      throw new TypeError(`Expected: array\n Actual: ${arr}`);
    }
  },
}



// Helper functions

// Range helper -------------------------------------------------------------------------------
function makeArray (firstNumber, secondNumber) {
  let rangeArray = [];
  for (let i = firstNumber; i <= secondNumber; i++) {
      rangeArray.push(i);
  }   
  return rangeArray;
}

function makeReverseArray(firstNumber, secondNumber) {
  let rangeArray = [];
  for (let i = firstNumber; i >= secondNumber; i--) {
      rangeArray.push(i);
  }
  return rangeArray;
}

// ------------------------------------------------------------------------------------------

module.exports = ezRead