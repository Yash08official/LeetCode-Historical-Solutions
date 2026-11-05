/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function(arr) {
    // Step 1: Handle the case of an empty array
    if (arr.length === 0) {
        return []; // Return an empty array if input is empty
    }

    const n = arr.length;           // Get the length of the input array
    const t = arr.slice();          // Create a copy of arr to sort it
    t.sort((a, b) => a - b);        // Sort the copied array t in ascending order

    // Step 2: Populate unique elements in the first m positions of t
    let m = 0;                      // Initialize a counter for unique elements
    for (let i = 0; i < n; i++) {
        // If it's the first element or different from the previous one, add it to t
        if (i === 0 || t[i] !== t[i - 1]) {
            t[m++] = t[i];          // Store unique elements
        }
    }

    // Step 3: Prepare an output array of the same length as arr
    const ans = new Array(n);
    for (let i = 0; i < n; i++) {
        // Assign ranks using binary search
        ans[i] = binarySearch(t, 0, m, arr[i]) + 1; // Get rank for arr[i]
    }

    return ans;                    // Return the result array with ranks
};

// Custom binary search function
function binarySearch(arr, left, right, target) {
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] < target) {
            left = mid + 1;        // Move to the right half
        } else {
            right = mid;           // Move to the left half
        }
    }
    return left;                  // Return the index where the target is found or would be inserted
}

// Example usage
console.log(arrayRankTransform([40, 10, 20, 30])); // Output: [4, 1, 2, 3]
console.log(arrayRankTransform([100, 100, 100])); // Output: [1, 1, 1]
console.log(arrayRankTransform([37, 12, 28, 9, 100, 56, 80, 5, 12])); // Output: [5, 3, 4, 2, 8, 6, 7, 1, 3]
console.log(arrayRankTransform([])); // Output: []
