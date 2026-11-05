---
comments: true
difficulty: Medium
tags:
  - String
  - Greedy
  - Heap (Priority Queue)
---

# 1405. Longest Happy String

**[View Problem on LeetCode](https://leetcode.com/problems/longest-happy-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1405` (`1405`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Greedy`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

A string is called happy if it does not contain `'aaa'`, `'bbb'`, or `'ccc'` as a substring (that is, no character appears three times consecutively), and it contains only the characters `'a'`, `'b'`, and `'c'`.

Given three integers `a`, `b`, and `c`, return the longest possible happy string that can be constructed using at most `a` occurrences of `'a'`, `b` occurrences of `'b'`, and `c` occurrences of `'c'`. If multiple longest happy strings exist, any of them may be returned.

---

## Examples

### Example 1

```text
Input: a = 1, b = 1, c = 7
Output: "ccaccbcc"
Explanation: "ccbccacc" would also be a correct answer.
```

### Example 2

```text
Input: a = 7, b = 1, c = 0
Output: "aabaa"
Explanation: It is the only correct answer in this case.
```

---

## Constraints

- `0 <= a, b, c <= 100`

- `a + b + c > 0`

---

## Problem Understanding

Key observations:
- We are constrained by character quotas `a`, `b`, and `c`.
- Invariant: We can never append character `X` if the string already ends with `XX`.
- Greedy property: To make the string as long as possible, we should always greedily consume the character with the largest remaining count. If placing that character would create a streak of three, we must temporarily place the character with the second largest count to break the streak.
- If the most frequent character is blocked and no second character is available, no further characters can be placed, and the process terminates.

---

## Approach

### Brute Force Approach

A brute-force backtracking approach would recursively explore all valid character choices at each position while pruning any paths that create three consecutive identical letters. With `a + b + c <= 300`, the search space has up to `3^{300}` states, leading to exponential time complexity `O(3^{a+b+c})` and inevitable timeout.

### Optimized Approach

Use a greedy simulation powered by a max-heap (`PriorityQueue`). Store non-zero character counts as pairs `[char, count]`. In each step, poll the character with the largest remaining count. If the string already ends with two instances of this character, poll the second most frequent character, append it, decrement its count, and put both characters back into the heap. If no second character exists, break. Otherwise, append the top character directly.

### Step-by-Step Thinking Process

1. Recognize that consuming the character with the highest remaining frequency as early as possible minimizes the risk of having leftover characters that cannot be placed later.
2. Check the streak constraint: before appending character `cur`, check if the last two characters in the `StringBuilder` are identical to `cur`.
3. Handle streak conflict: if `cur` is blocked, pull the next most frequent character from the priority queue as a separator. If no other character exists in the heap, terminate the loop.
4. Update remaining counts: after appending, decrement the count and re-offer the entry to the priority queue if count remains greater than 0.
5. Convert the resulting `StringBuilder` to string.

### Algorithm / Intuition

The method `longestDiverseString` initializes a max-heap `pq` ordered by frequency `y[1] - x[1]` containing entries `['a', a]`, `['b', b]`, `['c', c]` for positive counts. A `StringBuilder sb` is constructed iteratively:
- Poll `int[] cur = pq.poll()`.
- If `sb.length() >= 2` and the last two code points match `cur[0]`, we cannot append `cur[0]`. If `pq.isEmpty()`, we terminate (`break`). Otherwise, poll `next`, append `(char) next[0]`, decrement `next[1]`, re-offer `next` if `next[1] > 1`, and re-offer `cur`.
- If there is no violation, append `(char) cur[0]`, decrement `cur[1]`, and re-offer `cur` if `cur[1] > 1`.
Finally, `sb.toString()` is returned.

---

## Dry Run

Walkthrough on Example 1: `a = 1, b = 1, c = 7`.
- Heap initial state: `[['c', 7], ['a', 1], ['b', 1]]`.
- Step 1: Poll `['c', 7]`. Append `'c'`. Re-offer `['c', 6]`. `sb = "c"`.
- Step 2: Poll `['c', 6]`. Append `'c'`. Re-offer `['c', 5]`. `sb = "cc"`.
- Step 3: Poll `['c', 5]`. Blocked because `sb` ends with `"cc"`. Poll `next = ['a', 1]`. Append `'a'`. `next[1]` becomes 0. Re-offer `['c', 5]`. `sb = "cca"`.
- Step 4: Poll `['c', 5]`. Append `'c'`. Re-offer `['c', 4]`. `sb = "ccac"`.
- Step 5: Poll `['c', 4]`. Append `'c'`. Re-offer `['c', 3]`. `sb = "ccacc"`.
- Step 6: Poll `['c', 3]`. Blocked by `"cc"`. Poll `next = ['b', 1]`. Append `'b'`. `next[1]` becomes 0. Re-offer `['c', 3]`. `sb = "ccaccb"`.
- Step 7: Poll `['c', 3]`. Append `'c'`. Re-offer `['c', 2]`. `sb = "ccaccbc"`.
- Step 8: Poll `['c', 2]`. Append `'c'`. Re-offer `['c', 1]`. `sb = "ccaccbcc"`.
- Step 9: Poll `['c', 1]`. Blocked by `"cc"`. Heap is now empty (`pq.size() == 0`). Break.
- Result: `"ccaccbcc"`.

---

## Complexity Analysis

- **Time Complexity:** `O(a + b + c)` — Each iteration appends exactly one character to the string builder. The priority queue holds at most 3 elements, so each heap operation takes `O(log 3) = O(1)` time.
- **Space Complexity:** `O(1)` auxiliary space — The priority queue stores at most 3 entries, requiring constant extra memory beyond the returned string.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1405longest-happy-string.java](./1405longest-happy-string.java) |

---

## Key Learnings

- Greedy selection via a max-heap ensures dominant characters are prioritized while maintaining diversity.
- Temporarily extracting the second-best element from a priority queue is a standard pattern for constraint resolution.
- Limiting heap capacity to a small constant alphabet size yields `O(1)` heap operations.
