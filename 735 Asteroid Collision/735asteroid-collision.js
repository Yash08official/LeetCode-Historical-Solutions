/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function(asteroids) {
  let stk = [];
  for (let x of asteroids) {
    if (x > 0) {
      stk.push(x);
    } else {
      while (stk.length > 0 && stk[stk.length - 1] > 0 && stk[stk.length - 1] < -x) {
        stk.pop();
      }
      if (stk.length > 0 && stk[stk.length - 1] === -x) {
        stk.pop();
      } else if (stk.length === 0 || stk[stk.length - 1] < 0) {
        stk.push(x);
      }
    }
  }
  return stk;
};