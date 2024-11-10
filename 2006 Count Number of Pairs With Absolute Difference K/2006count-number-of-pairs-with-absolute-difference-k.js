/**
 * @param {number[]} nums
 * @param {number} k 
 * @return {number} 
 */
var countKDifference = function(nums, k) {
    // first I create a variable to store no. of valid pairs
    let count = 0; 
    // Now map to store frequency of number in array
    const numMap = {}; 

    for (let num of nums) {
        // if num + k exists in numMap then I get pair with difference k
        if (numMap[num + k]) count += numMap[num + k];
        // if num - k exists in numMap then I get another pair with difference k
        if (numMap[num - k]) count += numMap[num - k];

        //I have to update frequency of current number in numMap
        // If num is not in numMap, set it to 0, then increment by 1
        numMap[num] = (numMap[num] || 0) + 1;
    }
    return count; 
};
