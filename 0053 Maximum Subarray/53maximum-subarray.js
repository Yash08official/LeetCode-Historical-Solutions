/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    // Initialize 'ans' and 'f' to the first element of the array
    // 'ans' will store the maximum sum found so far
    // 'f' will store the current sum of the subarray we're examining
    let [ans, f] = [nums[0], nums[0]];
    for (let i = 1; i < nums.length; ++i) {
        // Update 'f': If adding the current element to the previous sum is better,
        // we continue with that sum, otherwise, we start a new subarray with the current element.
        f = Math.max(f, 0) + nums[i];
        ans = Math.max(ans, f);
    }
    return ans;
};