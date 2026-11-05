---
comments: true
difficulty: Medium
tags:
  - Array
  - String
  - Prefix Sum
---

# 1769. Minimum Number of Operations to Move All Balls to Each Box

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-number-of-operations-to-move-all-balls-to-each-box/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1769` (`1769`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `String`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

You have `n` boxes arranged in a row, represented by a binary string `boxes` of length `n`, where `'1'` means the box initially contains one ball and `'0'` means it is empty.

In a single operation, you can move one ball from its box to an immediately adjacent box (`abs(i - j) == 1`). Moving a ball from index `j` to index `i` therefore takes `abs(i - j)` operations.

Return an integer array `answer` of length `n`, where `answer[i]` is the total minimum operations required to gather **all** balls into box `i` (evaluated independently from the initial configuration for each `i`).

---

## Examples

### Example 1

```text
Input: boxes = "110"
Output: [1,1,3]
Explanation: The answer for each box is as follows:
1) First box: you will have to move one ball from the second box to the first box in one operation.
2) Second box: you will have to move one ball from the first box to the second box in one operation.
3) Third box: you will have to move one ball from the first box to the third box in two operations, and move one ball from the second box to the third box in one operation.
```

### Example 2

```text
Input: boxes = "001011"
Output: [11,8,5,4,3,4]
```

---

## Constraints

- `n == boxes.length`

- `1 <= n <= 2000`

- `boxes[i]` is either `'0'` or `'1'`.

---

## Problem Understanding

- **Independent Contributions:** Moving every ball at index `j` (`boxes[j] == '1'`) to target box `i` costs `sum_{boxes[j] == '1'} |i - j|`.
- **Left/Right Split:** We can split the distance sum at `i` into balls strictly to the left (`j < i`, costing `i - j`) plus balls strictly to the right (`j > i`, costing `j - i`).
- **Incremental Transition:** When shifting target box `i - 1` one step right to `i`, every ball located at `j <= i - 1` must travel **one additional step**!

---

## Approach

### Brute Force Approach

For each target box `i` from `0` to `n - 1`, scan all `j` from `0` to `n - 1` and add `Math.abs(i - j)` whenever `boxes.charAt(j) == '1'`. Because `n <= 2000`, `O(n^2)` (~`4 * 10^6` operations) actually passes, but it performs redundant work that scales poorly compared to `O(n)`.

### Optimized Approach

Use two linear passes to precompute `left[i]` (operations to bring all balls from indices `< i` to `i`) and `right[i]` (operations to bring all balls from indices `> i` to `i`), then sum `ans[i] = left[i] + right[i]`.

### Step-by-Step Thinking Process

1. Define `left[i]` as the cost of moving all balls in `0 .. i - 1` into box `i`, and track `cnt` as the count of balls seen in `0 .. i - 1`.
2. As we move from `i - 1` to `i`, check if `boxes.charAt(i - 1) == '1'` to increment `cnt`, then update `left[i] = left[i - 1] + cnt` (each of those `cnt` balls moves 1 unit further right).
3. Symmetrically, sweep `i` from `n - 2` down to `0`, tracking `cnt` of balls in `i + 1 .. n - 1` and setting `right[i] = right[i + 1] + cnt`.
4. Combine `ans[i] = left[i] + right[i]` for every box `i`.

### Algorithm / Intuition

Think of `cnt` in the forward loop as a 'snowball' of balls we are pushing rightward. At `i = 0`, there are no boxes to the left (`left[0] = 0`). Moving from box `i - 1` to box `i`, if box `i - 1` originally held a ball, it joins our snowball (`++cnt`). Pushing the entire snowball of `cnt` balls from `i - 1` to `i` adds exactly `cnt` operations to `left[i - 1]`, giving `left[i] = left[i - 1] + cnt`. The backward pass mirrors this logic from right to left into `right[i]`, and adding `left[i] + right[i]` yields the exact total operations for box `i`.

---

## Dry Run

Using **Example 1**: `boxes = "110"`, `n = 3`

1. **Forward Pass (`left`):** `left[0] = 0`, `cnt = 0`
   - `i = 1`: `boxes[0] == '1'` -> `cnt = 1`, `left[1] = left[0] + 1 = 1`
   - `i = 2`: `boxes[1] == '1'` -> `cnt = 2`, `left[2] = left[1] + 2 = 3`
   - `left = [0, 1, 3]`
2. **Backward Pass (`right`):** `right[2] = 0`, `cnt = 0`
   - `i = 1`: `boxes[2] == '0'` -> `cnt = 0`, `right[1] = right[2] + 0 = 0`
   - `i = 0`: `boxes[1] == '1'` -> `cnt = 1`, `right[0] = right[1] + 1 = 1`
   - `right = [1, 0, 0]`
3. **Combine (`ans[i] = left[i] + right[i]`):**
   - `ans = [0 + 1, 1 + 0, 3 + 0] = [1, 1, 3]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Three linear loops of length `n` each run in `O(1)` per iteration.
- **Space Complexity:** `O(n)` — Auxiliary arrays `left` and `right` each use `n` integers (in addition to the output array `ans`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1769minimum-number-of-operations-to-move-all-balls-to-each-box.java](./1769minimum-number-of-operations-to-move-all-balls-to-each-box.java) |

---

## Key Learnings

- Sum-of-Manhattan-distances on 1D arrays (`sum |i - j|`) can always be reduced from `O(n^2)` to `O(n)` by splitting into prefix and suffix sweeps.
- Space can be further optimized to `O(1)` extra space (excluding `ans`) by accumulating both the forward and backward running costs directly into `ans[i]`.
