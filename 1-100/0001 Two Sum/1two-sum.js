/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {

    // Create a map to store the value and its index
    const d = new Map();

    for (let i = 0; ; ++i) {
        const x = nums[i]; // Current element
        const y = target - x; // Calculate the complement

        // Check if the complement exists in the map
        if (d.has(y)) {
            // Return the indices of the complement and the current element
            return [d.get(y), i];
        }
        // Store the current number and its index in the map
        d.set(x, i);
    }
};