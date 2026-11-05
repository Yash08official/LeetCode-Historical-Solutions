---
comments: true
difficulty: Hard
tags:
  - Hash Table
  - String
  - Dynamic Programming
---

# 2262. Total Appeal of A String

**[View Problem on LeetCode](https://leetcode.com/problems/total-appeal-of-a-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2262` (`2262`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Hash Table`, `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

The **appeal** of a string is defined as the number of **distinct** characters that appear in it (for instance, `"abbca"` has appeal `3` from `'a'`, `'b'`, and `'c'`).

Given a lowercase English string `s`, return the **sum of the appeals of all contiguous substrings** of `s`.

---

## Examples

### Example 1

```text
Input: s = "abbca"
Output: 28
Explanation: The following are the substrings of "abbca":
- Substrings of length 1: "a", "b", "b", "c", "a" have an appeal of 1, 1, 1, 1, and 1 respectively. The sum is 5.
- Substrings of length 2: "ab", "bb", "bc", "ca" have an appeal of 2, 1, 2, and 2 respectively. The sum is 7.
- Substrings of length 3: "abb", "bbc", "bca" have an appeal of 2, 2, and 3 respectively. The sum is 7.
- Substrings of length 4: "abbc", "bbca" have an appeal of 3 and 3 respectively. The sum is 6.
- Substrings of length 5: "abbca" has an appeal of 3. The sum is 3.
The total sum is 5 + 7 + 7 + 6 + 3 = 28.
```

### Example 2

```text
Input: s = "code"
Output: 20
Explanation: The following are the substrings of "code":
- Substrings of length 1: "c", "o", "d", "e" have an appeal of 1, 1, 1, and 1 respectively. The sum is 4.
- Substrings of length 2: "co", "od", "de" have an appeal of 2, 2, and 2 respectively. The sum is 6.
- Substrings of length 3: "cod", "ode" have an appeal of 3 and 3 respectively. The sum is 6.
- Substrings of length 4: "code" has an appeal of 4. The sum is 4.
The total sum is 4 + 6 + 6 + 4 = 20.
```

---

## Constraints

- `1 <= s.length <= 10^5`

- `s` consists of lowercase English letters.

---

## Problem Understanding

- **Scale Requires `O(n)` & `64`-Bit Return Type:** With `n = s.length() <= 10^5`, there are `n * (n + 1) / 2 ≈ 5 * 10^9` substrings! Even iterating over every substring once (`O(n^2)`) will time out, and the total appeal can reach `~26 * 5 * 10^9`, requiring `long`.
- **Incremental DP / Contribution by Ending Index `i`:** Let `t` be the sum of appeals of all `i + 1` substrings **ending at index `i`**. How does `t` change when we advance from `i - 1` to `i` and append character `c = s[i]`?
  - Consider all substrings ending at `i`, indexed by their start position `start` in `0 .. i`:
  - If `start <= pos[c]` (where `pos[c]` is the **previous** index of character `c`, or `-1` if unseen), `s[start .. i - 1]` *already* contained `c`, so appending `s[i] = c` adds **`0`** new distinct characters to its appeal!
  - If `start > pos[c]` (i.e., `start` in `pos[c] + 1 .. i`), `s[start .. i - 1]` did **not** contain `c` yet (including the brand-new 1-char substring `start = i`), so appending `c` increases the appeal of each of those **`i - pos[c]`** substrings by exactly **`+1`**!

---

## Approach

### Brute Force Approach

Enumerating every start index `i` and expanding end index `j` from `i` to `n - 1` while tracking distinct letters via a 26-bit bitmask computes each substring's appeal in `O(1)`, but still visits `O(n^2)` substrings (`~5 * 10^9` iterations for `n = 10^5`), resulting in `Time Limit Exceeded`.

### Optimized Approach

Use a single-pass `O(n)` dynamic programming / contribution sweep maintaining `t` (total appeal of substrings ending at `i`) and `int[] pos = new int[26]` (last seen index of each letter, initialized to `-1`), updating `t += i - pos[c]` and `ans += t` at each step.

### Step-by-Step Thinking Process

1. Initialize `long ans = 0` (grand total), `long t = 0` (sum of appeals of substrings ending at the current index), and `int[] pos = new int[26]` filled with `-1`.
2. Iterate `i` from `0` to `s.length() - 1` and let `c = s.charAt(i) - 'a'`.
3. Appending `s[i]` adds `+1` distinct character to every substring starting strictly after `pos[c]`, of which there are `i - pos[c]`; update `t += i - pos[c]`.
4. Add `t` (the sum over all substrings ending at `i`) into `ans += t`, record `pos[c] = i`, and return `ans` after the loop.

### Algorithm / Intuition

There are two equivalent ways to view `t += i - pos[c]; ans += t;`—both illuminate why the code is just 10 lines:
1. **DP Transition on Substrings Ending at `i`:** Extending the `i` substrings ending at `i - 1` by `s[i]` plus adding `s[i..i]` keeps all old appeals (`t`) and adds `+1` to each start index in `[pos[c] + 1, i]`, giving `t_new = t_old + (i - pos[c])`.
2. **Contribution Technique (First Occurrence per Substring):** Attribute a substring's distinct character `c` to the **rightmost** (or leftmost) occurrence of `c` inside that substring. In our code, summing `t` across `i = 0 .. n - 1` adds `(i - pos[c])` once at `i` and once at every future endpoint `j > i`, totaling `(i - pos[c]) * (n - i)`—the exact number of substrings whose **first** occurrence of `c` is at index `i`!

---

## Dry Run

Trace on **Example 1**: `s = "abbca"` (initially `ans = 0, t = 0`, `pos = [-1, ..., -1]`).

| `i` | `s[i]` (`c`) | Old `pos[c]` | Gain `i - pos[c]` | `t` (appeal sum ending at `i`) | `ans` (cumulative total) | New `pos[c]` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `'a'` (`0`) | `-1` | `0 - (-1) = 1` | `1` (`"a"`: 1) | `1` | `0` |
| `1` | `'b'` (`1`) | `-1` | `1 - (-1) = 2` | `3` (`"ab"`:2, `"b"`:1) | `4` | `1` |
| `2` | `'b'` (`1`) | `1` | `2 - 1 = 1` | `4` (`"abb"`:2, `"bb"`:1, `"b"`:1) | `8` | `2` |
| `3` | `'c'` (`2`) | `-1` | `3 - (-1) = 4` | `8` (`"abbc"`:3, `"bbc"`:2, `"bc"`:2, `"c"`:1) | `16` | `3` |
| `4` | `'a'` (`0`) | `0` | `4 - 0 = 4` | `12` (`"abbca"`:3, `"bbca"`:3, `"bca"`:3, `"ca"`:2, `"a"`:1) | `28` | `4` |

Final result: `ans = 28`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We scan the string `s` of length `n` once, doing `O(1)` array indexing and arithmetic per character.
- **Space Complexity:** `O(1)` — `pos` is a fixed-size array of `26` integers, plus scalar `long` accumulators `ans` and `t`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2262total-appeal-of-a-string.java](./2262total-appeal-of-a-string.java) |

---

## Key Learnings

- When asked to sum a property over all `O(n^2)` substrings in `O(n)` time, maintain the **aggregate over all substrings ending at `i`** (`t`) and determine how appending `s[i]` shifts that aggregate.
- Prevent double-counting duplicate elements inside substrings by anchoring each distinct value's `+1` contribution to its previous occurrence `pos[c]`.
