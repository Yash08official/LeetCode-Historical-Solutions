/**
 * @param {number} n
 * @return {number}
 */
var smallestNumber = function(n) {
    // Start with 1, the smallest number with all set bits
    let x = 1;
    // Shift left until x is greater than or equal to n
    while (x < n) {
        x = (x << 1) + 1; // Shift left and add 1 to make all bits set
    }
    return x;
};

// Example usage
console.log(smallestNumber(5));  // Output: 7
console.log(smallestNumber(10)); // Output: 15
console.log(smallestNumber(3));  // Output: 3
