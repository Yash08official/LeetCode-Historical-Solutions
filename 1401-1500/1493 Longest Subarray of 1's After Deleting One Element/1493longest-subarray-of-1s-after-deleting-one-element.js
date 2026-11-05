/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function(nums) {
    let n = nums.length;
    let left = new Array(n + 1).fill(0);
    let right = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; ++i) {
        if (nums[i - 1] === 1) {
            left[i] = left[i - 1] + 1;
        }
    }
    for (let i = n - 1; i >= 0; --i) {
        if (nums[i] === 1) {
            right[i] = right[i + 1] + 1;
        }
    }
    let ans = 0;
    for (let i = 0; i < n; ++i) {
        ans = Math.max(ans, left[i] + right[i + 1]);
    }
    return ans;
};