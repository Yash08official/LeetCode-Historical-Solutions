/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function(nums, n) {
    // Firstly I create empty array to store the shuffled result
    const result = [];
    
    //then I used loop through the first half of the array
    for (let i = 0; i < n; i++) {
        // Add the ith element from the first half of nums.
        result.push(nums[i]);
        
        // Add the i-th element from the second half of nums.
        result.push(nums[i + n]);
    }
    return result;
};
