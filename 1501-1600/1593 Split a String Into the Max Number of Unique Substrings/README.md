---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Backtracking
---

# 1593. Split a String Into the Max Number of Unique Substrings

**[View Problem on LeetCode](https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1593` (`1593`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Backtracking` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s`, we must partition `s` into the maximum possible number of non-empty substrings such that all resulting substrings are mutually unique.

The concatenation of all partitioned substrings in order must equal the original string `s`. We need to return the maximum count of such unique substrings that can be formed.

---

## Examples

### Example 1

```text
Input: s = "ababccc"
Output: 5
Explanation: One way to split maximally is ['a', 'b', 'ab', 'c', 'cc']. Splitting like ['a', 'b', 'a', 'b', 'c', 'cc'] is not valid as you have 'a' and 'b' multiple times.
```

### Example 2

```text
Input: s = "aba"
Output: 2
Explanation: One way to split maximally is ['a', 'ba'].
```

### Example 3

```text
Input: s = "aa"
Output: 1
Explanation: It is impossible to split the string any further.
```

---

## Constraints

- `1 <= s.length <= 16`

- `s` contains only lower case English letters.

---

## Problem Understanding

We are searching for a partition $s = s_1 + s_2 + \dots + s_k$ such that $s_i \ne s_j$ for all $i \ne j$.
Constraints state that `s.length` is between 1 and 16, which is small.
The small length constraint strongly hints that an exponential backtracking search over partition split points is feasible and expected.

---

## Approach

### Brute Force Approach

For a string of length $n$, there are $n - 1$ potential split positions between characters, creating $2^{n-1}$ possible ways to partition the string. A brute-force generator creates every partition, adds the substrings into a set to verify if all are unique, and records the maximum size. For $n = 16$, $2^{15} = 32,768$ partitions are evaluated.

### Optimized Approach

Use depth-first backtracking with a `HashSet<String>` to track the substrings chosen so far. At each recursive step `index`, try every candidate prefix `s.substring(index, i + 1)`. If the candidate substring is not in the set, add it, recurse to `i + 1`, and then backtrack by removing the substring from the set. When `index == n`, update `maxCount = Math.max(maxCount, set.size())`.

### Step-by-Step Thinking Process

1. With $n \le 16$, exploring branch decisions via backtracking is well within standard execution limits ($2^{15}$ states).
2. Maintain a global counter `maxCount` and a `HashSet<String>` `set` of currently chosen unique substrings.
3. At start index `index`, iterate `i` from `index` to `n - 1` to define candidate substring `sub = s.substring(index, i + 1)`.
4. If `!set.contains(sub)`, add `sub` to `set` and recursively call `backtrack(s, set, i + 1)`.
5. Upon returning from recursion, backtrack by removing `sub` from `set` to restore state for other branching choices.
6. When `index == n`, we have partitioned the entire string; update `maxCount` with `set.size()`.

### Algorithm / Intuition

The solution in Java uses an explicit `HashSet<String>` and a recursive helper `backtrack(s, set, index)`. The recursion systematically explores every valid decision tree branch where no two substrings collide. Because duplicates are pruned immediately via `if (!set.contains(sub))`, invalid branches that would reuse an existing substring are cut off early. When the end of the string (`index == n`) is reached, `set.size()` represents the number of unique substrings in that valid partition, and `Math.max` updates the global record `maxCount`.

---

## Dry Run

Let's trace Example 1: `s = "ababccc"`, `n = 7`
- Start `index = 0`, `set = {}`.
- Candidate substrings tried:
  - `sub = "a"`: not in set -> `set = {"a"}`, recurse at `index = 1`.
  - `sub = "b"`: not in set -> `set = {"a", "b"}`, recurse at `index = 2`.
  - At index 2, `sub = "a"` is already in set! Skipped.
  - `sub = "ab"`: not in set -> `set = {"a", "b", "ab"}`, recurse at `index = 4`.
  - At index 4, `sub = "c"`: not in set -> `set = {"a", "b", "ab", "c"}`, recurse at `index = 5`.
  - At index 5, `sub = "c"` is in set! Skipped.
  - `sub = "cc"`: not in set -> `set = {"a", "b", "ab", "c", "cc"}`, recurse at `index = 7`.
- Base case reached: `index == 7 == n`. `maxCount = max(0, 5) = 5`.
- Backtracking explores other choices, but none exceed 5 unique substrings.
Result: 5.

---

## Complexity Analysis

- **Time Complexity:** `O(n * 2^n)` — In the worst case with all distinct characters, there are $2^{n-1}$ partitions. At each step, string slicing and hashing take $O(n)$ time.
- **Space Complexity:** `O(n)` — The recursion stack depth is at most `n`, and the `HashSet` holds at most `n` substrings of total length at most `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1593split-a-string-into-the-max-number-of-unique-substrings.java](./1593split-a-string-into-the-max-number-of-unique-substrings.java) |

---

## Key Learnings

- Constraints like $n \le 16$ are a classic hallmark for backtracking with set-based state tracking.
- Pruning branches immediately when a substring is already in the set keeps the practical state space very small.
- Always undo state changes (`set.remove(sub)`) after the recursive call to ensure correctness across siblings.
