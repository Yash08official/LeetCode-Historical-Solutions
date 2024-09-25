/**
 * @param {number[]} nums
 * @return {void}
 */
var ArrayWrapper = function(nums) {
    this.nums = nums;
    this.s = nums.reduce((a, b) => a + b, 0);
};

/**
 * @return {number}
 */
ArrayWrapper.prototype.valueOf = function() {
    return this.s;
}

/**
 * @return {string}
 */
ArrayWrapper.prototype.toString = function() {
    return `[${this.nums}]`;
}