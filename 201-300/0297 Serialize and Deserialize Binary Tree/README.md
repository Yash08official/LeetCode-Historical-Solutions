---
comments: true
difficulty: Hard
tags:
  - String
  - Tree
  - Depth-First Search
  - Breadth-First Search
  - Design
  - Binary Tree
---

# 297. Serialize and Deserialize Binary Tree

**[View Problem on LeetCode](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0297` (`297`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Tree`, `Depth-First Search`, `Breadth-First Search`, `Design`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Design a `Codec` class with two methods to convert any binary tree to and from a string:

- `String serialize(TreeNode root)` encodes a binary tree into a single string representation.
- `TreeNode deserialize(String data)` reconstructs the exact original binary tree structure and node values from that string.

You are free to choose any encoding format as long as `deserialize(serialize(root))` faithfully reproduces any valid binary tree (including empty trees and skewed trees).

---

## Examples

### Example 1

```text
Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]
```

### Example 2

```text
Input: root = []
Output: []
```

---

## Constraints

- The number of nodes in the tree is in the range `[0, 10^4]`.

- `-1000 <= Node.val <= 1000`

---

## Problem Understanding

- Unlike a Binary Search Tree, a general binary tree cannot be uniquely reconstructed from a single traversal (like preorder alone) unless `null` child pointers are explicitly recorded.
- Node values can be negative (`-1000 <= Node.val <= 1000`) and multi-digit, so tokens must be separated by an unambiguous delimiter such as `","` and a distinct null sentinel such as `"#"`.
- An empty tree (`root == null`) must round-trip cleanly back to `null`.

---

## Approach

### Brute Force Approach

Attempting to represent the tree as a dense `2^h`-sized heap array (indexing children at `2*i + 1` and `2*i + 2` even beneath `null` nodes) works for balanced trees, but explodes exponentially to `2^10000` slots on a skewed chain of `10^4` nodes, immediately exhausting memory.

### Optimized Approach

Use Breadth-First Search (level-order traversal) with a queue in both `serialize` and `deserialize`: emit `node.val` for non-null nodes and `"#"` only for direct `null` children of non-null nodes, joined by commas.

### Step-by-Step Thinking Process

1. Handle the empty-tree base case upfront: if `root == null`, return `null` in `serialize`, and if `data == null`, return `null` in `deserialize`.
2. In `serialize`, use `Deque<TreeNode> q = new LinkedList<>()` (since `LinkedList` allows `null` elements) seeded with `root`. Pop each `node`: if non-null, append `node.val + ""` to `ans` and enqueue both `node.left` and `node.right` (even if `null`); if `null`, append `"#"` without enqueuing further children.
3. Join `ans` with `","` using `String.join(",", ans)`.
4. In `deserialize`, split `data` on `","` into `vals`, create `root` from `vals[0]` (`i = 0`, `vals[i++]`), and push `root` into `ArrayDeque<TreeNode> q`.
5. While `q` is non-empty, poll parent `node` and consume the next two tokens `vals[i]` (left child) and `vals[i+1]` (right child). Whenever a token is not `"#"`, instantiate the child `TreeNode`, attach it to `node`, and enqueue it into `q`.

### Algorithm / Intuition

Every non-null node pushed into `q` during `serialize` enqueues **exactly two** entries—its left and right children—in strict FIFO order. Consequently, in `deserialize`, polling non-null parent nodes in that exact same FIFO order pairs each parent with its exact two child tokens (`vals[i]` and `vals[i+1]`). Because `null` sentinels (`"#"`) never enqueue children of their own, each real node contributes at most 2 `"#"` markers, keeping total serialized tokens strictly linear (`2n + 1`).

---

## Dry Run

Tracing **Example 1** (`root = [1, 2, 3, null, null, 4, 5]`):

- **`serialize(root)`:**
  - Pop `1`: `ans = ["1"]`, `q = [2, 3]`
  - Pop `2`: `ans = ["1","2"]`, `q = [3, null, null]`
  - Pop `3`: `ans = ["1","2","3"]`, `q = [null, null, 4, 5]`
  - Pop two `null`s: `ans = ["1","2","3","#","#"]`, `q = [4, 5]`
  - Pop `4` and `5` (enqueueing four `null`s), then pop four `null`s:
  - Output string: `"1,2,3,#,#,4,5,#,#,#,#"`.
- **`deserialize(data)`:**
  - `root = TreeNode(1)`, `i = 1`, `q = [1]`.
  - Poll `1`: reads `"2"` (`1.left = 2`, enqueue `2`) and `"3"` (`1.right = 3`, enqueue `3`), `i = 3`.
  - Poll `2`: reads `"#"`, `"#"` (both children remain `null`), `i = 5`.
  - Poll `3`: reads `"4"` (`3.left = 4`, enqueue `4`) and `"5"` (`3.right = 5`, enqueue `5`), `i = 7`.
  - Poll `4` and `5`: read remaining four `"#"` tokens; `q` empties -> returns `root`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Every one of the `n` tree nodes (and each of the `n + 1` null child links) is visited, serialized, split, and parsed a constant number of times.
- **Space Complexity:** `O(n)` — Both queues (`q`), the token list/array (`ans` / `vals` of size `2n + 1`), and the serialized string require `O(n)` memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [297serialize-and-deserialize-binary-tree.java](./297serialize-and-deserialize-binary-tree.java) |

---

## Key Learnings

- In Java, `LinkedList` permits `null` elements whereas `ArrayDeque` throws `NullPointerException` on `null`—which is why `serialize` uses `LinkedList` (to queue `null` children) while `deserialize` safely uses faster `ArrayDeque` (queuing only non-null nodes).
- Recording `"#"` only for direct children of non-null nodes keeps serialized size `2n + 1` even on degenerate skewed trees.
