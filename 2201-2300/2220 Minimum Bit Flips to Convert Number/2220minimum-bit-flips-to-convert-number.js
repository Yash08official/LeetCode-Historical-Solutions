/**
 * @param {number} start
 * @param {number} goal
 * @return {number}
 */
var minBitFlips = function(start, goal) {
  let t = start ^ goal;
  let ans = 0;
  while (t !== 0) {
    ans += t & 1;
    t >>= 1;
  }
  return ans;
};