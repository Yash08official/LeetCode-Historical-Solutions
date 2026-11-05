/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let n = height.length;  // Get the length of the height array
    let left = new Array(n);  // Array to store maximum height from the left
    let right = new Array(n);  // Array to store maximum height from the right
    left[0] = height[0];  // The first element of left is the same as the first height
    right[n - 1] = height[n - 1];  // The last element of right is the same as the last height
    
    // Fill the left and right arrays
    for (let i = 1; i < n; ++i) {
        left[i] = Math.max(left[i - 1], height[i]);  // The max height from left at index i
        right[n - i - 1] = Math.max(right[n - i], height[n - i - 1]);  // The max height from right at index n - i - 1
    }
    
    // Calculate the total amount of trapped water
    let ans = 0;
    for (let i = 0; i < n; ++i) {
        // Water trapped at each index is the difference between the minimum of left and right heights, minus the current height
        ans += Math.min(left[i], right[i]) - height[i];
    }
    
    return ans;  // Return the total trapped water
};

