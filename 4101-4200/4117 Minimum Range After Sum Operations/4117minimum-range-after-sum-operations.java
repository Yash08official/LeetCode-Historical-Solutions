class Solution {
    public int minRange(int a, int b, int c) {

        int[] lom = {a,b,c};

        java.util.Arrays.sort(lom);

        int range = lom[2] - lom[0];

        return Math.min(range,lom[1]);
    }
}