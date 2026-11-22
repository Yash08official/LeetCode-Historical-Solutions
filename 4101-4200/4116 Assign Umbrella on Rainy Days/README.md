---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 4116. Assign Umbrella on Rainy Days

**[View Problem on LeetCode](https://leetcode.com/problems/assign-umbrella-on-rainy-days/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `4116` (`4116`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | Java |

---

## Problem Description

You are given a **binary array** `rain` of length `n`, where `rain[i] == 1` means it rains on day `i`, and `rain[i] == 0` means it does not.

Alice and Bob share a **single umbrella** over these `n` days. On each day `i`:

	
- Alice needs the umbrella on day `i` if `rain[i] == rain[i + 1] == 1` for `0 <= i < n - 1`.
	
- Bob needs the umbrella if `rain[i] == 1`.
	
- **At most one** of them can receive the umbrella.
	
- If only one person needs it, that person receives it.
	
- If **both** need it, it goes to whoever has received it **fewer** times so far. If they are **tied**, it goes to Alice.
	
- If neither needs it, no one receives it.

A person's count **increases** only on a day they receive the umbrella. Initially, both counts are 0.

Return a string array `answer` of length `n`, where `answer[i]` is `"Alice"`, `"Bob"`, or `"None"`, denoting who receives the umbrella on day `i`.

A **binary array** is an array that contains only 0 and 1.

---

## Examples

### Example 1

**Input:** rain = [1,1,0,1,1]

**Output:** ["Alice","Bob","None","Alice","Bob"]

**Explanation:**

	
- Day 0: `rain[0] == 1` and `rain[1] == 1`, so both need it. Counts are tied, so Alice receives it.
	
- Day 1: `rain[1] == 1`, so Bob needs it, but `rain[2] == 0`, so Alice does not need it. Therefore Bob receives it.
	
- Day 2: No rain, so no one receives it.
	
- Day 3: `rain[3] == 1` and `rain[4] == 1`, so both need it. Counts are tied at 1, so Alice receives it.
	
- Day 4: Last day, so only Bob needs it, and he receives it.
	
- Therefore, `answer = ["Alice", "Bob", "None", "Alice", "Bob"]`.

### Example 2

**Input:** rain = [0,1,0,1]

**Output:** ["None","Bob","None","Bob"]

**Explanation:**

	
- It never rains on two consecutive days, so Alice never needs the umbrella.
	
- Bob receives it on days 1 and 3, and no one receives it on days 0 and 2.
	
- Therefore, `answer = ["None", "Bob", "None", "Bob"]`.

 

**

---

## Constraints

**

	
- `1 <= n == rain.length <= 100`
	
- `rain[i]` is either 0 or 1.

---

## Problem Understanding

- For each day `i`, evaluate eligibility for Alice (`i < n - 1 && rain[i] == 1 && rain[i + 1] == 1`) and Bob (`rain[i] == 1`), assigning the umbrella to the eligible person with fewer prior assignments (tie-breaking in favor of Alice), or `"None"` if neither is eligible.

---

## Approach

### Optimized Approach (Single-Pass Greedy Simulation)
1. Maintain running assignment counts `alice = 0` and `bob = 0`.
2. For each day `i`:
   - Check `a` (Alice eligible) and `b` (Bob eligible).
   - If both are eligible, assign to `"Alice"` when `alice <= bob`, else `"Bob"`.
   - If only one is eligible, assign to that person; otherwise assign `"None"`.
   - Increment the assigned person's counter.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Single linear scan over `rain`.\n- **Space Complexity:** $O(1)$ auxiliary (excluding output array `ans`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [4116assign-umbrella-on-rainy-days.java](./4116assign-umbrella-on-rainy-days.java) |

---

## Key Learnings

- Direct simulation of eligibility predicates and tie-breaking counters handles stateful daily assignments cleanly in $O(n)$.
