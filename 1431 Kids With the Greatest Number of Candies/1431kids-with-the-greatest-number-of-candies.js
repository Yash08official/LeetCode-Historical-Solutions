/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function(candies, extraCandies) {
    //firstly I find the maximum number of candies any kid currently has
    let maxCandies = Math.max(...candies);
    // Now after this return new array where each value indicate
    // whether adding 'extraCandies' to a kids candies make >= maximum number of candies 
    return candies.map(candy => candy + extraCandies >= maxCandies);
}