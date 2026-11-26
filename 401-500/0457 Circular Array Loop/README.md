---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Two Pointers
  - Floyd's Cycle Finding Algorithm
---

# 457. Circular Array Loop

**[View Problem on LeetCode](https://leetcode.com/problems/circular-array-loop/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0457` (`457`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Two Pointers`, `Floyd's Cycle Finding Algorithm` |
| **Solution Language** | Java |

---

## Problem Description

You are playing a game involving a **circular** array of non-zero integers `nums`. Each `nums[i]` denotes the number of indices forward/backward you must move if you are located at index `i`:

	- If `nums[i]` is positive, move `nums[i]` steps **forward**, and

	- If `nums[i]` is negative, move `abs(nums[i])` steps **backward**.

Since the array is **circular**, you may assume that moving forward from the last element puts you on the first element, and moving backwards from the first element puts you on the last element.

A **cycle** in the array consists of a sequence of indices `seq` of length `k` where:

	- Following the movement rules above results in the repeating index sequence `seq[0] -> seq[1] -> ... -> seq[k - 1] -> seq[0] -> ...`

	- Every `nums[seq[j]]` is either **all positive** or **all negative**.

	- `k > 1`

Return `true`* if there is a **cycle** in *`nums`*, or *`false`* otherwise*.

---

## Examples

### Example 1

![diagram](https://assets.leetcode.com/uploads/2022/09/01/img1.jpg)

```
Input: nums = [2,-1,1,2,2]
Output: true
Explanation: The graph shows how the indices are connected. White nodes are jumping forward, while red is jumping backward.
We can see the cycle 0 --> 2 --> 3 --> 0 --> ..., and all of its nodes are white (jumping in the same direction).
```

### Example 2

![diagram](https://assets.leetcode.com/uploads/2022/09/01/img2.jpg)

```
Input: nums = [-1,-2,-3,-4,-5,6]
Output: false
Explanation: The graph shows how the indices are connected. White nodes are jumping forward, while red is jumping backward.
The only cycle is of size 1, so we return false.
```

### Example 3

![diagram](https://assets.leetcode.com/uploads/2022/09/01/img3.jpg)

```
Input: nums = [1,-1,5,1,4]
Output: true
Explanation: The graph shows how the indices are connected. White nodes are jumping forward, while red is jumping backward.
We can see the cycle 0 --> 1 --> 0 --> ..., and while it is of size > 1, it has a node jumping forward and a node jumping backward, so it is not a cycle.
We can see the cycle 3 --> 4 --> 3 --> ..., and all of its nodes are white (jumping in the same direction).
```

 

**

---

## Constraints

**

	- `1 <= nums.length <= 5000`

	- `-1000 <= nums[i] <= 1000`

	- `nums[i] != 0`

 

**Follow up:** Could you solve it in `O(n)` time complexity and `O(1)` extra space complexity?

---

## Problem Understanding

- Determine whether a circular array of non-zero jump offsets contains a cycle of length `> 1` whose elements all have the same sign (all strictly positive or all strictly negative).

---

## Approach

### Optimized Approach (Floyd's Cycle Detection + In-Place Zero-Marking)
1. Helper `next(i)` computes `(i + nums[i] % n + n) % n` to wrap safely in `[0, n - 1]`.
2. For each unvisited index `i` (`nums[i] != 0`), advance `slow` by 1 step and `fast` by 2 steps as long as every step preserves the starting sign (`nums[slow] * nums[fast] > 0 && nums[slow] * nums[next(fast)] > 0`).
3. If `slow == fast`, check `slow != next(slow)` to reject length-1 self-loops; if valid, return `true`.
4. If no valid cycle is found from `i`, walk the same-sign path starting at `i` and zero out each visited element (`nums[j] = 0`) so no failed path is ever traversed twice.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — each index is traversed at most a constant number of times before being marked `0`.
- **Space Complexity:** $O(1)$ auxiliary space (in-place marking in `nums`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [457circular-array-loop.java](./457circular-array-loop.java) |

---

## Key Learnings

- Marking dead-end paths in place with `0` (impossible as an input value) upgrades Floyd's $O(1)$-space cycle detection from $O(n^2)$ to $O(n)$ time.
