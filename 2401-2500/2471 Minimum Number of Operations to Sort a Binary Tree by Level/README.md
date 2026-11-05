---
comments: true
difficulty: Medium
tags:
  - Tree
  - Breadth-First Search
  - Binary Tree
---

# 2471. Minimum Number of Operations to Sort a Binary Tree by Level

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-number-of-operations-to-sort-a-binary-tree-by-level/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2471` (`2471`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Breadth-First Search`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

You are given the root of a binary tree with unique values.

In one operation, you can choose any two nodes at the same level and swap their values.

Return the minimum number of operations needed to make the values at each level strictly increasing from left to right.

---

## Examples

### Example 1

```text
Input: root = [1,4,3,7,6,8,5,null,null,null,null,9,null,10]
Output: 3
Explanation:
- Swap 4 and 3. The 2^nd level becomes [3,4].
- Swap 7 and 5. The 3^rd level becomes [5,6,8,7].
- Swap 8 and 7. The 3^rd level becomes [5,6,7,8].
We used 3 operations so return 3.
It can be proven that 3 is the minimum number of operations needed.
```

### Example 2

```text
Input: root = [1,3,2,7,6,5,4]
Output: 3
Explanation:
- Swap 3 and 2. The 2^nd level becomes [2,3].
- Swap 7 and 4. The 3^rd level becomes [4,6,5,7].
- Swap 6 and 5. The 3^rd level becomes [4,5,6,7].
We used 3 operations so return 3.
It can be proven that 3 is the minimum number of operations needed.
```

### Example 3

```text
Input: root = [1,2,3,4,5,6]
Output: 0
Explanation: Each level is already sorted in increasing order so return 0.
```

---

## Constraints

- The number of nodes in the tree is in the range `[1, 10^5]`.

- `1 <= Node.val <= 10^5`

- All the values of the tree are **unique**.

---

## Problem Understanding

The problem decouples across tree levels: swapping nodes at one level never influences nodes at any other level. Therefore, we can solve the problem independently for each level and sum the operations.

For a single level with an array of values $t$ of length $k$, we want to find the minimum number of swaps to sort $t$ in ascending order. This is the classic **minimum permutation cycles** problem:
- Sorting an array requires rearranging elements into their target sorted positions.
- Every permutation can be decomposed into disjoint directed permutation cycles.
- A cycle of length $L$ requires exactly $L - 1$ swaps to place all its elements in their correct positions.
- Thus, the minimum swaps for an array of length $k$ with $C$ disjoint cycles is $\sum (L_i - 1) = k - C$.

---

## Approach

### Brute Force Approach

A naive approach attempts BFS/DFS over all possible swap states for each level to find the shortest transformation path to sorted order. Because there are $k!$ possible permutations of a level, state-space search is factorial $O(k!)$, which is completely impractical.

### Optimized Approach

1. Perform a standard level-order BFS traversal using a queue to collect the node values at each level into a list `t`.
2. For each level `t`, call helper `f(t)`:
   - Sort a copy `alls` of `t` to determine the target index for each value.
   - Create array `arr` where `arr[i]` is the target sorted index of `t[i]`.
   - Perform in-place cycle following: while `arr[i] != i`, swap `arr[i]` with `arr[arr[i]]` and increment the swap counter.
3. Sum the swap counts across all levels.

### Step-by-Step Thinking Process

1. Notice that levels are completely independent; total swaps = sum of minimum swaps for each level.
2. Use BFS with `Deque<TreeNode>` to extract each level's values into `List<Integer> t`.
3. Formulate minimum swaps to sort an array: identify permutation cycles.
4. Sort `t` to create `alls`, mapping each value to its final target position in a hash map `m`.
5. Construct index permutation array `arr` where `arr[i] = m.get(t.get(i))`.
6. Traverse `arr`: for each index $i$, repeatedly swap `arr[i]` with `arr[arr[i]]` until `arr[i] == i`, incrementing `ans` on each swap.
7. Return total accumulated swaps.

### Algorithm / Intuition

In the provided Java solution:

1. `minimumOperations(TreeNode root)` conducts standard level-order traversal with `Deque<TreeNode> q`. For each level, size $n$ elements are polled, their values added to `t`, and their children enqueued. `ans += f(t)` accumulates swaps.
2. Inside `f(List<Integer> t)`:
   - `alls` copies `t` and is sorted in ascending order.
   - `Map<Integer, Integer> m` maps each value to its sorted index `0` to `n - 1`.
   - `arr[i]` stores the target position of `t.get(i)`.
   - The loop `for (int i = 0; i < n; ++i)` executes `while (arr[i] != i)`: it swaps `arr[i]` into its home position `arr[arr[i]]`, incrementing `ans++`. Every swap resolves one misplaced element in a cycle, correctly achieving minimal swaps.

---

## Dry Run

Consider Example 1: Tree with levels [1], [4, 3], [7, 6, 8, 5], [9, null, 10]

1. **Level 0**: `[1]` -> size 1, already sorted, `f([1]) = 0` swaps.
2. **Level 1**: `[4, 3]`:
   - Sorted `alls = [3, 4]`. Target map: `3 -> 0, 4 -> 1`.
   - `arr = [1, 0]`.
   - $i = 0$: `arr[0] = 1 != 0` -> swap `arr[0]` and `arr[1]`. `arr` becomes `[0, 1]`, `ans = 1`.
   - Returns `1` swap.
3. **Level 2**: `[7, 6, 8, 5]`:
   - Sorted `alls = [5, 6, 7, 8]`. Target map: `5->0, 6->1, 7->2, 8->3`.
   - `arr = [2, 1, 3, 0]`.
   - $i = 0$: `arr[0] = 2 != 0` -> swap index 0 and 2: `arr = [3, 1, 2, 0]`, swap 1.
   - $i = 0$: `arr[0] = 3 != 0` -> swap index 0 and 3: `arr = [0, 1, 2, 3]`, swap 2.
   - Returns `2` swaps.
4. Total swaps: $0 + 1 + 2 = 3$.

---

## Complexity Analysis

- **Time Complexity:** `O(n \log n)` — Level-order traversal visits all $n$ nodes in $O(n)$ time. At each level of size $k$, sorting takes $O(k \log k)$ and cycle decomposition takes $O(k)$ time. Across all levels, $\sum k_i = n$, so $\sum k_i \log k_i \le O(n \log n)$.
- **Space Complexity:** `O(n)` — The BFS queue and auxiliary lists/maps at each level store up to $O(n)$ nodes.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2471minimum-number-of-operations-to-sort-a-binary-tree-by-level.java](./2471minimum-number-of-operations-to-sort-a-binary-tree-by-level.java) |

---

## Key Learnings

- Independent subproblems at each level of a tree can be processed level by level via BFS.
- The minimum number of swaps to sort an array is $n - C$, where $C$ is the number of permutation cycles.
- Cycle swapping via `while (arr[i] != i) swap(...)` implements cycle resolution in linear time without complex graph cycle detection.
