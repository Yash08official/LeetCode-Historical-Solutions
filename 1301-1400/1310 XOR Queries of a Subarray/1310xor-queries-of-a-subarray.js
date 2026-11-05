/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
var xorQueries = function(arr, queries) {
    const n = arr.length;
    const s = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; ++i) {
        s[i] = s[i - 1] ^ arr[i - 1];
    }
    const m = queries.length;
    const ans = new Array(m).fill(0);
    for (let i = 0; i < m; ++i) {
        const [l, r] = queries[i];
        ans[i] = s[r + 1] ^ s[l];
    }
    return ans;
};