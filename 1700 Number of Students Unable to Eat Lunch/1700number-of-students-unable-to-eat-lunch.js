/**
 * @param {number[]} students
 * @param {number[]} sandwiches
 * @return {number}
 */
var countStudents = function(students, sandwiches) {
    let cnt = [0, 0]; // To count the number of students who like each type of sandwich (0 and 1)
    
    // Count the number of students who like each type of sandwich
    for (let v of students) {
        cnt[v]++;
    }
    
    // Process each sandwich
    for (let v of sandwiches) {
        // If there are no students who like the current sandwich, return the count of students who like the other type
        if (cnt[v]-- === 0) {
            return cnt[v ^ 1];
        }
    }
    
    // If all sandwiches have been processed, return 0
    return 0;
};
