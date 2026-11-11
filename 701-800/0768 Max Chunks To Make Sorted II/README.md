---
comments: true
difficulty: Hard
tags:
  - Array
  - Stack
  - Greedy
  - Sorting
  - Monotonic Stack
---

# 768. Max Chunks To Make Sorted II

**[View Problem on LeetCode](https://leetcode.com/problems/max-chunks-to-make-sorted-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0768` (`768`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Stack`, `Greedy`, `Sorting`, `Monotonic Stack` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array arr.

We split arr into some number of chunks (i.e., partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.

Return the largest number of chunks we can make to sort the array.

 
Example 1:


Input: arr = [5,4,3,2,1]
Output: 1
Explanation:
Splitting into two or more chunks will not return the required result.
For example, splitting into [5, 4], [3, 2, 1] will result in [4, 5, 1, 2, 3], which isn&#39;t sorted.


Example 2:


Input: arr = [2,1,3,4,4]
Output: 4
Explanation:
We can split into two chunks, such as [2, 1], [3, 4, 4].
However, splitting into [2, 1], [3], [4], [4] is the highest number of chunks possible.


 
Constraints:


	1 <= arr.length <= 2000
	0 <= arr[i] <= 108

---

## Problem Understanding

- We want to split array `arr` into maximum chunks such that sorting each chunk individually sorts the entire array.
- A new chunk can be started if the maximum element in all previous chunks is $\le$ the minimum element in all subsequent chunks.
- A monotonic stack maintaining the maximum element of each active chunk provides a clean one-pass solution.

---

## Approach

### Optimized Approach (Monotonic Stack of Chunk Maximums)

1. Maintain a stack `stk` storing the maximum element of each valid chunk.
2. For each element $v$ in `arr`:
   - If stack is empty or $v \ge stk.peek()$: $v$ can start a new chunk on its own; push $v$.
   - Else ($v < stk.peek()$): $v$ violates chunk independence and must merge into preceding chunks.
     - Save the maximum of the current chunk: `mx = stk.pop()`.
     - Pop all previous chunk maximums that are $> v$ (merging them).
     - Push `mx` back onto the stack to represent the combined chunk's maximum.
3. Return `stk.size()`.

---

## Dry Run

For `arr = [2, 1, 3, 4, 4]`:
- `2`: push 2. Stack: `[2]`.
- `1`: $1 < 2$. Pop 2. Stack empty. Push 2. Stack: `[2]`. (Merged chunk `[2, 1]`, max 2).
- `3`: $3 \ge 2$. Push 3. Stack: `[2, 3]`.
- `4`: $4 \ge 3$. Push 4. Stack: `[2, 3, 4]`.
- `4`: $4 \ge 4$. Push 4. Stack: `[2, 3, 4, 4]`.
Result: 4 chunks.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Each element is pushed and popped at most once.
- **Space Complexity:** $O(N)$ for the stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [768max-chunks-to-make-sorted-ii.java](./768max-chunks-to-make-sorted-ii.java) |

---

## Key Learnings

- Storing chunk maximums in a monotonic stack allows retroactive chunk merging in $O(1)$ amortized time per element.
