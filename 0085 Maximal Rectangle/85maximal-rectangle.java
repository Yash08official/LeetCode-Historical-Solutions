class Solution {
    public int maximalRectangle(char[][] matrix) {
        if (matrix == null || matrix.length == 0) {
            return 0;
        }

        int rows = matrix.length;
        int cols = matrix[0].length;

        int[] heights = new int[cols];
        int maxArea = 0;

        for (int i = 0; i < rows; i++) {

            for (int j = 0; j < cols; j++) {
                if (matrix[i][j] == '1') {
                    heights[j]++;
                } else {
                    heights[j] = 0;
                }
            }

            maxArea = Math.max(maxArea, largestRectangle(heights));
        }

        return maxArea;
    }

    private int largestRectangle(int[] heights) {
        Stack<Integer> st = new Stack<>();
        int maxArea = 0;

        for (int i = 0; i <= heights.length; i++) {

            int curr = (i == heights.length) ? 0 : heights[i];

            while (!st.isEmpty() && heights[st.peek()] > curr) {
                int height = heights[st.pop()];

                int width = st.isEmpty()
                    ? i
                    : i - st.peek() - 1;

                maxArea = Math.max(maxArea, height * width);
            }

            st.push(i);
        }

        return maxArea;
    }
}