/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {

    // Initialize two variables, 'a' and 'b', 
    //to represent the number of ways to reach step 0 and step 1

    let a = 0, //'a' represents the number of ways to reach step 0
        b = 1; // 'b' represents the number of ways to reach step 1 

    // now I am using Loop through from 0 to n-1
    for (let i = 0; i < n; ++i) {

        // 'c' will store the total number of ways to reach the next step
        const c = a + b;
        a = b; // 'a' becomes the number of ways to reach step i
        b = c; // 'b' becomes the number of ways to reach step i + 1
    }

     // After the loop, 'b' will hold the number of ways to reach step 'n' 
    return b;
};