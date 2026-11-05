class Solution {
    public int robotSim(int[] commands, int[][] obstacles) {
        int x = 0, y = 0, dx = 0, dy = 1;
        Set<String> obstacleSet = new HashSet<>();
        for (int[] obstacle : obstacles) {
            obstacleSet.add(obstacle[0] + "," + obstacle[1]);
        }
        
        int maxDistance = 0;
        for (int command : commands) {
            if (command == -2) {
                int temp = dx;
                dx = -dy;
                dy = temp;
            } else if (command == -1) {
                int temp = dx;
                dx = dy;
                dy = -temp;
            } else {
                for (int i = 0; i < command; i++) {
                    int newX = x + dx;
                    int newY = y + dy;
                    if (!obstacleSet.contains(newX + "," + newY)) {
                        x = newX;
                        y = newY;
                    }
                    maxDistance = Math.max(maxDistance, x * x + y * y);
                }
            }
        }
        
        return maxDistance;
    }
}