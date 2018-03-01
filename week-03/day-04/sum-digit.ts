// Given a non-negative int n, return the sum of its digits recursively (no loops). 
// Note that mod (%) by 10 yields the rightmost digit (126 % 10 is 6), while 
// divide (/) by 10 removes the rightmost digit (126 / 10 is 12).
'use strict';
function sumDigits(n: number) {
  if (n <= 1) {return 0
  } else {
    return n%10 + sumDigits((n - n%10) /10);
  }
}
console.log(sumDigits(342))