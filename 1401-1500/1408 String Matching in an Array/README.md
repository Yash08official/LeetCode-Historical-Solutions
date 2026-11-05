---
comments: true
difficulty: Easy
tags:
  - Array
  - String
  - String Matching
---

# 1408. String Matching in an Array

**[View Problem on LeetCode](https://leetcode.com/problems/string-matching-in-an-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1408` (`1408`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `String`, `String Matching` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of string `words`, return all strings in `words` that are a substring of another word in the array. You can return the answer in any order.

A substring is a contiguous sequence of characters within a string. All strings in `words` are guaranteed to be unique.

---

## Examples

### Example 1

```text
Input: words = ["mass","as","hero","superhero"]
Output: ["as","hero"]
Explanation: "as" is substring of "mass" and "hero" is substring of "superhero".
["hero","as"] is also a valid answer.
```

### Example 2

```text
Input: words = ["leetcode","et","code"]
Output: ["et","code"]
Explanation: "et", "code" are substring of "leetcode".
```

### Example 3

```text
Input: words = ["blue","green","bu"]
Output: []
Explanation: No string of words is substring of another string.
```

---

## Constraints

- `1 <= words.length <= 100`

- `1 <= words[i].length <= 30`

- `words[i]` contains only lowercase English letters.

- All the strings of `words` are **unique**.

---

## Problem Understanding

Key observations:
- A word `words[i]` should be included in the answer if there exists another index `j != i` such that `words[j]` contains `words[i]`.
- Each matching word should appear in the output list at most once.
- Constraints are very small: `words.length <= 100` and each word has length at most 30 characters.

---

## Approach

### Brute Force Approach

Compare every word against every other word using two nested loops `O(n^2)`. For each pair `(i, j)` where `i != j`, check if `words[j].contains(words[i])`. Because `n <= 100`, there are at most 10,000 comparisons, making brute force both optimal in simplicity and well within time limits.

### Optimized Approach

Direct pairwise check using nested loops. For each index `i` from `0` to `n - 1`, iterate `j` from `0` to `n - 1`. If `i != j` and `words[j].contains(words[i])`, add `words[i]` to `ans` and immediately `break` out of the inner loop to avoid duplicate entries.

### Step-by-Step Thinking Process

1. Analyze constraints: `n <= 100` and word lengths `L <= 30`. An `O(n^2 * L^2)` pairwise search requires fewer than `10^7` operations.
2. Iterate through each candidate substring word `words[i]`.
3. Iterate through every potential superstring word `words[j]` where `j != i`.
4. If `words[j].contains(words[i])` is true, add `words[i]` to the result list `ans`.
5. Use `break` to avoid adding the same word multiple times when it is a substring of more than one word.

### Algorithm / Intuition

The solution implements `stringMatching(String[] words)`:
- Initializes `List<String> ans = new ArrayList<>()`.
- Outer loop `i` iterates over every word.
- Inner loop `j` checks if `i != j` and `words[j].contains(words[i])`.
- On finding the first valid `j`, `words[i]` is added to `ans` and the inner loop terminates with `break`.
- Returns `ans`.

---

## Dry Run

Walkthrough on Example 1: `words = ["mass", "as", "hero", "superhero"]`.
- `i = 0, words[0] = "mass"`:
  - `j = 1 ("as")`: `"as".contains("mass")` is `false`.
  - `j = 2 ("hero")`: `"hero".contains("mass")` is `false`.
  - `j = 3 ("superhero")`: `"superhero".contains("mass")` is `false`.
- `i = 1, words[1] = "as"`:
  - `j = 0 ("mass")`: `"mass".contains("as")` is `true`.
  - Add `"as"` to `ans`. `break`.
- `i = 2, words[2] = "hero"`:
  - `j = 0 ("mass")`: `false`.
  - `j = 1 ("as")`: `false`.
  - `j = 3 ("superhero")`: `"superhero".contains("hero")` is `true`.
  - Add `"hero"` to `ans`. `break`.
- `i = 3, words[3] = "superhero"`:
  - Checked against all words, none contain `"superhero"`.
- Final result: `["as", "hero"]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2 * L^2)` — There are `O(n^2)` pairs of strings, and checking `String.contains()` takes `O(L^2)` in the worst case (where `L <= 30` is maximum string length). Total operations are well under `10^7`.
- **Space Complexity:** `O(1)` auxiliary space — Aside from the output list `ans`, no additional data structures are allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1408string-matching-in-an-array.java](./1408string-matching-in-an-array.java) |

---

## Key Learnings

- For small input boundaries (`n <= 100`), a clean `O(n^2)` pairwise scan is both fastest to implement and computationally lightweight.
- Breaking immediately upon the first match prevents duplicate entries without the overhead of a HashSet.
