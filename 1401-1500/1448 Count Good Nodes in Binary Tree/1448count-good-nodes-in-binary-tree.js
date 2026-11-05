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
 * @return {number}
 */
var goodNodes = function(root) {
  let ans = 0;

  function dfs(node, mx) {
    if (!node) {
      return;
    }
    if (mx <= node.val) {
      ans++;
      mx = node.val;
    }
    dfs(node.left, mx);
    dfs(node.right, mx);
  }

  dfs(root, -100000);
  return ans;
};