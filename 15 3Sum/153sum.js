/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const n = nums.length;

    // Sort the array to make it easier to avoid duplicates and to apply the two-pointer approach
    nums.sort((a, b) => a - b);

    const ans = []; // To store the triplets that sum to zero

    // Loop through the array, but stop at n - 2 since we're looking for triplets
    for (let i = 0; i < n - 2 && nums[i] <= 0; ++i) {

        // Skip the same number to avoid duplicate triplets
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        let j = i + 1; // Left pointer
        let k = n - 1; // Right pointer

        // While left pointer is less than right pointer
        while (j < k) {
            const x = nums[i] + nums[j] + nums[k]; // Sum of the triplet

            // If sum is less than zero, move the left pointer right to increase the sum
            if (x < 0) {
                ++j;

            // If sum is greater than zero, move the right pointer left to decrease the sum    
            } else if (x > 0) {
                --k;

            // If sum is zero, we have found a valid triplet
            } else {
                ans.push([nums[i], nums[j++], nums[k--]]);

                // Skip duplicate values to avoid repeating triplets
                while (j < k && nums[j] === nums[j - 1]) {
                    ++j;
                }
                while (j < k && nums[k] === nums[k + 1]) {
                    --k;
                }
            }
        }
    }
    return ans; // Return all found triplets
};