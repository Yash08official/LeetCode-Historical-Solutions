/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
var closeStrings = function(word1, word2) {
  let freq1 = new Array(26).fill(0);
  let freq2 = new Array(26).fill(0);

  // Calculate the frequency of each character in word1.
  for (let i = 0; i < word1.length; ++i) {
    freq1[word1.charCodeAt(i) - 97]++;
  }

  // Calculate the frequency of each character in word2.
  for (let i = 0; i < word2.length; ++i) {
    freq2[word2.charCodeAt(i) - 97]++;
  }

  // Check if there's a character that exists in one word but not the other.
  for (let i = 0; i < 26; ++i) {
    if ((freq1[i] > 0 && freq2[i] == 0) || (freq2[i] > 0 && freq1[i] == 0)) {
      return false; // Words can't be close strings if a character is not shared.
    }
  }

  // Sort the frequency arrays to compare the frequency distribution.
  freq1.sort((a, b) => a - b);
  freq2.sort((a, b) => a - b);

  // Compare the sorted frequency arrays.
  for (let i = 0; i < 26; ++i) {
    if (freq1[i] !== freq2[i]) {
      return false; // If frequencies don't match, words aren't close strings.
    }
  }

  // If all checks pass, the words are close strings.
  return true;
};