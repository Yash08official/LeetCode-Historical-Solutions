/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    const n = nums.length;
    const ans = new Array(n); // Result array to store the answer

    // Calculate the product of all elements to the left of each index
    for (let i = 0, left = 1; i < n; ++i) {
        // Store the product of all elements to the left of the current index
        ans[i] = left;
        // Update left product by multiplying with the current element
        left *= nums[i];
    }
    // Calculate the product of all elements to the right of each index
    for (let i = n - 1, right = 1; i >= 0; --i) {
        // Multiply the current value in ans by the product of elements to the right
        ans[i] *= right;
        // Update right product by multiplying with the current element
        right *= nums[i];
    }
    return ans;
};