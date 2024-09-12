/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function(root1, root2) {
  let leaves1 = [], leaves2 = [];
  dfs(root1, leaves1);
  dfs(root2, leaves2);
  return JSON.stringify(leaves1) === JSON.stringify(leaves2);
};

/**
 * @param {TreeNode} node
 * @param {Array<number>} leafValues
 */
var dfs = function(node, leafValues) {
  if (node !== null) {
    if (node.left === null && node.right === null) {
      leafValues.push(node.val);
    }
    dfs(node.left, leafValues);
    dfs(node.right, leafValues);
  }
};