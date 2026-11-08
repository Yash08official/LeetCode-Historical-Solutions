---
comments: true
difficulty: Medium
tags:
  - Two Pointers
  - String
  - Enumeration
---

# 3403. Find the Lexicographically Largest String From the Box I

**[View Problem on LeetCode](https://leetcode.com/problems/find-the-lexicographically-largest-string-from-the-box-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3403` |
| **Difficulty** | Medium |
| **Topics / Tags** | `Two Pointers`, `String`, `Enumeration` |
| **Solution Language** | Java |

---

## Problem Description

You are given a string `word`, and an integer `numFriends`.

Alice is organizing a game for her `numFriends` friends. There are multiple rounds in the game, where in each round:

- `word` is split into `numFriends` **non-empty** strings, such that no previous round has had the exact same split.
- All the split words are put into a box.

Find the **lexicographically largest** string from the box after all the rounds are finished.

---

## Examples

### Example 1

```text
Input: word = "dbca", numFriends = 2
Output: "dbc"
Explanation: All possible splits are:
- "d" and "bca"
- "db" and "ca"
- "dbc" and "a"
The lexicographically largest string is "dbc".
```

### Example 2

```text
Input: word = "gggg", numFriends = 4
Output: "g"
Explanation: The only possible split is "g", "g", "g", and "g".
```

---

## Constraints

- `1 <= word.length <= 5000`
- `1 <= numFriends <= word.length`
- `word` consists only of lowercase English letters.

---

## Problem Understanding

- When splitting `word` into `numFriends` non-empty parts, every other $numFriends - 1$ friends must receive at least 1 character.
- Therefore, the maximum length any single piece can have is $n - (numFriends - 1)$.
- Any substring starting at index $i$ can extend up to length $n - (numFriends - 1)$ (or to the end of the string).
- Special case: if $numFriends == 1$, the entire string is returned.

---

## Approach

### Optimized Approach (Prefix Length Bound Enumeration)

1. If `numFriends == 1`, return `word`.
2. Compute maximum allowable substring length: $maxLen = n - (numFriends - 1)$.
3. Initialize `ans = ""`.
4. Iterate each starting index $i$ from $0$ to $n - 1$:
   - Extract substring `t = word.substring(i, Math.min(n, i + maxLen))`.
   - Update `ans = max(ans, t)` lexicographically using `compareTo`.
5. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \cdot L)$ — Where $n$ is string length and $L \le n$ is maximum substring length. String slicing and comparison take at most $O(L)$ per starting index.
- **Space Complexity:** $O(L)$ — Auxiliary storage for substring comparisons.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3403find-the-lexicographically-largest-string-from-the-box-i.java](./3403find-the-lexicographically-largest-string-from-the-box-i.java) |

---

## Key Learnings

- Deriving the exact maximum substring length $n - numFriends + 1$ bounds the search space effectively.
- Standard lexicographical comparison (`compareTo`) handles prefix relationships correctly.
