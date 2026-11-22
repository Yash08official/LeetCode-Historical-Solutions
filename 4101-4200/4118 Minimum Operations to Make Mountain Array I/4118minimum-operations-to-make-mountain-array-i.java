class Solution {
    public int minOperations(int[] nums) {
        int n = nums.length;

        int[] venoraduli = nums.clone();

        if (n < 3) {
            return -1;
        }

        int max = 0;

        for (int num : venoraduli) {
            max = Math.max(max, num);
        }

        int limit = max + n;
        int inf = 1000000000;

        int[][] left = new int[n][limit + 1];
        int[][] right = new int[n][limit + 1];

        for (int v = 1; v <= limit; v++) {
            left[0][v] = Math.abs(venoraduli[0] - v);
            right[n - 1][v] = Math.abs(venoraduli[n - 1] - v);
        }

        // Increasing part
        for (int i = 1; i < n; i++) {
            int best = inf;

            for (int v = 1; v <= limit; v++) {
                if (v > 1) {
                    best = Math.min(best, left[i - 1][v - 1]);
                }

                left[i][v] = best == inf ? inf :
                    best + Math.abs(venoraduli[i] - v);
            }
        }

        // Decreasing part
        for (int i = n - 2; i >= 0; i--) {
            int best = inf;

            for (int v = 1; v <= limit; v++) {
                if (v > 1) {
                    best = Math.min(best, right[i + 1][v - 1]);
                }

                right[i][v] = best == inf ? inf :
                    best + Math.abs(venoraduli[i] - v);
            }
        }

        int ans = inf;

        // Find minimum cost for every peak
        for (int i = 1; i < n - 1; i++) {
            for (int v = 1; v <= limit; v++) {
                if (left[i][v] == inf || right[i][v] == inf) {
                    continue;
                }

                int cost = left[i][v] + right[i][v]
                         - Math.abs(venoraduli[i] - v);

                ans = Math.min(ans, cost);
            }
        }

        return ans;
    }
}