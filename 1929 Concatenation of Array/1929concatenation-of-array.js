/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getConcatenation = function(nums) {
    
    // we create a new array

    let ans = new Array(2*nums.length);

    let j = nums.length;

    for(let i = 0; i<j; i++){
        ans[i] = nums[i];
        ans[j + i] = nums[i];
    }

    return ans;
};