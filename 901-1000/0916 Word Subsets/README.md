---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - String
---

# 916. Word Subsets

**[View Problem on LeetCode](https://leetcode.com/problems/word-subsets/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0916` (`916`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `String` |
| **Solution Language** | Java |

---

## Problem Description

You are given two arrays of lowercase English strings, `words1` and `words2`.

A string `b` is a **subset** of string `a` if every character in `b` appears in `a` at least as many times as it appears in `b` (order does not matter, only character multiplicity). A string `a` from `words1` is called **universal** if **every** string `b` in `words2` is a subset of `a`.

Return a list of all universal strings from `words1` in any order.

---

## Examples

### Example 1

**Input:** `words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["e","o"]`

**Output:** `["facebook","google","leetcode"]`

### Example 2

**Input:** `words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["lc","eo"]`

**Output:** `["leetcode"]`

### Example 3

**Input:** `words1 = ["acaac","cccbb","aacbb","caacc","bcbbb"], words2 = ["c","cc","b"]`

**Output:** `["cccbb"]`

---

## Constraints

- `1 <= words1.length, words2.length <= 10^4`

- `1 <= words1[i].length, words2[i].length <= 10`

- `words1[i]` and `words2[i]` consist only of lowercase English letters.

- All the strings of `words1` are **unique**.

---

## Problem Understanding

- **Order Independence:** Subset membership depends purely on character frequencies (`'a'` through `'z'`), not substring order.
- **Combining All `words2` Constraints:** For `a` to contain `'c'` at least `count_b('c')` times for **every** `b` in `words2`, `a` simply needs to contain `'c'` at least `max_{b in words2} count_b('c')` times! This collapses up to `10^4` strings in `words2` into a **single** 26-letter requirement profile.
- **Small Alphabet:** Only lowercase English letters appear, so a fixed-length `int[26]` array represents any word or merged constraint.

---

## Approach

### Brute Force Approach

Comparing every string `a` in `words1` against every string `b` in `words2` individually checks up to `words1.length * words2.length` pairs. With both arrays having up to `10^4` strings, `10^8` frequency comparisons of size `26` (~`2.6 * 10^9` operations) will exceed the time limit.

### Optimized Approach

Reduce `words2` into a single 26-element array `cnt` storing the **maximum** frequency required for each letter `'a'..'z'` across all words in `words2`. Then scan `words1` once, keeping every word `a` whose frequency array `t` satisfies `t[i] >= cnt[i]` for all `26` letters.

### Step-by-Step Thinking Process

1. Recognize that `t_a[ch] >= t_b[ch]` for all `b` in `words2` holds if and only if `t_a[ch] >= max_{b in words2}(t_b[ch])`.
2. Create `int[] cnt = new int[26]` and iterate over each `b` in `words2`: count `b`'s characters in a temporary `int[] t = new int[26]` and update `cnt[i] = Math.max(cnt[i], t[i])`.
3. Now `cnt` acts as a single 'composite word' representing the union of all multiplicity demands in `words2`.
4. Iterate over each candidate `a` in `words1`: count its letters in `t`, verify `cnt[i] <= t[i]` for `i = 0..25`, and add `a` to `ans` if all `26` checks pass.

### Algorithm / Intuition

In `wordSubsets`, the first loop builds `cnt[26]`, where `cnt[c]` is the peak occurrence count of character `'a' + c` inside any single word of `words2`. Notice we take `Math.max`—not sum—because each `b` in `words2` is tested independently against `a` (as seen in Example 3: `words2 = ["c", "cc", "b"]` requires two `'c'`s and one `'b'`, not three `'c'`s).

The second loop evaluates each string `a` in `words1` in `O(|a| + 26)` time by tallying `a`'s characters into `t` and checking whether `cnt[i] > t[i]` ever triggers `ok = false`. All surviving strings are collected in `ans`.

---

## Dry Run

Trace on **Example 1**: `words1 = ["amazon", "apple", "facebook", "google", "leetcode"]`, `words2 = ["e", "o"]`

1. **Build `cnt` from `words2`:**
   - `b = "e"` -> `cnt['e'] = max(0, 1) = 1`
   - `b = "o"` -> `cnt['o'] = max(0, 1) = 1` (all other letters `0`)

2. **Check `words1` against `cnt` (`'e' >= 1` and `'o' >= 1`):**

| Word `a` | `t['e']` | `t['o']` | `t >= cnt` (`ok`)? | Action |
| :--- | :--- | :--- | :--- | :--- |
| `"amazon"` | `0` | `1` | `false` (`t['e'] < 1`) | Skip |
| `"apple"` | `1` | `0` | `false` (`t['o'] < 1`) | Skip |
| `"facebook"` | `1` | `2` | `true` | Add to `ans` |
| `"google"` | `1` | `2` | `true` | Add to `ans` |
| `"leetcode"` | `3` | `1` | `true` | Add to `ans` |

3. **Final Result:** `["facebook", "google", "leetcode"]`.

---

## Complexity Analysis

- **Time Complexity:** `O(W_1 + W_2)` — Where `W_1` and `W_2` are the total character counts across `words1` and `words2` (plus `26 * (words1.length + words2.length)` fixed-alphabet array checks, which is `O(W_1 + W_2)` since every word is non-empty).
- **Space Complexity:** `O(1)` auxiliary space (excluding the output list `ans`) — Uses only fixed-size `int[26]` arrays `cnt` and `t`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [916word-subsets.java](./916word-subsets.java) |

---

## Key Learnings

- Whenever an item must satisfy `f(item) >= f(query)` for **every** `query` in a set, precomputing `M = max_query f(query)` reduces `N * Q` pairwise checks to `N + Q`.
- Be careful to aggregate per-word frequencies with `Math.max` rather than `+`: `"c"` and `"cc"` require at least two `'c'`s in `a`, not three.
