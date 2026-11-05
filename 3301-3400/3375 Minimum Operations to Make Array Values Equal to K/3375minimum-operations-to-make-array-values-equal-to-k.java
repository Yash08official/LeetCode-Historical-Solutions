import java.util.*;

class Solution {
    public int minOperations(int[] nums, int k) {
        // Step 1: Find the smallest element in nums
        int minValue = Arrays.stream(nums).min().getAsInt();

        // If the smallest element is less than k, it's impossible to make all values equal to k
        if (minValue < k) {
            return -1;
        }

        // Step 2: Count unique elements greater than k
        int operationCount = 0;
        Arrays.sort(nums); // Sort the array to group duplicates

        for (int i = 0; i < nums.length; ++i) {
            if (nums[i] > k) {
                ++operationCount;

                // Skip duplicates of the current number
                while (i + 1 < nums.length && nums[i] == nums[i + 1]) {
                    ++i;
                }
            }
        }

        // Step 3: Return the number of operations
        return operationCount;
    }
}
