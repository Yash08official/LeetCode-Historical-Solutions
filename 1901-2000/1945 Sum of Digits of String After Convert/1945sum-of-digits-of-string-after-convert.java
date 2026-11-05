class Solution {
    public int getLucky(String s, int k) {
        int sumdigits = 0;
        int v0;
        for (char ch : s.toCharArray()) {
            v0 = ch - 'a' + 1;
            sumdigits += v0 / 10 + v0 % 10;
        }
        for (int i = 1; i < k; i++) {
            v0 = 0;
            int temp = sumdigits;
            while (temp > 0) {
                v0 += temp % 10;
                temp /= 10;
            }
            sumdigits = v0;
        }
        
        return sumdigits;
    }
}