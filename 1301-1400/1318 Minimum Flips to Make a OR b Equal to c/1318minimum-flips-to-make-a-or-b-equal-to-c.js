/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var minFlips = function(a, b, c) {
    let ans = 0;
    for (let i = 0; i < 32; ++i) {
        let x = (a >> i) & 1, y = (b >> i) & 1, z = (c >> i) & 1;
        ans += z === 0 ? x + y : (x === 0 && y === 0 ? 1 : 0);
    }
    return ans;
};