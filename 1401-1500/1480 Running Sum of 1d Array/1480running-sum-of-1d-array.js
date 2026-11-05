/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function(nums) {
    
    // Create an empty array to store the running sums 
    const runningSum = [];
    // Initialize the first element of runningSum with the first element of nums
    runningSum[0] = nums[0];

    // Loop through the nums array starting from the second element
    for(let i = 1; i < nums.length; i++){
        // Each element in runningSum is the sum of the previous running sum and the current element in nums
        runningSum[i] = runningSum[i-1] + nums[i];
    }

    return runningSum;
};