---
comments: true
difficulty: Easy
tags:
  - Array
  - Two Pointers
  - Simulation
---

# 2460. Apply Operations to an Array

**[View Problem on LeetCode](https://leetcode.com/problems/apply-operations-to-an-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2460` (`2460`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Two Pointers`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 0-indexed integer array `nums` of size $n$ consisting of non-negative integers.

You need to apply $n - 1$ sequential operations to `nums`: for each index $i$ from $0$ to $n - 2$, if `nums[i] == nums[i + 1]`, multiply `nums[i]` by 2 and set `nums[i + 1]` to 0. Otherwise, skip the operation.

After performing all $n - 1$ operations in order, shift all 0s to the end of the array while maintaining the relative order of non-zero elements.

Return the resulting array.

---

## Examples

### Example 1

```text
Input: nums = [1,2,2,1,1,0]
Output: [1,4,2,0,0,0]
Explanation: We do the following operations:
- i = 0: nums[0] and nums[1] are not equal, so we skip this operation.
- i = 1: nums[1] and nums[2] are equal, we multiply nums[1] by 2 and change nums[2] to 0. The array becomes [1,4,0,1,1,0].
- i = 2: nums[2] and nums[3] are not equal, so we skip this operation.
- i = 3: nums[3] and nums[4] are equal, we multiply nums[3] by 2 and change nums[4] to 0. The array becomes [1,4,0,2,0,0].
- i = 4: nums[4] and nums[5] are equal, we multiply nums[4] by 2 and change nums[5] to 0. The array becomes [1,4,0,2,0,0].
After that, we shift the 0's to the end, which gives the array [1,4,2,0,0,0].
```

### Example 2

```text
Input: nums = [0,1]
Output: [1,0]
Explanation: No operation can be applied, we just shift the 0 to the end.
```

---

## Constraints

- `2 <= nums.length <= 2000`

- `0 <= nums[i] <= 1000`

---

## Problem Understanding

The problem consists of two distinct stages:
1. **Sequential transformation**: Iterate from index $0$ to $n - 2$. Whenever `nums[i] == nums[i + 1]`, double `nums[i]` (using left shift `<<= 1`) and set `nums[i + 1] = 0`. Notice that if `nums[i] == 0` and `nums[i + 1] == 0`, multiplying by 2 leaves it as 0. Because operations are applied sequentially, setting `nums[i + 1] = 0` affects subsequent comparisons at index $i + 1$.
2. **Stable partition / zero shifting**: Collect all positive integers in their current order, placing them at the beginning of a new array of size $n$, with all remaining slots remaining 0.

---

## Approach

### Brute Force Approach

Simulating the process step-by-step as described is already $O(n)$ because each index is checked once, followed by shifting zeroes. A naive zero shift might repeatedly delete zeroes and append them to the end in $O(n^2)$ time, which is inefficient. Using a secondary array or two pointers accomplishes both stages in $O(n)$ time.

### Optimized Approach

Apply the operations in a single pass from $0$ to $n - 2$ in-place on `nums`. Then, create a result array `ans` initialized with zeroes, and copy all positive elements sequentially using a pointer `i`. This runs in clean $O(n)$ time.

### Step-by-Step Thinking Process

1. Iterate $i$ from $0$ to $n - 2$. If `nums[i] == nums[i + 1]`, update `nums[i] <<= 1` and `nums[i + 1] = 0`.
2. Recognize that Java primitive integer arrays initialize all elements to 0 by default.
3. Allocate `int[] ans = new int[n]`, maintain index pointer `i = 0`.
4. Iterate through the modified `nums`: whenever `x > 0`, assign `ans[i++] = x`.
5. The remaining positions in `ans` naturally remain 0, completing the stable shift.

### Algorithm / Intuition

In the provided Java solution:

1. The loop `for (int i = 0; i < n - 1; ++i)` inspects adjacent pairs. When `nums[i] == nums[i + 1]`, `nums[i] <<= 1` doubles the value in-place, and `nums[i + 1] = 0` zeroes out the neighbor.
2. Next, an array `ans` of length $n$ is allocated.
3. A second loop `for (int x : nums)` filters non-zero values: if `x > 0`, `ans[i++] = x` places it at the front.
4. Since `ans` is zero-filled upon allocation in Java, all remaining indices from `i` to $n - 1$ are already 0, producing the correct result.

---

## Dry Run

Consider Example 1: `nums = [1, 2, 2, 1, 1, 0]`

1. **Sequential Operations**:
   - $i = 0$: `nums[0] (1) != nums[1] (2)` -> skip.
   - $i = 1$: `nums[1] (2) == nums[2] (2)` -> `nums[1] = 4`, `nums[2] = 0`. Array: `[1, 4, 0, 1, 1, 0]`.
   - $i = 2$: `nums[2] (0) != nums[3] (1)` -> skip.
   - $i = 3$: `nums[3] (1) == nums[4] (1)` -> `nums[3] = 2`, `nums[4] = 0`. Array: `[1, 4, 0, 2, 0, 0]`.
   - $i = 4$: `nums[4] (0) == nums[5] (0)` -> `nums[4] = 0`, `nums[5] = 0`. Array: `[1, 4, 0, 2, 0, 0]`.

2. **Zero Shifting**:
   - Non-zero values collected in order: `1, 4, 2`.
   - Placed into `ans`: `ans[0] = 1, ans[1] = 4, ans[2] = 2, ans[3] = 0, ans[4] = 0, ans[5] = 0`.

Final Return: `[1, 4, 2, 0, 0, 0]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Two linear passes are performed: one pass of length $n - 1$ to apply merge operations, and one pass of length $n$ to copy non-zero elements.
- **Space Complexity:** `O(n)` — An auxiliary array `ans` of size $n$ is allocated to store and return the final shifted values.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2460apply-operations-to-an-array.java](./2460apply-operations-to-an-array.java) |

---

## Key Learnings

- Sequential simulation requires mutating elements in-place immediately so subsequent comparisons observe modified values.
- Allocating a zero-initialized array in Java automatically handles trailing zeroes without manual padding.
- Bit-shifting (`x <<= 1`) is an idiomatic and efficient way to multiply an integer by 2.
