/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function (s) {
    const stk = []; // Stack to keep track of characters

    // Loop through each character in the input string s
    for (const c of s) {
        // If the stack is not empty and the top character of the stack is the same as the current character
        if (stk.length && stk[stk.length - 1] == c) {
            stk.pop(); // Pop the top character from the stack (removes the duplicate pair)
        } else {
            stk.push(c); // Push the current character onto the stack (it is not a duplicate)
        }
    }

    // Join the characters in the stack to form the resulting string
    return stk.join('');
};