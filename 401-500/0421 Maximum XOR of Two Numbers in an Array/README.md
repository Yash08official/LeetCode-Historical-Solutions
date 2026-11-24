---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Bit Manipulation
  - Trie
---

# 421. Maximum XOR of Two Numbers in an Array

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0421` (`421`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Bit Manipulation`, `Trie` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, return *the maximum result of *`nums[i] XOR nums[j]`, where `0 <= i <= j < n`.

---

## Examples

### Example 1

```text
**Input:** nums = [3,10,5,25,2,8]
**Output:** 28
**Explanation:** The maximum result is 5 XOR 25 = 28.
```

### Example 2

```text
**Input:** nums = [14,70,53,83,49,91,36,80,92,51,66,70]
**Output:** 127
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 2 * 10^5`
	
- `0 <= nums[i] <= 2^31 - 1`

---

## Problem Understanding

- Find the maximum XOR `nums[i] ^ nums[j]` of any two numbers in `nums`.

---

## Approach

### Optimized Approach (31-Bit Binary Trie Greedy Search)
1. Store each 31-bit integer MSB-first (`i = 30..0`) in a binary `Trie`.
2. For each `x`, insert `x` into `trie` and query `trie.search(x)` greedily choosing the opposite bit `v ^ 1` whenever available to maximize XOR bit by bit.

---

## Complexity Analysis

- **Time Complexity:** $O(n \cdot B)$ where $B = 31$.\n- **Space Complexity:** $O(n \cdot B)$ for Trie nodes.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [421maximum-xor-of-two-numbers-in-an-array.java](./421maximum-xor-of-two-numbers-in-an-array.java) |

---

## Key Learnings

- A MSB-first binary Trie finds the optimal XOR partner in $O(31)$ per number by always branching toward the complementary bit.
