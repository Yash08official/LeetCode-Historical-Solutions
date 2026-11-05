
class Solution {
    public String[] createGrid(int m, int n) {
        char[][] grid = new char[m][n];

        // Step 1: Fill the entire grid with obstacles
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                grid[i][j] = '#';
            }
        }

        // Step 2: Make every cell in the first row free
        for (int j = 0; j < n; j++) {
            grid[0][j] = '.';
        }

        // Step 3: Make every cell in the last column free
        for (int i = 0; i < m; i++) {
            grid[i][n - 1] = '.';
        }

        // Step 4: Convert each row into a String
        String[] result = new String[m];

        for (int i = 0; i < m; i++) {
            result[i] = new String(grid[i]);
        }

        return result;
    }
}
