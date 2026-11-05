/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function(word1, word2) {
    var merged = [];

    var w1 = word1.length;
    var w2 = word2.length;

    var l = Math.min(w1, w2);

    for (var i = 0; i < l; i++) {
        merged.push(word1[i], word2[i]);
    }

    if (w1 > w2) {
        merged = merged.concat(word1.slice(l));
    }
    else if (w2 > w1) {
        merged = merged.concat(word2.slice(l));
    }

    return merged.join('');
};