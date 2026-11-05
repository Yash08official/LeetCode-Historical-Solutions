class Solution {
    public long countVowels(String word) {
        long sum = 0;
        for (int i = 0; i < word.length(); i++) {
            if (isVowel(word.charAt(i))) {
                sum += (long) (i + 1) * (long) (word.length() - i);
            }
        }
        return sum;
    }

    private boolean isVowel(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
}