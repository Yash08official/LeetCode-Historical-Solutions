---
comments: true
difficulty: Hard
tags:
  - Hash Table
  - String
  - Sliding Window
---

# 30. Substring with Concatenation of All Words

**[View Problem on LeetCode](https://leetcode.com/problems/substring-with-concatenation-of-all-words/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0030` (`30`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Hash Table`, `String`, `Sliding Window` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a string `s` and an array of strings `words`, where every string in `words` has the **exact same length** `k`.

A **concatenated substring** is a contiguous substring of `s` of length `words.length * k` formed by concatenating all elements of `words` in any permutation order (respecting duplicate words in `words`). Return an array containing all starting indices in `s` where such a concatenated substring begins, in any order.

---

## Examples

### Example 1

**Input:** `s = "barfoothefoobarman", words = ["foo","bar"]`

**Output:** `[0,9]`

**Explanation:**

The substring starting at 0 is `"barfoo"`. It is the concatenation of `["bar","foo"]` which is a permutation of `words`.

The substring starting at 9 is `"foobar"`. It is the concatenation of `["foo","bar"]` which is a permutation of `words`.

### Example 2

**Input:** `s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]`

**Output:** `[]`

**Explanation:**

There is no concatenated substring.

### Example 3

**Input:** `s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]`

**Output:** `[6,9,12]`

**Explanation:**

The substring starting at 6 is `"foobarthe"`. It is the concatenation of `["foo","bar","the"]`.

The substring starting at 9 is `"barthefoo"`. It is the concatenation of `["bar","the","foo"]`.

The substring starting at 12 is `"thefoobar"`. It is the concatenation of `["the","foo","bar"]`.

---

## Constraints

- `1 <= s.length <= 10^4`

- `1 <= words.length <= 5000`

- `1 <= words[i].length <= 30`

- `s` and `words[i]` consist of lowercase English letters.

---

## Problem Understanding

- **Fixed word length `k`:** Because every word in `words` has length `k = words[0].length`, any valid concatenated substring starting at index `l` splits cleanly into `n = words.length` consecutive `k`-character chunks aligned to offset `l % k`.
- **Only `k` alignment classes:** Every possible start index in `s` has remainder `i = l % k` in `{0, 1, ..., k - 1}`. Within each fixed offset `i`, `s` behaves like an array of `k`-letter tokens!
- **Duplicate words matter:** `words` may contain repeated strings (e.g. `["word","good","best","word"]`), so frequency maps are required rather than a plain set.

---

## Approach

### Brute Force Approach

Checking every starting index `0 <= idx <= m - n * k` independently by slicing `n` substrings of length `k` and building a fresh frequency map takes `O(n * k)` per index, resulting in `O(m * n * k)` time—up to `10^4 * 5000 * 30` operations in the worst case.

### Optimized Approach

The implemented JavaScript solution uses **modulo-aligned word-level sliding windows**. After counting target word frequencies in `cnt`, it loops over each alignment offset `i` from `0` to `k - 1` and slides a window `[l, r)` in steps of `k`, maintaining current window word counts in `cnt1` and matched word count `t`.

### Step-by-Step Thinking Process

1. Build `cnt` mapping each word `w` in `words` to its required frequency, and record `m = s.length`, `n = words.length`, `k = words[0].length`.
2. Run `k` independent sliding-window passes for starting offsets `i = 0, 1, ..., k - 1`.
3. In each pass, initialize `cnt1 = {}`, window pointers `l = i` and `r = i`, and matched token count `t = 0`. Advance `r` in steps of `k` while `r + k <= m`.
4. Extract `w = s.substring(r, r + k)` and advance `r += k`. If `!cnt.hasOwnProperty(w)`, `w` cannot belong to any valid concatenation—reset `cnt1 = {}`, `l = r`, and `t = 0`.
5. Otherwise increment `cnt1[w]` and `t`. If `w` appears too many times (`cnt1[w] > cnt[w]`), shrink from the left (`remove = s.substring(l, l + k)`, `l += k`, `--cnt1[remove]`, `--t`) until `cnt1[w] <= cnt[w]`. Whenever `t === n`, record `ans.push(l)`.

### Algorithm / Intuition

Why does checking `t === n` guarantee an exact permutation match without comparing the entire `cnt1` object against `cnt`? Because two invariants hold simultaneously inside `[l, r)`: (1) every word inside the window exists in `cnt` (unknown words immediately reset `l = r` and `t = 0`), and (2) the `while (cnt1[w] > cnt[w])` loop ensures no word's frequency in `cnt1` ever exceeds `cnt[w]`. If `t === n` words are in the window and none exceeds its target count, every word's count in `cnt1` must equal `cnt[w]`!

---

## Dry Run

Tracing Example 1: `s = "barfoothefoobarman"` (`m = 18`), `words = ["foo", "bar"]` (`n = 2`, `k = 3`, `cnt = {foo: 1, bar: 1}`)

- **Offset `i = 0`** (chunks at `0, 3, 6, 9, 12, 15`: `"bar"`, `"foo"`, `"the"`, `"foo"`, `"bar"`, `"man"`):
  - `r = 0->3`, `w = "bar"`: in `cnt` -> `cnt1 = {bar: 1}`, `t = 1`, `l = 0`.
  - `r = 3->6`, `w = "foo"`: in `cnt` -> `cnt1 = {bar: 1, foo: 1}`, `t = 2 == n` -> **`ans.push(0)`**!
  - `r = 6->9`, `w = "the"`: not in `cnt` -> reset `cnt1 = {}`, `l = 9`, `t = 0`.
  - `r = 9->12`, `w = "foo"`: in `cnt` -> `cnt1 = {foo: 1}`, `t = 1`, `l = 9`.
  - `r = 12->15`, `w = "bar"`: in `cnt` -> `cnt1 = {foo: 1, bar: 1}`, `t = 2 == n` -> **`ans.push(9)`**!
  - `r = 15->18`, `w = "man"`: not in `cnt` -> reset `cnt1 = {}`, `l = 18`, `t = 0`.
- **Offsets `i = 1` and `i = 2`:** None of the 3-letter chunks match both `"foo"` and `"bar"` consecutively.
- Final `ans = [0, 9]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n * k + m * k)` — Building `cnt` takes `O(n * k)`. Across the `k` offset passes, `l` and `r` each visit at most `m / k` word positions per pass, and each `k`-character substring extraction/hash lookup costs `O(k)`, giving `k * O((m / k) * k) = O(m * k)`.
- **Space Complexity:** `O(n * k)` — Excluding the result array `ans`, `cnt` and `cnt1` each store at most `n` distinct word keys of length `k`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [30substring-with-concatenation-of-all-words.js](./30substring-with-concatenation-of-all-words.js) |

---

## Key Learnings

- Partitioning start indices by `i = l % k` converts fixed-length multi-word matching into `k` standard sliding-window problems over word tokens.
- Using `cnt.hasOwnProperty(w)` in JavaScript (rather than `if (!cnt[w])`) avoids prototype-chain collisions on words like `"constructor"` or `"toString"`.
- Resetting the window on invalid tokens and shrinking via `while (cnt1[w] > cnt[w])` lets a single integer `t === n` detect valid permutations in `O(1)`.
