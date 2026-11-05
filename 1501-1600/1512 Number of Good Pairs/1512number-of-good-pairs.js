/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function(nums) {
    const len = nums.length;
    let eachNumCount = {}; //This will contain arrays of length - 2 [count, count(combinations of 2)]
    let goodPairs = 0;

    //This loop Iterate through the array to populate eachNumCount with count and good pair           combinations
    for(let i=0; i<len; i++) {

        // If the current number is not yet in the eachNumCount object, initialize it
        if(eachNumCount[nums[i]]===undefined) {
            eachNumCount[nums[i]] = [1, 0];
        }
        // If the number exists in the object, update the count and the number of good pairs
         else if(eachNumCount[nums[i]]!==undefined) { //Magic Happens Here
            eachNumCount[nums[i]][1] += eachNumCount[nums[i]][0];
            eachNumCount[nums[i]][0] += 1;
        }
    }
    // Sum up the good pairs
    for(let num in eachNumCount) {
        // Add the number of good pairs for this number
        goodPairs += eachNumCount[num][1]
    }
    return goodPairs;
};