/**
 * @constructor
 */
var RecentCounter = function() {
  this.s = new Array(10010);
  this.idx = 0;
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
  this.s[this.idx++] = t;
  return this.idx - this.search(t - 3000);
};

/**
 * @param {number} x
 * @return {number}
 */
RecentCounter.prototype.search = function(x) {
  let left = 0, right = this.idx;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (this.s[mid] >= x) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
};

/** 
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */