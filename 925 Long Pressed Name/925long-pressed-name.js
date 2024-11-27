/**
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
var isLongPressedName = function(name, typed) {
    let m = name.length, n = typed.length;
    let i = 0, j = 0;

    while (i < m && j < n) {
        if (name[i] !== typed[j]) {
            // Characters do not match, return false
            return false;
        }

        // Count the number of consecutive characters in name
        let x = i;
        while (x < m && name[x] === name[i]) {
            x++;
        }

        // Count the number of consecutive characters in typed
        let y = j;
        while (y < n && typed[y] === typed[j]) {
            y++;
        }

        // Check if the number of characters in typed is less than in name
        if (x - i > y - j) {
            return false;
        }

        // Move to the next group of characters
        i = x;
        j = y;
    }

    // Ensure both strings have been fully traversed
    return i === m && j === n;
};
