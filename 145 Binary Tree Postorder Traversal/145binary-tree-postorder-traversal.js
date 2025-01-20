/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    let ans = []; // To store the result
    
    // Helper function to perform DFS (Post-order Traversal)
    const dfs = (node) => {
        if (node === null) {
            return;
        }
        dfs(node.left); // Traverse the left subtree
        dfs(node.right); // Traverse the right subtree
        ans.push(node.val); // Add the node value after visiting left and right children
    };
    
    dfs(root); // Start the DFS from the root
    return ans; // Return the result
};
