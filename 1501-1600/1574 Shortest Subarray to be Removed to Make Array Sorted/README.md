---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Binary Search
  - Stack
  - Monotonic Stack
---

# 1574. Shortest Subarray to be Removed to Make Array Sorted

**[View Problem on LeetCode](https://leetcode.com/problems/shortest-subarray-to-be-removed-to-make-array-sorted/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1574` (`1574`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Binary Search`, `Stack`, `Monotonic Stack` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `arr`, our objective is to find the minimum length of a contiguous subarray that, when removed from `arr`, leaves the remaining elements sorted in non-decreasing order.

We are permitted to remove an empty subarray (length 0) if the array is already sorted, or remove elements from the middle, beginning, or end, provided that the elements removed form a single contiguous segment.

---

## Examples

### Example 1

```text
Input: arr = [1,2,3,10,4,2,3,5]
Output: 3
Explanation: The shortest subarray we can remove is [10,4,2] of length 3. The remaining elements after that will be [1,2,3,3,5] which are sorted.
Another correct solution is to remove the subarray [3,10,4].
```

### Example 2

```text
Input: arr = [5,4,3,2,1]
Output: 4
Explanation: Since the array is strictly decreasing, we can only keep a single element. Therefore we need to remove a subarray of length 4, either [5,4,3,2] or [4,3,2,1].
```

### Example 3

```text
Input: arr = [1,2,3]
Output: 0
Explanation: The array is already non-decreasing. We do not need to remove any elements.
```

---

## Constraints

- `1 <= arr.length <= 10^5`

- `0 <= arr[i] <= 10^9`

---

## Problem Understanding

Removing a contiguous subarray from `arr` means keeping a prefix `arr[0..l]` and a suffix `arr[r..n-1]` (where either prefix or suffix can be empty). The resulting concatenated array must satisfy:
1. Prefix `arr[0..l]` is non-decreasing.
2. Suffix `arr[r..n-1]` is non-decreasing.
3. Cross-boundary condition: `arr[l] <= arr[r]`.
The length of the removed subarray is $r - l - 1$. We want to minimize $r - l - 1$ across all valid pairs $(l, r)$.

---

## Approach

### Brute Force Approach

A brute-force solution checks all possible subarrays to remove by iterating over all pairs $(i, j)$ with $0 \le i \le j < n$. For each candidate subarray `arr[i..j]`, it constructs or verifies if the remaining sequence is non-decreasing. With $O(n^2)$ subarray candidates and $O(n)$ verification time, this naive approach takes $O(n^3)$ (or $O(n^2)$ with precomputed bounds), which immediately times out for $n = 10^5$.

### Optimized Approach

Find the longest non-decreasing prefix ending at index `i` and the longest non-decreasing suffix starting at index `j`. If `i >= j`, the array is already sorted, so return 0. Otherwise, initialize the answer to removing either everything after the prefix (`n - i - 1`) or everything before the suffix (`j`). Then use a two-pointer technique to iterate `l` from $0$ to $i$ and advance `r` from $j$ upwards until `arr[r] >= arr[l]`, tracking $\min(ans, r - l - 1)$.

### Step-by-Step Thinking Process

1. Any valid remaining array must be formed by a non-decreasing prefix `arr[0..l]` and a non-decreasing suffix `arr[r..n-1]`.
2. First, scan from left to find the maximum `i` such that `arr[0..i]` is sorted (`arr[k] <= arr[k+1]`).
3. Second, scan from right to find the minimum `j` such that `arr[j..n-1]` is sorted (`arr[k-1] <= arr[k]`).
4. If $i \ge j$, the entire array is already sorted; return 0.
5. A baseline solution is keeping only `arr[0..i]` (cost `n - i - 1`) or keeping only `arr[j..n-1]` (cost `j`). Initialize `ans = Math.min(n - i - 1, j)`.
6. To combine a non-empty prefix with a non-empty suffix, loop pointer `l` through $[0, i]$. For each `l`, advance pointer `r` starting from `j` until `arr[r] >= arr[l]`. Then candidate removal length is $r - l - 1$.

### Algorithm / Intuition

Because both the prefix `arr[0..i]` and the suffix `arr[j..n-1]` are already sorted, as `l` increases, `arr[l]` is non-decreasing. This means the required matching value in the suffix `arr[r]` can only stay the same or move to the right. Hence, the right pointer `r` never needs to be reset backwards; it moves monotonically forward from `j` to `n`. This guarantees that the two-pointer loop runs in linear $O(n)$ time.

---

## Dry Run

Let's trace Example 1: `arr = [1, 2, 3, 10, 4, 2, 3, 5]`, `n = 8`
- Find prefix: `arr[0]=1 <= arr[1]=2 <= arr[2]=3 <= arr[3]=10`, but `arr[3] > arr[4]=4`. So `i = 3` (`arr[0..3] = [1,2,3,10]`).
- Find suffix: `arr[5]=2 <= arr[6]=3 <= arr[7]=5`, but `arr[4]=4 > arr[5]=2`. So `j = 5` (`arr[5..7] = [2,3,5]`).
- `i = 3 < j = 5`. Initial `ans = Math.min(8 - 3 - 1, 5) = Math.min(4, 5) = 4`.
- Two-pointer loop `for (l = 0, r = 5; l <= 3; ++l)`:
  - `l = 0 (arr[0]=1)`: `arr[r]=arr[5]=2 >= 1`. Candidate `r - l - 1 = 5 - 0 - 1 = 4`. `ans = min(4, 4) = 4`.
  - `l = 1 (arr[1]=2)`: `arr[r]=arr[5]=2 >= 2`. Candidate `5 - 1 - 1 = 3`. `ans = min(4, 3) = 3`.
  - `l = 2 (arr[2]=3)`: `arr[5]=2 < 3` -> advance `r` to 6 (`arr[6]=3 >= 3`). Candidate `6 - 2 - 1 = 3`. `ans = min(3, 3) = 3`.
  - `l = 3 (arr[3]=10)`: `arr[6]=3 < 10`, `arr[7]=5 < 10` -> `r` advances to 8 (`r == n`). Loop terminates.
Result: `ans = 3` (removing `[10, 4, 2]`, keeping `[1, 2, 3, 3, 5]`).

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Finding the prefix takes at most `n` steps, finding the suffix takes at most `n` steps, and the two pointers `l` and `r` each advance monotonically across the array at most once.
- **Space Complexity:** `O(1)` — Only a few primitive integer pointers (`n`, `i`, `j`, `l`, `r`, `ans`) are allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1574shortest-subarray-to-be-removed-to-make-array-sorted.java](./1574shortest-subarray-to-be-removed-to-make-array-sorted.java) |

---

## Key Learnings

- Deconstruct subarray removal problems into keeping a sorted prefix and a sorted suffix.
- Monotonicity of both the prefix and the suffix allows replacing binary search with a clean two-pointer sliding scan.
- Always account for boundary scenarios where the entire prefix or entire suffix alone forms the optimal remaining array.
