class Solution {

    public long countNonDecreasingSubarrays(int[] nums, int k) {

        int n = nums.length;

        // Step 1: Prefix sum
        long[] prefix = new long[n + 1];

        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        // Step 2: Find Next Greater Element
        int[] nge = new int[n];
        int[] stack = new int[n];
        int top = -1;

        for (int i = n - 1; i >= 0; i--) {

            while (top >= 0 && nums[stack[top]] <= nums[i]) {
                top--;
            }

            nge[i] = (top == -1) ? n : stack[top];

            stack[++top] = i;
        }

        // Step 3: Build Binary Lifting tables
        int LOG = 1;

        while ((1 << LOG) <= n) {
            LOG++;
        }

        int[][] jump = new int[LOG][n];
        long[][] sum = new long[LOG][n];

        // Base level
        for (int i = 0; i < n; i++) {

            jump[0][i] = nge[i];

            sum[0][i] =
                (long) nums[i] * (nge[i] - i);
        }

        // Higher levels
        for (int p = 1; p < LOG; p++) {

            for (int i = 0; i < n; i++) {

                int mid = jump[p - 1][i];

                if (mid < n) {

                    jump[p][i] = jump[p - 1][mid];

                    sum[p][i] =
                        sum[p - 1][i] + sum[p - 1][mid];

                } else {

                    jump[p][i] = n;
                    sum[p][i] = sum[p - 1][i];
                }
            }
        }

        // Step 4: Count valid subarrays
        long answer = 0;

        for (int r = 0; r < n; r++) {

            int low = 0;
            int high = r;

            // Binary search for smallest valid left
            while (low < high) {

                int mid = low + (high - low) / 2;

                long cost = getCost(
                    mid, r, nums, prefix, jump, sum
                );

                if (cost <= k) {
                    high = mid;
                } else {
                    low = mid + 1;
                }
            }

            answer += r - low + 1;
        }

        return answer;
    }

    // Calculate minimum operations for [l, r]
    private long getCost(
        int l,
        int r,
        int[] nums,
        long[] prefix,
        int[][] jump,
        long[][] sum
    ) {

        long maxSum = 0;
        int curr = l;

        // Skip complete maximum blocks
        for (int p = jump.length - 1; p >= 0; p--) {

            int next = jump[p][curr];

            if (next <= r) {

                maxSum += sum[p][curr];

                curr = next;
            }
        }

        // Add the remaining partial block
        maxSum += (long) nums[curr] * (r - curr + 1);

        // Required increments
        long total = prefix[r + 1] - prefix[l];

        return maxSum - total;
    }
}
