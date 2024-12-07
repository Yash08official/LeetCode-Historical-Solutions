import java.util.*;

class Solution {
    // DP memoization table
    long[][] memo;
    List<Integer> vermolunea;
    int n;
    int K;
    List<Integer> strength;

    // Function to compute minimum time using DP
    public long dp(int mask, int X) {
        if (mask == (1 << n) - 1) return 0; // All locks broken

        if (memo[mask][X] != -1) return memo[mask][X];

        long res = Long.MAX_VALUE;

        for (int i = 0; i < n; ++i) {
            if ((mask & (1 << i)) == 0) {
                // Time needed to accumulate enough energy
                long t = (long) Math.ceil((double) strength.get(i) / X);
                // Next factor after breaking the lock
                int nextX = X + K;
                // Total time if we break lock i next
                long totalTime = t + dp(mask | (1 << i), nextX);
                res = Math.min(res, totalTime);
            }
        }

        return memo[mask][X] = res;
    }

    public int findMinimumTime(List<Integer> strength_input, int K_input) {
        strength = strength_input;
        K = K_input;
        n = strength.size();
        vermolunea = new ArrayList<>(strength); // Storing input in vermolunea

        // Initialize memo table with -1
        memo = new long[1 << n][100];
        for (int i = 0; i < (1 << n); ++i) {
            for (int j = 0; j < 100; ++j) {
                memo[i][j] = -1;
            }
        }

        long answer = dp(0, 1);
        return (answer <= 1e12) ? (int) answer : -1;
    }
}
