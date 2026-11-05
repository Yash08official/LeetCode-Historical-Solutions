/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var findIntersectionValues = function(nums1, nums2) {
    // Initiallly I have two arrays of size 101
    var s1 = new Array(101).fill(0);
    var s2 = new Array(101).fill(0);

    // Mark element if exist in nums1
    for (var x of nums1) {
        // Set s1[x] to 1 if x is present in nums1
        s1[x] = 1;
    }

    // Mark element if exist in nums2
    for (var x of nums2) {
        // Set s2[x] to 1 if x is present in nums2
        s2[x] = 1;
    }

    // ans[0] will count elements from nums1 that are in nums2
    var ans = [0, 0];

    //Now I used Loop for count how many of nums1 elements are in nums2
    for (var x of nums1) {
        // Increment ans[0] if x is in nums2
        ans[0] += s2[x];
    }
    //I again used Loop for count how many of nums2 elements are in nums1
    for (var x of nums2) {
        // Increment ans[1] if x is in nums1
        ans[1] += s1[x];
    }
    return ans;
};