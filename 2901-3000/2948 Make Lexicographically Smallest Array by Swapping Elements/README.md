---
comments: true
difficulty: Medium
tags:
  - Array
  - Union-Find
  - Sorting
---

# 2948. Make Lexicographically Smallest Array by Swapping Elements

**[View Problem on LeetCode](https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2948` (`2948`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Union-Find`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

We are given a 0-indexed array of positive integers `nums` and a positive integer `limit`. In one operation, we can swap any two elements `nums[i]` and `nums[j]` if and only if their absolute difference satisfies `|nums[i] - nums[j]| <= limit`.

We can perform this swap operation any number of times. Our goal is to return the lexicographically smallest array that can be obtained.

---

## Examples

### Example 1

```text
Input: nums = [1,5,3,9,8], limit = 2
Output: [1,3,5,8,9]
Explanation: Apply the operation 2 times:
- Swap nums[1] with nums[2]. The array becomes [1,3,5,9,8]
- Swap nums[3] with nums[4]. The array becomes [1,3,5,8,9]
We cannot obtain a lexicographically smaller array by applying any more operations.
Note that it may be possible to get the same result by doing different operations.
```

### Example 2

```text
Input: nums = [1,7,6,18,2,1], limit = 3
Output: [1,6,7,18,1,2]
Explanation: Apply the operation 3 times:
- Swap nums[1] with nums[2]. The array becomes [1,6,7,18,2,1]
- Swap nums[0] with nums[4]. The array becomes [2,6,7,18,1,1]
- Swap nums[0] with nums[5]. The array becomes [1,6,7,18,1,2]
We cannot obtain a lexicographically smaller array by applying any more operations.
```

### Example 3

```text
Input: nums = [1,7,28,19,10], limit = 3
Output: [1,7,28,19,10]
Explanation: [1,7,28,19,10] is the lexicographically smallest array we can obtain because we cannot apply the operation on any two indices.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `1 <= nums[i] <= 10^9`

- `1 <= limit <= 10^9`

---

## Problem Understanding

Key insights into transitivity and equivalence classes:
- If element `A` can swap with `B` (`|A - B| <= limit`) and `B` can swap with `C` (`|B - C| <= limit`), then `A` can swap with `C` via intermediate swaps through `B`, even if `|A - C| > limit`.
- Thus, the swap relation defines an equivalence relation (connected components) on values.
- Within any connected component, elements can be permuted into any arbitrary order among the original indices occupied by those elements.
- To make the entire array lexicographically smallest, the smallest values belonging to a component should be placed at the smallest indices belonging to that same component.

---

## Approach

### Brute Force Approach

A naive approach would build an explicit graph by creating an edge between every pair of indices `(i, j)` where `|nums[i] - nums[j]| <= limit`, find connected components using BFS/DFS, and sort values and indices within each component. In the worst case, the graph has `O(n^2)` edges, which consumes prohibitive time and memory for `n = 10^5`.

### Optimized Approach

We sort the indices of `nums` by their corresponding values (`idx` sorted such that `nums[idx[0]] <= nums[idx[1]] <= ...`).
- In this value-sorted sequence, adjacent values belong to the same component if and only if `nums[idx[j]] - nums[idx[j - 1]] <= limit`.
- We identify contiguous subsegments `[i, j)` in this sorted order that form a single component.
- For each component segment, we extract its original indices `t = Arrays.copyOfRange(idx, i, j)` and sort `t` ascending.
- Finally, we assign the sorted component values `nums[idx[k]]` to the sorted component indices `t[k - i]` in order.

### Step-by-Step Thinking Process

1. Transitivity implies that connectivity can be checked purely on sorted values: if `x <= y <= z` and `y - x <= limit` and `z - y <= limit`, then `x, y, z` belong to the same component.
2. Therefore, if we sort the elements by value, the connected components appear as contiguous intervals in the sorted order!
3. Any element in interval `[i, j)` can occupy any position originally held by indices `idx[i], idx[i+1], ..., idx[j-1]`.
4. To achieve the lexicographically smallest arrangement, we must place the smallest values into the smallest indices.
5. Sorting the subset of indices `t = [idx[i] .. idx[j-1]]` and mapping `ans[t[k - i]] = nums[idx[k]]` achieves optimal placement.

### Algorithm / Intuition

The algorithm operates as follows:
1. Initialize `idx` array with `0, 1, ..., n - 1` and sort it with custom comparator `(i, j) -> nums[i] - nums[j]`.
2. Allocate result array `ans` of size `n`.
3. Loop `i` from `0` to `n - 1`:
   - Advance `j = i + 1` while `j < n` and `nums[idx[j]] - nums[idx[j - 1]] <= limit`.
   - Copy the index slice `idx[i..j-1]` into temporary array `t`.
   - Sort `t` in ascending order (sorting original positions).
   - Assign `ans[t[k - i]] = nums[idx[k]]` for all `k` from `i` to `j - 1`.
   - Advance `i = j` to the start of the next component.
4. Return `ans`.

---

## Dry Run

Trace on Example 1: `nums = [1, 5, 3, 9, 8], limit = 2` (`n = 5`)

- Sort indices by value:
  - Values: `nums[0]=1, nums[2]=3, nums[1]=5, nums[4]=8, nums[3]=9`.
  - `idx = [0, 2, 1, 4, 3]`.
- Find contiguous components:
  - Difference `nums[idx[1]] - nums[idx[0]] = 3 - 1 = 2 <= 2`.
  - Difference `nums[idx[2]] - nums[idx[1]] = 5 - 3 = 2 <= 2`.
  - Difference `nums[idx[3]] - nums[idx[2]] = 8 - 5 = 3 > 2` -> Component 1 ends at `j = 3`.
- Component 1 (`i = 0, j = 3`):
  - Values: `[1, 3, 5]` at `idx = [0, 2, 1]`.
  - Copy and sort indices `t = [0, 1, 2]`.
  - Assign: `ans[0] = 1`, `ans[1] = 3`, `ans[2] = 5`.
- Component 2 (`i = 3, j = 5`):
  - Difference `nums[idx[4]] - nums[idx[3]] = 9 - 8 = 1 <= 2`.
  - Values: `[8, 9]` at `idx = [4, 3]`.
  - Copy and sort indices `t = [3, 4]`.
  - Assign: `ans[3] = 8`, `ans[4] = 9`.
- Final `ans = [1, 3, 5, 8, 9]`, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(n log n) — Sorting the initial `idx` array takes O(n log n). Sorting sub-arrays of indices `t` across all components sums to at most O(n log n) total time.
- **Space Complexity:** O(n) — The index array `idx`, result array `ans`, and temporary slices `t` require O(n) auxiliary memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2948make-lexicographically-smallest-array-by-swapping-elements.java](./2948make-lexicographically-smallest-array-by-swapping-elements.java) |

---

## Key Learnings

- Transitive swapping conditions decompose an array into independent connected components.
- Sorting values groups elements into connected components as contiguous intervals, avoiding quadratic graph construction.
- Greedy assignment pairs sorted component values with sorted original indices to guarantee lexicographical minimality.
