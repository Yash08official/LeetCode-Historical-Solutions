class Solution {
    public int maxLevelSum(TreeNode root) {
        if (root == null) {
            return 0;
        }
        
        int maxSum = Integer.MIN_VALUE;
        int level = 1;
        int result = 1;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            int sum = 0;
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                sum += node.val;
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }
            if (sum > maxSum) {
                maxSum = sum;
                result = level;
            }
            level++;
        }
        
        return result;
    }
}