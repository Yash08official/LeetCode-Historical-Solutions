class Solution {
    public boolean isScramble(String s1, String s2) {

        int n = s1.length();

        if (n != s2.length()) {
            return false;
        }

        if (s1.equals(s2)) {
            return true;
        }

        int[][][] dp = new int[n][n][n + 1];

        return solve(s1, s2, 0, 0, n, dp);
    }

    private boolean solve(String s1, String s2,
                          int i, int j, int len,
                          int[][][] dp) {

        if (dp[i][j][len] != 0) {
            return dp[i][j][len] == 1;
        }

        if (s1.substring(i, i + len)
              .equals(s2.substring(j, j + len))) {
            dp[i][j][len] = 1;
            return true;
        }

        for (int k = 1; k < len; k++) {

            // Without swapping
            boolean a = solve(s1, s2, i, j, k, dp);
            boolean b = solve(s1, s2, i + k, j + k,
                              len - k, dp);

            if (a && b) {
                dp[i][j][len] = 1;
                return true;
            }

            // With swapping
            boolean c = solve(s1, s2, i, j + len - k,
                              k, dp);

            boolean d = solve(s1, s2, i + k, j,
                              len - k, dp);

            if (c && d) {
                dp[i][j][len] = 1;
                return true;
            }
        }

        dp[i][j][len] = -1;
        return false;
    }
}