/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function(nums, k) {
    let maxOnes = 0;
    let left = 0;
    let onesCount = 0;
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 1) {
            onesCount++;
        }
        if (right - left + 1 > k + onesCount) {
            if (nums[left] === 1) {
                onesCount--;
            }
            left++;
        }
        maxOnes = Math.max(maxOnes, right - left + 1);
    }
    return maxOnes;
};