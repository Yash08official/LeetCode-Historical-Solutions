---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - String
---

# 1813. Sentence Similarity III

**[View Problem on LeetCode](https://leetcode.com/problems/sentence-similarity-iii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1813` (`1813`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `String` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given two strings `sentence1` and `sentence2`, each consisting of space-separated words (with single spaces and no leading/trailing spaces).

Two sentences are **similar** if you can insert a single arbitrary sentence (possibly empty) into one of them — at the beginning, at the end, or cleanly between two adjacent words — so that both sentences become identical word-for-word.

Return `true` if `sentence1` and `sentence2` are similar, and `false` otherwise.

---

## Examples

### Example 1

**Input:** `sentence1 = "My name is Haley", sentence2 = "My Haley"`

**Output:** `true`

**Explanation:**

`sentence2` can be turned to `sentence1` by inserting "name is" between "My" and "Haley".

### Example 2

**Input:** `sentence1 = "of", sentence2 = "A lot of words"`

**Output:** `false`

**Explanation:**

No single sentence can be inserted inside one of the sentences to make it equal to the other.

### Example 3

**Input:** `sentence1 = "Eating right now", sentence2 = "Eating"`

**Output:** `true`

**Explanation:**

`sentence2` can be turned to `sentence1` by inserting "right now" at the end of the sentence.

---

## Constraints

- `1 <= sentence1.length, sentence2.length <= 100`

- `sentence1` and `sentence2` consist of lowercase and uppercase English letters and spaces.

- The words in `sentence1` and `sentence2` are separated by a single space.

---

## Problem Understanding

- **Word-Level Tokenization:** Insertions must respect word boundaries (`"Frog cool"` cannot become `"Frogs are cool"`), so we must compare whole **words**, not raw characters.
- **Prefix + Suffix Decomposition:** Suppose `words1` has length `m` and `words2` has length `n` with `m >= n`. Inserting one contiguous block of words into `words2` to form `words1` means `words2` must split into a prefix `words2[0 .. k - 1]` matching the start of `words1`, and a suffix `words2[k .. n - 1]` matching the end of `words1` (`0 <= k <= n`).
- **Two-Pointer Coverage:** If `i` words match from the front and `j` words match from the back, `words2` can be split into such a prefix and suffix if and only if `i + j >= n`.

---

## Approach

### Brute Force Approach

After splitting into word arrays of lengths `m >= n`, a brute-force approach tries all `n + 1` split positions `k` (`0 <= k <= n`) in `words2`, checking for each `k` whether `words2[0..k-1]` matches `words1[0..k-1]` and `words2[k..n-1]` matches `words1[m-(n-k)..m-1]`. Checking `n + 1` splits takes `O(n^2)` word comparisons.

### Optimized Approach

Split both sentences by `" "`, swap if needed so `words1` is at least as long as `words2` (`m >= n`), greedily count matching prefix words `i` and matching suffix words `j`, and return `i + j >= n`.

### Step-by-Step Thinking Process

1. Split `sentence1` and `sentence2` on `" "` into `words1` and `words2`.
2. Ensure `words1.length >= words2.length` by swapping references if `words1.length < words2.length`.
3. Advance `i` from `0` while `i < n` and `words1[i] === words2[i]` (longest common word prefix).
4. Advance `j` from `0` while `j < n` and `words1[m - 1 - j] === words2[n - 1 - j]` (longest common word suffix).
5. Check `i + j >= n`: if the matched prefix and suffix together cover all `n` words of the shorter sentence `words2`, then all unmatched middle words in `words1` form a single contiguous insertion!

### Algorithm / Intuition

Why is `i + j >= n` (rather than `== n`) exact even when `i + j` exceeds `n`? Suppose `words1 = ["A", "A", "A"]` (`m = 3`) and `words2 = ["A", "A"]` (`n = 2`). Here `i = 2` and `j = 2`, so `i + j = 4 >= 2`. Because `i >= 2` already means the prefix alone covers `words2` (we can simply take `k = n` prefix words and `0` suffix words, inserting `["A"]` at the end), any overlap between `i` and `j` just means there are *multiple* valid places to insert the extra word(s)!

---

## Dry Run

Using **Example 1**: `sentence1 = "My name is Haley"`, `sentence2 = "My Haley"`

1. **Tokenize:**
   - `words1 = ["My", "name", "is", "Haley"]` (`m = 4`)
   - `words2 = ["My", "Haley"]` (`n = 2`)
2. **Prefix Match (`i`):**
   - `i = 0`: `"My" === "My"` -> `i = 1`
   - `i = 1`: `"name" !== "Haley"` -> stop (`i = 1`)
3. **Suffix Match (`j`):**
   - `j = 0`: `words1[3]` (`"Haley"`) `=== words2[1]` (`"Haley"`) -> `j = 1`
   - `j = 1`: `words1[2]` (`"is"`) `!== words2[0]` (`"My"`) -> stop (`j = 1`)
4. **Coverage Check:** `i + j = 1 + 1 = 2 >= n (2)` -> returns `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(L_1 + L_2)` — Where `L_1` and `L_2` are the character lengths of `sentence1` and `sentence2`. Splitting and comparing words visits each character a constant number of times.
- **Space Complexity:** `O(L_1 + L_2)` — Storing the split word arrays `words1` and `words2` takes space proportional to total input characters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1813sentence-similarity-iii.js](./1813sentence-similarity-iii.js) |

---

## Key Learnings

- Normalizing inputs so `words1` is always the longer sequence (`m >= n`) eliminates half the conditional branches.
- Single-block insertion equivalence: `B` can become `A` via one contiguous insertion iff `B` is a concatenation of a prefix of `A` and a suffix of `A` (`lcp + lcs >= |B|`).
