/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {

    // i is the pointer for the last position of 0, j is the pointer for the first position of 2
    var i = -1, j = nums.length, k = 0;
    while (k < j) {
        if (nums[k] === 0) {
            // If current element is 0, place it at the start (after i)
            // Increment i to point to the last 0
            // Increment k to move to the next element
            swap(nums, ++i, k++);
        } else if (nums[k] === 2) {
            // If current element is 2, place it at the end (before j)
            // Decrement j to point to the first 2 from the end
            // Do not increment k because we haven't checked the swapped element yet
            swap(nums, --j, k);
        } else {
            // If current element is 1, just move k to the next position
            ++k;
        }
    }
};
// Helper function to swap two elements in the array
function swap(nums, i, j) {
    var t = nums[i]; 
    nums[i] = nums[j];
    nums[j] = t;
}