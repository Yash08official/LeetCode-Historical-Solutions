
import java.util.Arrays;

class Solution {
    public long maxAlternatingSum(int[] nums) {
        long[] squares = new long[nums.length];

        for (int i = 0; i < nums.length; i++) {
            squares[i] = (long) nums[i] * nums[i];
        }

        Arrays.sort(squares);

        long ans = 0;
        int n = squares.length;
        int left = 0;
        int right = n - 1;

        while (left < right) {
            ans += squares[right] - squares[left];
            right--;
            left++;
        }

        if (left == right) {
            ans += squares[left];
        }

        return ans;
    }
}
