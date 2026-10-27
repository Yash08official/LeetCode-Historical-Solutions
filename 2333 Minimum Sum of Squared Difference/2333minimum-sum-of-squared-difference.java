
class Solution {
    public long minSumSquareDiff(int[] nums1, int[] nums2,
                                 int k1, int k2) {
        int n = nums1.length;
        long k = (long) k1 + k2;

        int[] diff = new int[n];
        int maxDiff = 0;
        long total = 0;

        for (int i = 0; i < n; i++) {
            diff[i] = Math.abs(nums1[i] - nums2[i]);
            maxDiff = Math.max(maxDiff, diff[i]);
            total += diff[i];
        }

        if (k >= total) {
            return 0L;
        }

        int low = 0, high = maxDiff;

        // Find the minimum achievable maximum difference.
        while (low < high) {
            int mid = low + (high - low) / 2;
            long need = 0;

            for (int d : diff) {
                if (d > mid) {
                    need += d - mid;
                }
            }

            if (need <= k) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }

        int threshold = low;
        long used = 0;
        long ans = 0;

        for (int d : diff) {
            int value = Math.min(d, threshold);
            used += d - value;
            ans += (long) value * value;
        }

        // Distribute remaining operations by reducing
        // some differences equal to threshold by one.
        long remaining = k - used;

        for (int d : diff) {
            if (remaining == 0) {
                break;
            }

            if (d >= threshold && threshold > 0) {
                ans -= (long) threshold * threshold;
                ans += (long) (threshold - 1) * (threshold - 1);
                remaining--;
            }
        }

        return ans;
    }
}
