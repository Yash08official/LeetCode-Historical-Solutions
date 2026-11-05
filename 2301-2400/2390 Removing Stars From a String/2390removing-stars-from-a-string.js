/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function(s) {
  let ans = '';
  for (let c of s) {
    if (c === '*') {
      ans = ans.slice(0, -1);
    } else {
      ans += c;
    }
  }
  return ans;
};