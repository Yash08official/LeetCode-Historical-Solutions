---
comments: true
difficulty: Medium
tags:
  - Array
  - Bit Manipulation
  - Brainteaser
---

# 2425. Bitwise XOR of All Pairings

**[View Problem on LeetCode](https://leetcode.com/problems/bitwise-xor-of-all-pairings/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2425` (`2425`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Bit Manipulation`, `Brainteaser` |
| **Solution Language** | Java |

---

## Problem Description

You are given two 0-indexed integer arrays `nums1` and `nums2` containing non-negative integers.

Consider a hypothetical array `nums3` formed by taking the bitwise XOR of every possible pair `(nums1[i], nums2[j])` where $0 \le i < \text{nums1.length}$ and $0 \le j < \text{nums2.length}$. In other words, `nums3` contains $\text{nums1.length} \times \text{nums2.length}$ integers.

Return the bitwise XOR of all integers in `nums3`.

---

## Examples

### Example 1

```text
Input: nums1 = [2,1,3], nums2 = [10,2,5,0]
Output: 13
Explanation:
A possible nums3 array is [8,0,7,2,11,3,4,1,9,1,6,3].
The bitwise XOR of all these numbers is 13, so we return 13.
```

### Example 2

```text
Input: nums1 = [1,2], nums2 = [3,4]
Output: 0
Explanation:
All possible pairs of bitwise XORs are nums1[0] ^ nums2[0], nums1[0] ^ nums2[1], nums1[1] ^ nums2[0],
and nums1[1] ^ nums2[1].
Thus, one possible nums3 array is [2,5,1,6].
2 ^ 5 ^ 1 ^ 6 = 0, so we return 0.
```

---

## Constraints

- `1 <= nums1.length, nums2.length <= 10^5`

- `0 <= nums1[i], nums2[j] <= 10^9`

---

## Problem Understanding

Let $n = \text{nums1.length}$ and $m = \text{nums2.length}$. The total XOR sum is:

$$\bigoplus_{i=0}^{n-1} \bigoplus_{j=0}^{m-1} (\text{nums1}[i] \oplus \text{nums2}[j])$$

Using the associative and commutative properties of XOR, we can regroup the terms:
- Each element `nums1[i]` appears paired with every element in `nums2`, meaning it is XORed exactly $m$ times.
- Each element `nums2[j]` appears paired with every element in `nums1`, meaning it is XORed exactly $n$ times.

Since $x \oplus x = 0$ and $x \oplus 0 = x$, any value XORed an even number of times completely cancels out, while a value XORed an odd number of times contributes itself once.
- If $m$ (length of `nums2`) is odd, every element of `nums1` contributes to the final result.
- If $n$ (length of `nums1`) is odd, every element of `nums2` contributes to the final result.
- If a length is even, the corresponding array's elements contribute $0$.

---

## Approach

### Brute Force Approach

A naive brute force simulates the problem statement directly by executing a nested loop over all pairs $(i, j)$, computing `nums1[i] ^ nums2[j]`, and XORing it into an accumulator. This takes $O(n \times m)$ time. With $n, m \le 10^5$, $n \times m = 10^{10}$ operations, causing TLE.

### Optimized Approach

Check the parities of the lengths of `nums1` and `nums2`. If `nums2.length` is odd, XOR all elements of `nums1` into the answer. If `nums1.length` is odd, XOR all elements of `nums2` into the answer. This computes the answer in linear $O(n + m)$ time.

### Step-by-Step Thinking Process

1. Write out the algebraic formulation of XOR across all Cartesian pairs: $\bigoplus_{i} \bigoplus_{j} (nums1[i] \oplus nums2[j])$.
2. Reorder the XOR operations: $(\bigoplus_{i} nums1[i]^{(m)}) \oplus (\bigoplus_{j} nums2[j]^{(n)})$.
3. Apply the cancellation property of XOR: $x$ XORed $k$ times is $x$ if $k$ is odd, and $0$ if $k$ is even.
4. Observe that each `nums1[i]` appears $m$ times (where $m = nums2.length$). If $m \% 2 == 1$, XOR all elements of `nums1`.
5. Similarly, each `nums2[j]` appears $n$ times (where $n = nums1.length$). If $n \% 2 == 1$, XOR all elements of `nums2`.

### Algorithm / Intuition

In the provided Java solution:

1. Variable `ans` is initialized to `0`.
2. The condition `nums2.length % 2 == 1` checks whether `nums1` elements appear an odd number of times. If so, a single loop XORs every `v` in `nums1` into `ans`.
3. The condition `nums1.length % 2 == 1` checks whether `nums2` elements appear an odd number of times. If so, a single loop XORs every `v` in `nums2` into `ans`.
4. The combined `ans` is returned. If both lengths are even, neither loop runs and `0` is returned, which is mathematically correct.

---

## Dry Run

Consider Example 1: `nums1 = [2, 1, 3]`, `nums2 = [10, 2, 5, 0]`

1. `nums1.length = 3` (odd), `nums2.length = 4` (even).
2. Check `nums2.length % 2 == 1`: $4 \% 2 == 0$ (false), so loop over `nums1` does not run.
3. Check `nums1.length % 2 == 1`: $3 \% 2 == 1$ (true), so loop over `nums2` runs:
   - `ans = 0 ^ 10 = 10`
   - `ans = 10 ^ 2 = 8`
   - `ans = 8 ^ 5 = 13`
   - `ans = 13 ^ 0 = 13`

Final Return: `13`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + m)` — We iterate over `nums1` at most once and `nums2` at most once, where $n = \text{nums1.length}$ and $m = \text{nums2.length}$.
- **Space Complexity:** `O(1)` — Only a single integer variable `ans` is used, requiring constant extra memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2425bitwise-xor-of-all-pairings.java](./2425bitwise-xor-of-all-pairings.java) |

---

## Key Learnings

- XOR parity cancellation ($x \oplus x = 0$) often collapses Cartesian product computations into independent linear scans.
- Always evaluate how many times each individual input element appears in the final result before executing nested loops.
- Parity checks on array lengths instantly eliminate redundant operations.
