---
comments: true
difficulty: Medium
tags:
  - Array
  - Prefix Sum
---

# 238. Product of Array Except Self

**[View Problem on LeetCode](https://leetcode.com/problems/product-of-array-except-self/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0238` (`238`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Prefix Sum` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `nums`, return an array `answer` of the same length where `answer[i]` equals the product of every element in `nums` **except** `nums[i]`.

Every prefix product and suffix product of `nums` is guaranteed to fit within a 32-bit signed integer. Your algorithm must run in `O(n)` time and **must not use the division operation**.

---

## Examples

### Example 1

```text
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```

### Example 2

```text
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```

---

## Constraints

- `2 <= nums.length <= 10^5`

- `-30 <= nums[i] <= 30`

- The input is generated such that `answer[i]` is **guaranteed** to fit in a **32-bit** integer.

---

## Follow-up Questions

Can you solve the problem in `O(1)` extra space complexity? (The output array **does not** count as extra space for space complexity analysis.)

Our JavaScript solution directly achieves the **`O(1)` extra space** follow-up: instead of allocating two `O(n)` auxiliary arrays for left and right products, we write prefix products straight into the output array `ans` and fold suffix products in reverse using a single scalar accumulator `right`.

---

## Problem Understanding

Why can't we just multiply all elements into `totalProduct` and compute `totalProduct / nums[i]`? First, division is explicitly forbidden; second, even if division were allowed, zeros in `nums` (as in Example 2: `[-1, 1, 0, -3, 3]`) cause division-by-zero failures unless tracked separately (`0` zeros vs `1` zero vs `>= 2` zeros). Instead, observe that for every index `i`:

`answer[i] = (nums[0] * ... * nums[i - 1]) * (nums[i + 1] * ... * nums[n - 1])`

That is simply **(product of all elements strictly left of `i`)** multiplied by **(product of all elements strictly right of `i`)**, which handles any number of zeros naturally without branching!

---

## Approach

### Brute Force Approach

For each index `i` from `0` to `n - 1`, run an inner loop `j` from `0` to `n - 1` multiplying all `nums[j]` where `j !== i`. With `n <= 10^5`, this nested loop performs `O(n^2)` multiplications (`~10^10` operations) and times out.

### Optimized Approach

Perform two linear passes using only the output array `ans` and two running scalar accumulators (`left` and `right`): first sweep left-to-right storing exclusive prefix products in `ans[i]`, then sweep right-to-left multiplying each `ans[i]` by the exclusive suffix product `right`.

### Step-by-Step Thinking Process

1. Allocate the output array `const ans = new Array(n)`.
2. Sweep left-to-right (`i = 0` to `n - 1`) maintaining `left = 1` (the product of `nums[0..i - 1]`): assign `ans[i] = left` **before** updating `left *= nums[i]` so `nums[i]` itself is excluded.
3. Sweep right-to-left (`i = n - 1` down to `0`) maintaining `right = 1` (the product of `nums[i + 1..n - 1]`): multiply `ans[i] *= right` **before** updating `right *= nums[i]`.
4. Return `ans`.

### Algorithm / Intuition

Storing prefix products directly inside `ans` avoids allocating separate `prefix[]` and `suffix[]` arrays:
- After the first loop finishes, `ans` holds `[1, nums[0], nums[0]*nums[1], ..., nums[0]*...*nums[n-2]]`.
- During the second loop, `right` accumulates `[1, nums[n-1], nums[n-1]*nums[n-2], ...]` from right to left and multiplies it straight into `ans[i]`.
- Ordering the statements as `ans[i] = left; left *= nums[i];` (and `ans[i] *= right; right *= nums[i];`) is the key to keeping both products **strictly exclusive** of `nums[i]`.

---

## Dry Run

Tracing Example 1: `nums = [1, 2, 3, 4]` (`n = 4`):

**Pass 1 (Left-to-Right Prefix Products):**

| `i` | `nums[i]` | `left` Entering | `ans[i] = left` | `left` Updated (`left * nums[i]`) |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `1` | `1` | `ans[0] = 1` | `1` |
| `1` | `2` | `1` | `ans[1] = 1` | `2` |
| `2` | `3` | `2` | `ans[2] = 2` | `6` |
| `3` | `4` | `6` | `ans[3] = 6` | `24` |

After Pass 1: `ans = [1, 1, 2, 6]`.

**Pass 2 (Right-to-Left Suffix Products):**

| `i` | `nums[i]` | `right` Entering | `ans[i] *= right` | `right` Updated (`right * nums[i]`) |
| :--- | :--- | :--- | :--- | :--- |
| `3` | `4` | `1` | `ans[3] = 6 * 1 = 6` | `4` |
| `2` | `3` | `4` | `ans[2] = 2 * 4 = 8` | `12` |
| `1` | `2` | `12` | `ans[1] = 1 * 12 = 12` | `24` |
| `0` | `1` | `24` | `ans[0] = 1 * 24 = 24` | `24` |

Final `ans` returned: `[24, 12, 8, 6]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Executes two sequential `O(n)` passes over `nums` with `O(1)` arithmetic per index.
- **Space Complexity:** `O(1)` extra space (`O(n)` including the required output array `ans`) — Uses only scalar loop variables `i`, `left`, and `right` beyond `ans`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [238product-of-array-except-self.js](./238product-of-array-except-self.js) |

---

## Key Learnings

- Decomposing "all elements except `i`" into `(prefix before i) * (suffix after i)` works for any associative operation (multiplication, bitwise AND/OR, GCD, modular arithmetic) even when no inverse operation exists!
- Reusing the output array to hold prefix results and folding suffix results in-place with a running scalar cuts auxiliary space from `O(n)` to `O(1)`.
- In JavaScript, `-1 * 0` can technically produce `-0` (`Object.is(-0, 0)` is `false`, though `-0 === 0` is `true`); if strict `+0` normalization is ever required in custom harnesses, `ans[i] = ans[i] || 0` normalizes `-0` to `0`.
