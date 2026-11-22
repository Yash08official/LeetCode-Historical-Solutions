class Solution {
    public String[] assignUmbrella(int[] rain) {
        int n = rain.length;
        String[] ans = new String[n];

        int alice = 0;
        int bob = 0;

        for (int i = 0; i < n; i++) {
            boolean a = i < n - 1 && rain[i] == 1 && rain[i + 1] == 1;
            boolean b = rain[i] == 1;

            if (a && b) {
                if (alice <= bob) {
                    ans[i] = "Alice";
                    alice++;
                } else {
                    ans[i] = "Bob";
                    bob++;
                }
            } 
            else if (a) {
                ans[i] = "Alice";
                alice++;
            } 
            else if (b) {
                ans[i] = "Bob";
                bob++;
            } 
            else {
                ans[i] = "None";
            }
        }

        return ans;
    }
}