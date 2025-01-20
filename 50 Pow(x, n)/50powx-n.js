/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    // Base case: x^0 is always 1, no matter the value of x
    if (n === 0) return 1;

    // Base case: x^1 is just x
    if (n === 1) return x;

    // If n is negative, compute the positive power and return its reciprocal
    if (n < 0) return 1 / myPow(x, -n);

    // If n is even, we use the property (x^n) = (x^2)^(n/2)
    if (n % 2 === 0) return myPow(x * x, n / 2);

    // If n is odd, we reduce the power by 1 (x^n) = x * (x^(n-1))
    return x * myPow(x * x, (n - 1) / 2);
};