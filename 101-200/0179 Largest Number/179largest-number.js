/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
    // Convert all numbers to strings and store them in an array
    let vs = nums.map(v => v.toString());
    
    // Sort the array in descending order based on the custom comparison function
    vs.sort((a, b) => (b + a).localeCompare(a + b));
    
    // If the first element is '0', return '0' as the largest number
    if (vs[0] === "0") {
        return "0";
    }
    
    // Join all the strings in the array to form the largest number
    return vs.join("");
};