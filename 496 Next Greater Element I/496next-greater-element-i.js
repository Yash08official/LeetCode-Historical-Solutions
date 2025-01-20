/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
    const stk = []; // Stack to keep track of elements while iterating through nums2
    const d = {};   // Dictionary to store the next greater element for each number in nums2

    // Reverse the nums2 array to process elements in descending order
    for (const x of nums2.reverse()) {
        // While the stack is not empty and the top element of the stack is smaller than x
        while (stk.length && stk.at(-1) < x) {
            stk.pop(); // Remove elements from the stack until we find a larger element
        }
        
        // If the stack is not empty, the top element is the next greater element for x
        // Otherwise, set it as -1, indicating no greater element exists
        d[x] = stk.length ? stk.at(-1) : -1;
        
        // Push the current element x onto the stack for future comparisons
        stk.push(x);
    }

    // For each element in nums1, map it to its next greater element using the dictionary d
    return nums1.map(x => d[x]);
};