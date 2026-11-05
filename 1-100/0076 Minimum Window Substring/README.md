---
comments: true
difficulty: Hard
tags:
  - Hash Table
  - String
  - Sliding Window
---

# 76. Minimum Window Substring

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-window-substring/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0076` (`76`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Hash Table`, `String`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

Given two strings `s` (length `m`) and `t` (length `n`), find and return the shortest contiguous substring of `s` that contains every character of `t` at least as many times as it appears in `t` (including duplicate characters). If no such substring exists in `s`, return `""`.

Test cases guarantee that whenever a valid window exists, the shortest window is unique.

---

## Examples

### Example 1

```text
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
```

### Example 2

```text
Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
```

### Example 3

```text
Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
```

---

## Constraints

- `m == s.length`

- `n == t.length`

- `1 <= m, n <= 10^5`

- `s` and `t` consist of uppercase and lowercase English letters.

---

## Follow-up Questions

Could you find an algorithm that runs in `O(m + n)` time?

Yes — the implemented sliding-window algorithm runs in **`O(m + n)`** time: `O(n)` to count `t`, plus at most `2m` pointer increments (`r` moves `m` times and `l` moves at most `m` times), each doing `O(1)` work.

---

## Problem Understanding

- Order of characters inside the window does not matter — only character multiplicities matter (`window[c] >= need[c]` for every character `c`).
- Both uppercase and lowercase English letters can appear (`'A'-'Z'` and `'a'-'z'`), which all have ASCII codes in `[65, 122]`, fitting neatly inside fixed-size `int[128]` frequency arrays.
- **Monotonic Window Property:** If `s[l..r]` already covers `t`, extending `r` further right only makes it longer; conversely, shrinking `l` rightward lets us find the minimal valid window ending at `r`.

---

## Approach

### Brute Force Approach

Checking every possible substring `s[i..j]` (`0 <= i <= j < m`) and counting frequencies to verify whether it covers `t` examines `O(m^2)` substrings and takes `O(m)` or `O(128)` per check, resulting in `O(m^2)` to `O(m^3)` time — causing Time Limit Exceeded for `m = 10^5`.

### Optimized Approach

Use a two-pointer **Sliding Window** (`l` and `r`) backed by two `int[128]` ASCII frequency arrays (`need` and `window`) and a matched-character counter `cnt` to expand and shrink the window in `O(m + n)` linear time.

### Step-by-Step Thinking Process

1. Populate `need[c]` with the frequency of each character in `t`. We need to match a total of `n = t.length()` character occurrences.
2. Maintain `window[c]` for the active substring `s[l..r]` and an integer `cnt` tracking how many required character instances from `t` are currently satisfied.
3. Advance right pointer `r`: increment `window[s.charAt(r)]`. If the new count `<= need[c]`, this character contributed toward satisfying `t`, so increment `cnt`.
4. Whenever `cnt == n`, the window `s[l..r]` is valid: record `k = l` and `mi = r - l + 1` if strictly shorter than the best seen so far.
5. Shrink left pointer `l` inside the `while (cnt == n)` loop: if `window[s.charAt(l)] <= need[s.charAt(l)]`, removing `s.charAt(l)` breaks a required match so decrement `cnt`; then decrement `window[s.charAt(l)]` and increment `l`.

### Algorithm / Intuition

In `minWindow(String s, String t)`, `need` and `window` are `int[128]` tables. After populating `need` from `t`, we track:
- `k = -1`: start index of the shortest valid window found (`-1` means none found yet).
- `mi = m + 1`: shortest valid window length found (initialized above maximum possible length `m`).
- `cnt = 0`: number of useful character matches (`0 <= cnt <= n`).

As `r` scans `0 .. m - 1`, `if (++window[c] <= need[c]) ++cnt;` ensures excess copies of a character (beyond `need[c]`) do NOT inflate `cnt`. Thus `cnt == n` holds if and only if every character `c` satisfies `window[c] >= need[c]`. Inside `while (cnt == n)`, we update `(mi, k)` when `r - l + 1 < mi`, then eject `s.charAt(l)` and decrement `cnt` only when `window[c] <= need[c]` (meaning we just lost a needed copy). Finally, if `k < 0` we return `""`, otherwise `s.substring(k, k + mi)`.

---

## Dry Run

Tracing Example 1 with `s = "ADOBECODEBANC"` (`m = 13`), `t = "ABC"` (`n = 3`, `need['A']=1, need['B']=1, need['C']=1`):

1. **Expand `r = 0..5` (`"ADOBEC"`):**
   - `r = 0 ('A')`: `cnt = 1`
   - `r = 3 ('B')`: `cnt = 2`
   - `r = 5 ('C')`: `cnt = 3 == n` -> Valid! `mi = 6, k = 0` (`"ADOBEC"`). Shrink `l = 0 ('A')`: `window['A'] == need['A']`, so `cnt` drops to `2`, `l = 1`.
2. **Expand `r = 6..10` (`"DOBECODEBA"`):**
   - `r = 9 ('B')`: `window['B']` becomes `2 > need['B']`, `cnt` stays `2`.
   - `r = 10 ('A')`: `window['A']` becomes `1 <= need['A']`, `cnt = 3 == n`!
   - Shrink `l` from `1` (`'D'`, `'O'`, `'B'` where `window['B']=2 > 1`, `'E'`): `l` reaches `5` (`'C'`, window `"CODEBA"`, length `6` not `< 6`), then removing `'C'` drops `cnt` to `2`, `l = 6`.
3. **Expand `r = 11..12` (`"ODEBANC"`):**
   - `r = 12 ('C')`: `cnt = 3 == n`!
   - Shrink `l = 6 ('O')`, `7 ('D')`, `8 ('E')` -> reaches `l = 9` (`"BANC"`, length `12 - 9 + 1 = 4 < 6`): updates **`mi = 4, k = 9`**!
   - Removing `l = 9 ('B')` drops `cnt` to `2`, `l = 10`.
4. **End of loop:** Returns `s.substring(9, 13)` = `"BANC"`.

---

## Complexity Analysis

- **Time Complexity:** `O(m + n)` — Building `need` takes `O(n)` time, and during the sliding window scan both `r` and `l` advance at most `m` times each with `O(1)` array operations per step.
- **Space Complexity:** `O(1)` auxiliary space — `need` and `window` are fixed-size arrays of `128` integers (`O(|Σ|)`), independent of `m` and `n` (excluding the output substring of length at most `m`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [76minimum-window-substring.java](./76minimum-window-substring.java) |

---

## Key Learnings

- Tracking a single integer `cnt` of satisfied character instances lets us test window validity in `O(1)` time (`cnt == n`) instead of comparing all `128` buckets every step.
- Only increment `cnt` when `++window[c] <= need[c]`, and only decrement `cnt` when `window[c] <= need[c]` prior to `--window[c]` — this cleanly ignores surplus duplicates inside the window.
- Recording best `(k, mi)` indices during the scan and calling `s.substring(k, k + mi)` once at the end avoids allocating intermediate substring objects inside the inner loop (`O(m^2)` string copy trap).
