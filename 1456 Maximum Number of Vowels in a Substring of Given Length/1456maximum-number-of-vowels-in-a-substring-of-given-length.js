/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function(s, k) {
    let maxCount = 0;
    let vowelCount = 0;
    let vowels = 'aeiou';
    for (let i = 0; i < k; i++) {
        if (vowels.indexOf(s[i]) !== -1) {
            vowelCount++;
        }
    }
    maxCount = vowelCount;
    for (let i = k; i < s.length; i++) {
        if (vowels.indexOf(s[i - k]) !== -1) {
            vowelCount--;
        }
        if (vowels.indexOf(s[i]) !== -1) {
            vowelCount++;
        }
        maxCount = Math.max(maxCount, vowelCount);
    }
    return maxCount;
};