/**
 * @param {string} allowed
 * @param {string[]} words
 * @return {number}
 */
var countConsistentStrings = function(allowed, words) {
  let s = new Array(26).fill(false);
  for (let c of allowed) {
    s[c.charCodeAt(0) - 'a'.charCodeAt(0)] = true;
  }
  let ans = 0;
  for (let w of words) {
    if (check(w, s)) {
      ans++;
    }
  }
  return ans;
};

function check(w, s) {
  for (let i = 0; i < w.length; i++) {
    if (!s[w.charCodeAt(i) - 'a'.charCodeAt(0)]) {
      return false;
    }
  }
  return true;
}