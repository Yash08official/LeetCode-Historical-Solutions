---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
  - Sorting
---

# 3041. Maximize Consecutive Elements in an Array After Modification

**[View Problem on LeetCode](https://leetcode.com/problems/maximize-consecutive-elements-in-an-array-after-modification/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3041` (`3041`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

You are given a **0-indexed** array `nums` consisting of **positive** integers.

Initially, you can increase the value of **any** element in the array by **at most** `1`.

After that, you need to select **one or more** elements from the final array such that those elements are **consecutive** when sorted in increasing order. For example, the elements `[3, 4, 5]` are consecutive while `[3, 4, 6]` and `[1, 1, 2, 3]` are not.

Return *the **maximum** number of elements that you can select*.

---

## Examples

### Example 1

```text
**Input:** nums = [2,1,5,1,1]
**Output:** 3
**Explanation:** We can increase the elements at indices 0 and 3. The resulting array is nums = [3,1,5,2,1].
We select the elements [**3**,**1**,5,**2**,1] and we sort them to obtain [1,2,3], which are consecutive.
It can be shown that we cannot select more than 3 consecutive elements.
```

### Example 2

```text
**Input:** nums = [1,4,7,10]
**Output:** 1
**Explanation:** The maximum consecutive elements that we can select is 1.
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 10^5`
	
- `1 <= nums[i] <= 10^6`

---

## Problem Understanding

- Each element in `nums` can be increased by at most `1`. Find the maximum number of elements you can select so that after sorting they form a consecutive sequence.

---

## Approach

### Optimized Approach (Sorting + State-Machine DP)
1. Sort `nums` in ascending order.
2. Track `f0` (longest consecutive sequence ending at `prev` unchanged) and `f1` (longest consecutive sequence ending at `prev + 1` incremented).
3. For each `x` in `nums`:
   - `x == prev`: keeping `x` doesn't extend `f0`, but incrementing `x` to `prev + 1` extends `f0`: `f1 = f0 + 1`.
   - `x == prev + 1`: both `f0` and `f1` extend by `1` (`++f0; ++f1;`).
   - `x == prev + 2`: `x` unchanged connects to `prev + 1` (`f0 = f1 + 1`), while `x + 1` starts fresh (`f1 = 1`).
   - Otherwise: reset `f0 = 1; f1 = 1;`.
4. Update `ans = Math.max(ans, Math.max(f0, f1))` and `prev = x`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log n)$ — Dominated by sorting `nums`.\n- **Space Complexity:** $O(\log n)$ — Sorting stack space; $O(1)$ DP state.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3041maximize-consecutive-elements-in-an-array-after-modification.java](./3041maximize-consecutive-elements-in-an-array-after-modification.java) |

---

## Key Learnings

- Tracking just two rolling DP states (`f0` for unchanged and `f1` for +1) over a sorted array eliminates hash-map DP overhead and runs in $O(1)$ extra space.
