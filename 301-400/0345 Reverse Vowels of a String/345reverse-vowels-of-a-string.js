/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
    let chars = s.split('');
    let left = 0, right = s.length - 1;
    
    while (left < right) {
        if (!isVowel(chars[left])) {
            left++;
        } else if (!isVowel(chars[right])) {
            right--;
        } else {
            swap(chars, left, right);
            left++;
            right--;
        }
    }
    
    return chars.join('');
}

/**
 * @param {string} c
 * @return {boolean}
 */
function isVowel(c) {
    c = c.toLowerCase();
    return 'aeiou'.includes(c);
}

/**
 * @param {string[]} chars
 * @param {number} i
 * @param {number} j
 */
function swap(chars, i, j) {
    [chars[i], chars[j]] = [chars[j], chars[i]];
}