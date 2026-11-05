---
comments: true
difficulty: Easy
tags:
  - Array
  - Binary Search
  - Counting
---

# 2529. Maximum Count of Positive Integer and Negative Integer

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-count-of-positive-integer-and-negative-integer/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2529` (`2529`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Binary Search`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` sorted in non-decreasing order, return the maximum between the count of positive integers and the count of negative integers.

- An integer is positive if $x > 0$.
- An integer is negative if $x < 0$.
- Note that `0` is neither positive nor negative.

---

## Examples

### Example 1

```text
Input: nums = [-2,-1,-1,1,2,3]
Output: 3
Explanation: There are 3 positive integers and 3 negative integers. The maximum count among them is 3.
```

### Example 2

```text
Input: nums = [-3,-2,-1,0,0,1,2]
Output: 3
Explanation: There are 2 positive integers and 3 negative integers. The maximum count among them is 3.
```

### Example 3

```text
Input: nums = [5,20,66,1314]
Output: 4
Explanation: There are 4 positive integers and 0 negative integers. The maximum count among them is 4.
```

---

## Constraints

- `1 <= nums.length <= 2000`

- `-2000 <= nums[i] <= 2000`

- `nums` is sorted in a **non-decreasing order**.

---

## Follow-up Questions

Can you solve the problem in `O(log(n))` time complexity?

**Addressing the Follow-up ($O(\log n)$ time)**:

Because `nums` is sorted in non-decreasing order, we can solve this problem in $O(\log n)$ time using binary search instead of $O(n)$ linear scan:
1. Find the count of negative numbers: Use binary search to find the index of the first element $\ge 0$. All elements to the left are strictly negative, so `neg_count` equals this index.
2. Find the count of positive numbers: Use binary search to find the index of the first element $> 0$ (or $\ge 1$). All elements from this index to the end of the array are strictly positive, so `pos_count = n - index`.
3. Return $\max(\text{pos\_count}, \text{neg\_count})$.

This binary search approach performs only $2 \log_2 n$ comparisons, reducing the runtime to $O(\log n)$ while retaining $O(1)$ space.

---

## Problem Understanding

The problem requires counting how many numbers in `nums` are strictly negative (`neg`) and how many are strictly positive (`pos`), then returning $\max(\text{pos}, \text{neg})$. Because `nums` is sorted in non-decreasing order, negative numbers appear contiguously at the beginning, zeroes in the middle, and positive numbers at the end. Zeroes must not be counted in either category.

---

## Approach

### Brute Force Approach

The user's provided solution implements a direct linear scan: iterate through the array, increment counter `a` if $x > 0$, and increment counter `b` if $x < 0$. This inspects all $n$ elements in $O(n)$ time and $O(1)$ space. With $n \le 2000$, this executes instantaneously.

### Optimized Approach

The solution code performs a single linear pass over `nums` using a for-each loop, maintaining counters `a` (positives) and `b` (negatives), and returns `Math.max(a, b)`.

### Step-by-Step Thinking Process

1. Initialize counters `a = 0` (for positives) and `b = 0` (for negatives).
2. Iterate through each element `x` in `nums`.
3. If `x > 0`, increment `a`.
4. Else if `x < 0`, increment `b`.
5. If `x == 0`, skip.
6. Return `Math.max(a, b)`.

### Algorithm / Intuition

In the provided Java solution:

1. Variables `a` and `b` are initialized to 0.
2. The enhanced for-loop `for (int x : nums)` examines each integer:
   - If `x > 0`, `++a` increments positive count.
   - Else if `x < 0`, `++b` increments negative count.
   - Zeroes are ignored.
3. Finally, `Math.max(a, b)` returns the larger of the two counts.

---

## Dry Run

Consider Example 1: `nums = [-2, -1, -1, 1, 2, 3]`

1. Initialization: `a = 0`, `b = 0`.
2. `x = -2`: `x < 0` -> `b = 1`.
3. `x = -1`: `x < 0` -> `b = 2`.
4. `x = -1`: `x < 0` -> `b = 3`.
5. `x = 1`: `x > 0` -> `a = 1`.
6. `x = 2`: `x > 0` -> `a = 2`.
7. `x = 3`: `x > 0` -> `a = 3`.
8. Return `Math.max(a, b) = Math.max(3, 3) = 3`.

Final Return: `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — A single pass inspects all $n$ elements of `nums`.
- **Space Complexity:** `O(1)` — Only two scalar integer counters (`a`, `b`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2529maximum-count-of-positive-integer-and-negative-integer.java](./2529maximum-count-of-positive-integer-and-negative-integer.java) |

---

## Key Learnings

- Direct single-pass counting is clean, robust, and fast for small constraints ($n \le 2000$).
- Clear boundary logic (`x > 0` and `x < 0`) prevents zeroes from being incorrectly attributed.
- When an array is sorted, binary search can achieve logarithmic time complexity as discussed in the follow-up.
