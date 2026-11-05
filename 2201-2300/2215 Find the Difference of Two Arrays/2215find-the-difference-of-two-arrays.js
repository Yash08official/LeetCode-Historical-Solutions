/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function(nums1, nums2) {
  let s1 = new Set(nums1);
  let s2 = new Set(nums2);
  let l1 = [];
  let l2 = [];
  for (let v of s1) {
    if (!s2.has(v)) {
      l1.push(v);
    }
  }
  for (let v of s2) {
    if (!s1.has(v)) {
      l2.push(v);
    }
  }
  return [l1, l2];
};