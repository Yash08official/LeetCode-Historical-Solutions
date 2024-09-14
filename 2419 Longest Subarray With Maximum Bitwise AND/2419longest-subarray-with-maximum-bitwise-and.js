/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function(nums) {
    let mx = 0;
    for (let v of nums) {
        mx = Math.max(mx, v);
    }
    let ans = 0, cnt = 0;
    for (let v of nums) {
        if (v === mx) {
            ++cnt;
            ans = Math.max(ans, cnt);
        } else {
            cnt = 0;
        }
    }
    return ans;
};