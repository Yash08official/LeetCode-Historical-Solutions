---
comments: true
difficulty: Easy
tags:
  - Hash Table
  - String
  - Counting
---

# 884. Uncommon Words from Two Sentences

**[View Problem on LeetCode](https://leetcode.com/problems/uncommon-words-from-two-sentences/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0884` (`884`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Hash Table`, `String`, `Counting` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given two sentences `s1` and `s2`, each consisting of lowercase English words separated by single spaces (with no leading or trailing spaces).

A word is defined as **uncommon** if it appears **exactly once** in one of the sentences and **zero times** in the other sentence. Return an array of all uncommon words in any order.

---

## Examples

### Example 1

**Input:** `s1 = "this apple is sweet", s2 = "this apple is sour"`

**Output:** `["sweet","sour"]`

**Explanation:**

The word `"sweet"` appears only in `s1`, while the word `"sour"` appears only in `s2`.

### Example 2

**Input:** `s1 = "apple apple", s2 = "banana"`

**Output:** `["banana"]`

---

## Constraints

- `1 <= s1.length, s2.length <= 200`

- `s1` and `s2` consist of lowercase English letters and spaces.

- `s1` and `s2` do not have leading or trailing spaces.

- All the words in `s1` and `s2` are separated by a single space.

---

## Problem Understanding

- **Combined Frequency Equivalence:** Because word counts are non-negative integers, "appears `1` time in one sentence and `0` times in the other" is mathematically identical to "appears **exactly `1` time** across `s1` and `s2` combined" (`count(s1) + count(s2) == 1`).
- **Duplicate Within Same Sentence:** As shown in Example 2 (`s1 = "apple apple"`, `s2 = "banana"`), `"apple"` is **not** uncommon even though it is absent from `s2`, because it appears twice in `s1` (`2 + 0 = 2 != 1`).
- **Clean Input Format:** Single spaces and absence of leading/trailing spaces mean `.split(' ')` produces clean, non-empty word tokens directly.

---

## Approach

### Brute Force Approach

For every word in `s1`, scan all words in `s1` and `s2` to count occurrences, and repeat for every word in `s2`. If there are `W` words total, nested scans take `O(W^2)` string comparisons.

### Optimized Approach

Split both `s1` and `s2` by `' '`, count the total frequency of every word in a single `Map`, and return all words whose total count equals `1`.

### Step-by-Step Thinking Process

1. Simplify the two-sentence condition: since frequencies are `>= 0`, `freq1(w) + freq2(w) === 1` holds if and only if `(freq1(w), freq2(w))` is `(1, 0)` or `(0, 1)`.
2. Tokenize both strings using `s1.split(' ')` and `s2.split(' ')` and concatenate them via array spread `[...s1.split(' '), ...s2.split(' ')]`.
3. Accumulate counts in a JavaScript `Map` `cnt` with `cnt.set(s, (cnt.get(s) || 0) + 1)`.
4. Iterate through `cnt.entries()` and push every word `s` with count `v == 1` into `ans`.

### Algorithm / Intuition

In `uncommonFromSentences`, we avoid maintaining two separate maps or sets by pooling all tokens from `s1` and `s2` into one stream.

Each word `s` increments its counter in `cnt`. Afterward, iterating over `cnt.entries()` filters for `v == 1`. Any word shared between `s1` and `s2` has `v >= 2`, and any word repeated within a single sentence also has `v >= 2`, so only genuinely uncommon words pass the filter.

---

## Dry Run

Trace on **Example 1**: `s1 = "this apple is sweet"`, `s2 = "this apple is sour"`

1. **Tokenize & Combine:**
   `["this", "apple", "is", "sweet", "this", "apple", "is", "sour"]`
2. **Count Frequencies in `cnt`:**
   - `"this"` -> `2`
   - `"apple"` -> `2`
   - `"is"` -> `2`
   - `"sweet"` -> `1`
   - `"sour"` -> `1`
3. **Filter `v == 1`:**
   - `"sweet"` (`1 == 1`) -> push to `ans`
   - `"sour"` (`1 == 1`) -> push to `ans`
4. **Return:** `["sweet", "sour"]`.

---

## Complexity Analysis

- **Time Complexity:** `O(L_1 + L_2)` — Where `L_1` and `L_2` are the lengths of `s1` and `s2`. Splitting both strings, inserting each word into `cnt`, and scanning `cnt` all run in time proportional to the total character count.
- **Space Complexity:** `O(L_1 + L_2)` — Stores the split word arrays, the frequency map `cnt`, and the result array `ans`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [884uncommon-words-from-two-sentences.js](./884uncommon-words-from-two-sentences.js) |

---

## Key Learnings

- Reformulating multi-collection uniqueness rules into a single pooled frequency invariant (`count1 + count2 == 1`) eliminates extra set-difference logic.
- JavaScript's `Map` avoids prototype-key collisions that plain `{}` objects can suffer from on words like `"constructor"` or `"toString"`.
