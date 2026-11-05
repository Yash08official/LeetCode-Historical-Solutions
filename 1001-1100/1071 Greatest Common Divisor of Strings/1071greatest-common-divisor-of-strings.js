/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function(str1, str2) {
    if ((str1 + str2) !== (str2 + str1)) {
        return "";
    }
    
    var gcd = getGCD(str1.length, str2.length);
    return str1.substring(0, gcd);
}

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getGCD = function(a, b) {
    if (b === 0) {
        return a;
    }
    return getGCD(b, a % b);
}