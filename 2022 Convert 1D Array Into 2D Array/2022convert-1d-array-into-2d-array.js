/**
 * @param {number[]} original
 * @param {number} m
 * @param {number} n
 * @return {number[][]}
 */
var construct2DArray = function(original, m, n) {
    if (m * n !== original.length) {
        return [];
    }
    var ans = new Array(m);
    for (var i = 0; i < m; ++i) {
        ans[i] = new Array(n);
        for (var j = 0; j < n; ++j) {
            ans[i][j] = original[i * n + j];
        }
    }
    return ans;
};