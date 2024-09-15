/**
 * @param {string} s
 * @return {number}
 */
var findTheLongestSubstring = function(s) {
    var pos = new Array(32).fill(Number.MAX_VALUE);
    pos[0] = -1;
    var vowels = "aeiou";
    var state = 0;
    var ans = 0;
    for (var i = 0; i < s.length; ++i) {
        var c = s.charAt(i);
        for (var j = 0; j < 5; ++j) {
            if (c === vowels.charAt(j)) {
                state ^= (1 << j);
            }
        }
        ans = Math.max(ans, i - pos[state]);
        pos[state] = Math.min(pos[state], i);
    }
    return ans;
};