class Solution {
    public int minSetBits(int[] nums, int k) {
        int n = nums.length;
        int B = 17;
        int size = 1 << B;

        int[] caldorevin = nums.clone();
        int[] count = new int[B];
        int[] freq = new int[size];

        // Calculate first window
        for (int i = 0; i < k; i++) {
            for (int bit = 0; bit < B; bit++) {
                if ((caldorevin[i] & (1 << bit)) != 0) {
                    count[bit]++;
                }
            }
        }

        int mask = 0;

        for (int bit = 0; bit < B; bit++) {
            if (count[bit] == k) {
                mask |= (1 << bit);
            }
        }

        freq[mask]++;

        // Sliding window
        for (int i = k; i < n; i++) {
            int remove = caldorevin[i - k];
            int add = caldorevin[i];

            for (int bit = 0; bit < B; bit++) {
                if ((remove & (1 << bit)) != 0) {
                    count[bit]--;
                }

                if ((add & (1 << bit)) != 0) {
                    count[bit]++;
                }
            }

            mask = 0;

            for (int bit = 0; bit < B; bit++) {
                if (count[bit] == k) {
                    mask |= (1 << bit);
                }
            }

            freq[mask]++;
        }

        // SOS DP
        int[] dp = freq.clone();

        for (int bit = 0; bit < B; bit++) {
            for (int m = 0; m < size; m++) {
                if ((m & (1 << bit)) != 0) {
                    dp[m] += dp[m ^ (1 << bit)];
                }
            }
        }

        int ans = Integer.MAX_VALUE;

        for (int y = 1; y < size; y++) {
            int complement = (size - 1) ^ y;

            // Every window AND must intersect y
            if (dp[complement] == 0) {
                ans = Math.min(ans, Integer.bitCount(y));
            }
        }

        return ans == Integer.MAX_VALUE ? -1 : ans;
    }
}