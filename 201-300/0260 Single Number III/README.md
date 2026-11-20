---
comments: true
difficulty: Medium
tags:
  - Array
  - Bit Manipulation
---

# 260. Single Number III

**[View Problem on LeetCode](https://leetcode.com/problems/single-number-iii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0260` (`260`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Bit Manipulation` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `nums`, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in **any order**.

You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.

---

## Examples

### Example 1

```text
**Input:** nums = [1,2,1,3,2,5]
**Output:** [3,5]
**Explanation: ** [5, 3] is also a valid answer.
```

### Example 2

```text
**Input:** nums = [-1,0]
**Output:** [-1,0]
```

### Example 3

```text
**Input:** nums = [0,1]
**Output:** [1,0]
```

 

**

---

## Constraints

**

	
- `2 <= nums.length <= 3 * 10^4`
	
- `-2^31 <= nums[i] <= 2^31 - 1`
	
- Each integer in `nums` will appear twice, only two integers will appear once.

---

## Problem Understanding

- Given an array `nums` where two elements appear once and all others appear twice, return the two unique elements.

---

## Approach

### Approach (Toggle Hash Set)
1. Iterate through `nums` maintaining a `Set`:
   - If `x` is already in `set`, delete it (canceling the pair).
   - Otherwise add `x` to `set`.
2. After one pass, only the two unique numbers remain; return `[...set]`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Single pass with $O(1)$ average set operations.\n- **Space Complexity:** $O(n)$ — Set storage during traversal.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [260single-number-iii.js](./260single-number-iii.js) |

---

## Key Learnings

- A toggle `Set` cancels paired elements on the fly and leaves behind all odd-frequency elements.
