/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
    let f = Array.from({ length: prices.length }, () => new Array(2).fill(null));
    let dfs = function(i, j) {
        if (i >= prices.length) {
            return 0;
        }
        if (f[i][j] !== null) {
            return f[i][j];
        }
        let ans = dfs(i + 1, j);
        if (j > 0) {
            ans = Math.max(ans, prices[i] + dfs(i + 1, 0) - fee);
        } else {
            ans = Math.max(ans, -prices[i] + dfs(i + 1, 1));
        }
        return f[i][j] = ans;
    };
    return dfs(0, 0);
};