/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    let res = 0;  // Variable to store the maximum area
    let n = heights.length;  // Length of the heights array
    let stk = [];  // Stack to store the indices
    let left = new Array(n);  // Array to store the index of the previous smaller element
    let right = new Array(n).fill(n);  // Array to store the index of the next smaller element, initialized to 'n'
    
    // Traverse the heights array
    for (let i = 0; i < n; ++i) {
        // Pop elements from the stack while the current element is smaller than or equal to the element at the top of the stack
        while (stk.length && heights[stk[stk.length - 1]] >= heights[i]) {
            right[stk.pop()] = i;  // Set the next smaller element's index
        }
        // Set the left array to be the index of the last smaller element
        left[i] = stk.length ? stk[stk.length - 1] : -1;
        stk.push(i);  // Push the current index to the stack
    }
    
    // Calculate the maximum area
    for (let i = 0; i < n; ++i) {
        res = Math.max(res, heights[i] * (right[i] - left[i] - 1));  // Area = height * width
    }
    
    return res;  // Return the maximum area
};
