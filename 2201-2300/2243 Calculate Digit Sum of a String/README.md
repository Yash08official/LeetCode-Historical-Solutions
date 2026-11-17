---
comments: true
difficulty: Easy
tags:
  - String
  - Simulation
---

# 2243. Calculate Digit Sum of a String

**[View Problem on LeetCode](https://leetcode.com/problems/calculate-digit-sum-of-a-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2243` (`2243`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String`, `Simulation` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a string `s` consisting of digits and an integer `k`.

A **round** can be completed if the length of `s` is greater than `k`. In one round, do the following:

	
- **Divide** `s` into **consecutive groups** of size `k` such that the first `k` characters are in the first group, the next `k` characters are in the second group, and so on. **Note** that the size of the last group can be smaller than `k`.
	
- **Replace** each group of `s` with a string representing the sum of all its digits. For example, `"346"` is replaced with `"13"` because `3 + 4 + 6 = 13`.
	
- **Merge** consecutive groups together to form a new string. If the length of the string is greater than `k`, repeat from step `1`.

Return `s` *after all rounds have been completed*.

---

## Examples

### Example 1

```text
**Input:** s = "11111222223", k = 3
**Output:** "135"
**Explanation:** 
- For the first round, we divide s into groups of size 3: "111", "112", "222", and "23".
  ​​​​​Then we calculate the digit sum of each group: 1 + 1 + 1 = 3, 1 + 1 + 2 = 4, 2 + 2 + 2 = 6, and 2 + 3 = 5. 
  So, s becomes "3" + "4" + "6" + "5" = "3465" after the first round.
- For the second round, we divide s into "346" and "5".
  Then we calculate the digit sum of each group: 3 + 4 + 6 = 13, 5 = 5. 
  So, s becomes "13" + "5" = "135" after second round. 
Now, s.length <= k, so we return "135" as the answer.
```

### Example 2

```text
**Input:** s = "00000000", k = 3
**Output:** "000"
**Explanation:** 
We divide s into "000", "000", and "00".
Then we calculate the digit sum of each group: 0 + 0 + 0 = 0, 0 + 0 + 0 = 0, and 0 + 0 = 0. 
s becomes "0" + "0" + "0" = "000", whose length is equal to k, so we return "000".
```

 

**

---

## Constraints

**

	
- `1 <= s.length <= 100`
	
- `2 <= k <= 100`
	
- `s` consists of digits only.

---

## Problem Understanding

- Given a string `s` of digits and integer `k`, repeatedly group consecutive digits into chunks of size `k`, replace each chunk with the sum of its digits represented as a string, and concatenate results.
- Repeat until the string's length is $\le k$.

---

## Approach

### Optimized Approach (Iterative Simulation / Chunk Reduction)

1. While `s.length > k`:
   - Initialize an empty array `t` to collect chunk digit sums.
   - Iterate through `s` in steps of `k` (`i = 0, k, 2k, ...`):
     - Slice chunk `s.slice(i, i + k)`.
     - Sum its digits using `.split('').reduce((a, b) => a + +b, 0)`.
     - Push the sum to `t`.
   - Reassign `s = t.join('')`.
2. Return final string `s`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log_k n)$ — In each round, string length contracts by a factor of roughly $k/(	ext{digit sum digits})$, terminating in logarithmic rounds.
- **Space Complexity:** $O(n)$ — Auxiliary array for storing intermediate chunk sums.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2243calculate-digit-sum-of-a-string.js](./2243calculate-digit-sum-of-a-string.js) |

---

## Key Learnings

- Direct string simulation with clean chunking and reduce-based summing faithfully mirrors problem specifications without complex math.
