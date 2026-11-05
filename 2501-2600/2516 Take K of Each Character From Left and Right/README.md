---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Sliding Window
---

# 2516. Take K of Each Character From Left and Right

**[View Problem on LeetCode](https://leetcode.com/problems/take-k-of-each-character-from-left-and-right/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2516` (`2516`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

You are given a string `s` consisting of the characters `'a'`, `'b'`, and `'c'`, and a non-negative integer `k`.

Each minute, you may take either the leftmost character or the rightmost character of `s`.

Return the **minimum number of minutes** needed to take at least `k` of each character ('a', 'b', and 'c'), or return `-1` if it is impossible to take at least `k` of each character.

---

## Examples

### Example 1

```text
Input: s = "aabaaaacaabc", k = 2
Output: 8
Explanation:
Take three characters from the left of s. You now have two 'a' characters, and one 'b' character.
Take five characters from the right of s. You now have four 'a' characters, two 'b' characters, and two 'c' characters.
A total of 3 + 5 = 8 minutes is needed.
It can be proven that 8 is the minimum number of minutes needed.
```

### Example 2

```text
Input: s = "a", k = 1
Output: -1
Explanation: It is not possible to take one 'b' or 'c' so return -1.
```

---

## Constraints

- `1 <= s.length <= 10^5`

- `s` consists of only the letters `'a'`, `'b'`, and `'c'`.

- `0 <= k <= s.length`

---

## Problem Understanding

Taking characters from either the left or the right end means that after taking some characters, we leave behind a contiguous substring in the middle of `s`.

Complementary window formulation:
- Minimizing the characters taken from the two ends is equivalent to **maximizing** the length of the contiguous substring kept in the middle.
- The only restriction is that the characters remaining outside this middle window must contain at least `k` of each character `'a'`, `'b'`, and `'c'`.
- First, verify feasibility: count total occurrences of 'a', 'b', 'c' in `s`. If any total count $< k$, it is impossible, return `-1`.
- If $k = 0$, 0 minutes are needed.
- Use a sliding window $[j, i]$ representing the middle substring being kept. As $i$ expands to the right, we subtract characters from our outside supply. If any character drops below $k$, we advance the left pointer $j$ to shrink the window until the supply is restored. The answer is $n - \max(\text{window length})$.

---

## Approach

### Brute Force Approach

A brute force approach tests all combinations of taking $L$ characters from the left and $R$ characters from the right, where $L + R \le n$. There are $O(n^2)$ pairs $(L, R)$. Evaluating character counts for each pair takes $O(n^2)$ time. With $n = 10^5$, $n^2 = 10^{10}$, which will exceed time limits.

### Optimized Approach

Count total frequencies in `cnt` array of size 3. If any frequency $< k$, return `-1`.
Use a sliding window with two pointers $i$ and $j$ to find the longest middle substring that leaves at least $k$ of each character outside:
- Decrement `cnt[s.charAt(i) - 'a']`.
- While `cnt[c] < k`, increment `cnt[s.charAt(j++) - 'a']` to shrink the window.
- Update `mx = Math.max(mx, i - j + 1)`.
Return $n - mx$.

### Step-by-Step Thinking Process

1. Reframe the problem: taking characters from both ends leaves a contiguous subarray in the middle.
2. Minimizing total characters taken $\iff$ Maximizing the length of the middle subarray.
3. Count the total frequency of 'a', 'b', 'c' in `s`. If any count is strictly less than $k$, return `-1` immediately.
4. Initialize sliding window pointers $i = 0$ and $j = 0$, and `mx = 0` (max window length).
5. Expand $i$ from 0 to $n - 1$: decrement the count of `s[i]` because it is placed inside the kept middle window (and thus removed from the taken ends).
6. If `cnt[s[i]] < k`, the characters outside are insufficient, so increment $j$ and restore `cnt[s[j]]` until `cnt[s[i]] >= k`.
7. Record `mx = Math.max(mx, i - j + 1)`.
8. The minimum taken characters is $n - mx$.

### Algorithm / Intuition

In the provided Java solution:

1. `cnt` of size 3 counts all characters in `s`. If any `cnt[x] < k`, return `-1`.
2. The variable `mx` tracks the length of the largest middle subarray that can be discarded without violating the requirement of having at least $k$ of each letter outside.
3. Loop $i$ from $0$ to $n - 1$:
   - Decrement `cnt[c]` for the character entering the middle window.
   - If `cnt[c] < k`, the outside no longer has enough of character `c`, so the while loop increments `cnt[s.charAt(j++) - 'a']`, ejecting elements from the middle window from the left until the outside count is restored to at least $k$.
   - Update `mx = Math.max(mx, i - j + 1)`.
4. Returning `n - mx` yields the minimal characters taken from both ends.

---

## Dry Run

Consider Example 1: `s = "aabaaaacaabc"`, `k = 2`

1. Total counts in `s`: `'a': 8`, `'b': 2`, `'c': 2`. All $\ge 2$, so valid.
2. Sliding window $[j, i]$ tries to maximize kept middle:
   - As window expands, it cannot take too many 'b's or 'c's because only 2 exist outside total.
   - Middle window can keep at most 0 'b's and 0 'c's (since outside needs both of them).
   - Middle window can keep up to $8 - 2 = 6$ 'a's.
   - The contiguous stretch of `'a'`s from index 3 to 6 has length 4: `"aaaa"`.
   - Maximum valid middle window length `mx = 4`.
3. Result: $n - mx = 12 - 4 = 8$ minutes.

Final Return: `8`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — The initial frequency scan takes $O(n)$ time. The two-pointer sliding window traverses each index $i$ and $j$ at most once, yielding strictly linear $O(n)$ execution.
- **Space Complexity:** `O(1)` — A fixed-size array `cnt` of size 3 is used, requiring constant auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2516take-k-of-each-character-from-left-and-right.java](./2516take-k-of-each-character-from-left-and-right.java) |

---

## Key Learnings

- Inverting prefix-suffix problems into equivalent sliding window problems on the middle subarray is a vital DSA technique.
- Treating elements inside the sliding window as 'excluded from outside' enables standard monotonic two-pointer contraction.
- Early infeasibility checks prevent needless window computations.
