---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Union-Find
---

# 128. Longest Consecutive Sequence

**[View Problem on LeetCode](https://leetcode.com/problems/longest-consecutive-sequence/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0128` (`128`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Union-Find` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an unsorted array of integers `nums`, return *the length of the longest consecutive elements sequence.*

You must write an algorithm that runs in `O(n)` time.

---

## Examples

### Example 1

```text
**Input:** nums = [100,4,200,1,3,2]
**Output:** 4
**Explanation:** The longest consecutive elements sequence is `[1, 2, 3, 4]`. Therefore its length is 4.
```

### Example 2

```text
**Input:** nums = [0,3,7,2,5,8,4,6,0,1]
**Output:** 9
```

### Example 3

```text
**Input:** nums = [1,0,1,2]
**Output:** 3
```

 

**

---

## Constraints

**

	
- `0 <= nums.length <= 10^5`
	
- `-10^9 <= nums[i] <= 10^9`

---

## Problem Understanding

- Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.
- Target linear time complexity $O(n)$.

---

## Approach

### Optimized Approach (Hash Set & Dynamic Map Memoization)

1. Store all array numbers in a Hash Set `s`.
2. Iterate through `nums`:
   - While the consecutive successor `y` is present in set `s`, delete it from `s` to guarantee each number is visited and expanded at most once across the entire algorithm.
   - Store the length of consecutive sequence starting at `x` in map `d`.
   - Update global maximum `ans = Math.max(ans, d.get(x))`.
3. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Each number is inserted into the set and deleted at most once.
- **Space Complexity:** $O(n)$ — Hash set and hash map storage.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [128longest-consecutive-sequence.js](./128longest-consecutive-sequence.js) |

---

## Key Learnings

- Removing elements from the Set during sequence expansion prevents re-scanning overlapping components, guaranteeing overall linear runtime.
