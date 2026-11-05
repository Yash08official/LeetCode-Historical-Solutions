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
var preorderTraversal = function(root) {
    let ans = []; // To store the result
    
    if (root === null) {
        return ans; // If root is null, return an empty array
    }
    
    let stk = []; // Stack to keep track of nodes
    stk.push(root); // Push the root node to the stack
    
    while (stk.length > 0) {
        let node = stk.pop(); // Pop the top node from the stack
        ans.push(node.val); // Add the node value to the result array
        
        // Push right child first (so left child is processed first)
        if (node.right !== null) {
            stk.push(node.right);
        }
        
        // Push left child
        if (node.left !== null) {
            stk.push(node.left);
        }
    }
    
    return ans; // Return the result array
};
