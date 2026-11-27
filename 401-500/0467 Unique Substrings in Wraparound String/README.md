---
comments: true
difficulty: Medium
tags:
  - String
  - Dynamic Programming
---

# 467. Unique Substrings in Wraparound String

**[View Problem on LeetCode](https://leetcode.com/problems/unique-substrings-in-wraparound-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0467` (`467`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

We define the string `base` to be the infinite wraparound string of `"abcdefghijklmnopqrstuvwxyz"`, so `base` will look like this:

	- `"...zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd...."`.

Given a string `s`, return *the number of **unique non-empty substrings** of *`s`* are present in *`base`.

---

## Examples

### Example 1

```
Input: s = "a"
Output: 1
Explanation: Only the substring "a" of s is in base.
```

### Example 2

```
Input: s = "cac"
Output: 2
Explanation: There are two substrings ("a", "c") of s in base.
```

### Example 3

```
Input: s = "zab"
Output: 6
Explanation: There are six substrings ("z", "a", "b", "za", "ab", and "zab") of s in base.
```

 

**

---

## Constraints

**

	- `1 <= s.length <= 10^5`

	- `s` consists of lowercase English letters.

---

## Problem Understanding

- Count the number of distinct non-empty substrings of `s` that appear in the infinite wraparound string `"...zabcdefghijklmnopqrstuvwxyz..."`.

---

## Approach

### Optimized Approach (26-Slot Max-Length Dynamic Programming)
1. Any valid wraparound substring is uniquely identified by its **ending character** `c` and its **length** `L`.
2. Maintain `f[26]`, where `f[c]` records the longest valid contiguous wraparound run ending at character `c`.
3. Scan `s` once, maintaining the current consecutive wraparound run length `k`: increment `k` whenever `(s[i] - s[i - 1] + 26) % 26 == 1`, else reset `k = 1`, and update `f[s[i] - 'a'] = Math.max(f[s[i] - 'a'], k)`.
4. Every length `1..f[c]` ending at `c` is a unique valid substring, so the total count is simply `sum(f)`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — single pass over `s`.
- **Space Complexity:** $O(1)$ — fixed 26-element DP array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [467unique-substrings-in-wraparound-string.java](./467unique-substrings-in-wraparound-string.java) |

---

## Key Learnings

- Deduplicating substrings by grouping them by their ending character reduces an exponential substring-set problem to a 26-integer DP array.
