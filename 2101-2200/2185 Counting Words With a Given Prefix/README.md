---
comments: true
difficulty: Easy
tags:
  - Array
  - String
  - String Matching
---

# 2185. Counting Words With a Given Prefix

**[View Problem on LeetCode](https://leetcode.com/problems/counting-words-with-a-given-prefix/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2185` (`2185`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `String`, `String Matching` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array of lowercase English strings `words` and a lowercase English string `pref`.

A **prefix** of a string is any contiguous substring starting at index `0`. Return the total number of strings in `words` that start with `pref`.

---

## Examples

### Example 1

```text
Input: words = ["pay","attention","practice","attend"], pref = "at"
Output: 2
Explanation: The 2 strings that contain "at" as a prefix are: "attention" and "attend".
```

### Example 2

```text
Input: words = ["leetcode","win","loops","success"], pref = "code"
Output: 0
Explanation: There are no strings that contain "code" as a prefix.
```

---

## Constraints

- `1 <= words.length <= 100`

- `1 <= words[i].length, pref.length <= 100`

- `words[i]` and `pref` consist of lowercase English letters.

---

## Problem Understanding

- **Prefix Definition:** A word `w` has `pref` as a prefix if and only if `w.length() >= pref.length()` and the first `pref.length()` characters of `w` match `pref` character-for-character.
- **Independent Checks:** Whether `words[i]` starts with `pref` is completely independent of every other word in `words`, and duplicates in `words` (if any) are each counted individually.
- **Small Input Size:** Both `words.length` and string lengths are at most `100`, making a direct linear scan optimal and idiomatic.

---

## Approach

### Brute Force Approach

Manually extracting a substring `w.substring(0, pref.length())` (after checking `w.length() >= pref.length()`) and comparing with `.equals(pref)` allocates a new `String` copy in older Java versions or performs extra slicing boilerplate, whereas checking characters in-place avoids any substring allocation.

### Optimized Approach

Iterate through every string `w` in `words` and increment a counter `ans` whenever Java's built-in `w.startsWith(pref)` returns `true`.

### Step-by-Step Thinking Process

1. Initialize a match counter `ans = 0`.
2. Loop over each string `w` in `words`.
3. Use `w.startsWith(pref)`, which first checks `w.length() >= pref.length()` in `O(1)` time and then compares characters only up to the first mismatch or `pref.length()`.
4. Increment `ans` on each match and return `ans`.

### Algorithm / Intuition

`String.startsWith(pref)` performs a direct zero-allocation region check at offset `0`:
- If `w` is shorter than `pref`, it immediately returns `false` in `O(1)` time.
- Otherwise, it compares `w` and `pref` byte-by-byte from index `0` to `pref.length() - 1`, short-circuiting as soon as any character differs.

Accumulating `++ans` across the enhanced `for` loop yields clean, readable `O(n * m)` code with `O(1)` memory.

---

## Dry Run

Trace on **Example 1**: `words = ["pay", "attention", "practice", "attend"]`, `pref = "at"`.

| Word `w` | `w.startsWith("at")` | `ans` |
| :--- | :--- | :--- |
| `"pay"` | `false` (`'p' != 'a'`) | `0` |
| `"attention"` | `true` (starts with `"at"`) | `1` |
| `"practice"` | `false` (`'p' != 'a'`) | `1` |
| `"attend"` | `true` (starts with `"at"`) | `2` |

Final result: `ans = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n * m)` — Where `n = words.length` and `m = pref.length`, we check `n` words and inspect at most `m` characters per word.
- **Space Complexity:** `O(1)` — Only a single integer counter `ans` is used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2185counting-words-with-a-given-prefix.java](./2185counting-words-with-a-given-prefix.java) |

---

## Key Learnings

- Prefer `String.startsWith(pref)` over `substring` + `equals` to avoid bounds-check bugs when `w.length() < pref.length()` and eliminate temporary object creation.
- If millions of prefix queries were asked against a static dictionary `words`, preprocessing `words` into a **Trie** (prefix tree) with subtree word counts would answer each query in `O(pref.length())` time independent of `words.length`.
