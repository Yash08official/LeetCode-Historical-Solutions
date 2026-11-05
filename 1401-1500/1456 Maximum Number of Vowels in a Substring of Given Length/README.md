---
comments: true
difficulty: Medium
tags:
  - String
  - Sliding Window
---

# 1456. Maximum Number of Vowels in a Substring of Given Length

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1456` (`1456`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Sliding Window` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a string `s` and an integer `k`, return the maximum number of vowel letters in any substring of `s` that has length `k`.

Vowel letters in the English alphabet are `'a'`, `'e'`, `'i'`, `'o'`, and `'u'`.

---

## Examples

### Example 1

```text
Input: s = "abciiidef", k = 3
Output: 3
Explanation: The substring "iii" contains 3 vowel letters.
```

### Example 2

```text
Input: s = "aeiou", k = 2
Output: 2
Explanation: Any substring of length 2 contains 2 vowels.
```

### Example 3

```text
Input: s = "leetcode", k = 3
Output: 2
Explanation: "lee", "eet" and "ode" contain 2 vowels.
```

---

## Constraints

- `1 <= s.length <= 10^5`

- `s` consists of lowercase English letters.

- `1 <= k <= s.length`

---

## Problem Understanding

Key observations:
- We must inspect contiguous substrings of an exact fixed length `k`.
- We want to maximize the count of vowels (`'a'`, `'e'`, `'i'`, `'o'`, `'u'`) within that window.
- Consecutive windows of size `k` overlap by `k - 1` characters.
- Constraints: `1 <= k <= s.length <= 10^5`.

---

## Approach

### Brute Force Approach

Inspect every possible substring of length `k` by checking starting indices `i` from `0` to `s.length - k`, and count the number of vowels in `s.slice(i, i + k)`. There are `O(n)` substrings, each requiring `O(k)` character checks, leading to `O(n * k)` time. For `n = 10^5` and `k = 5 * 10^4`, this requires `5 * 10^9` operations and results in Time Limit Exceeded (TLE).

### Optimized Approach

Fixed-size sliding window. Count vowels in the first window `s[0...k-1]`. Then slide the window across `s` from index `k` to `s.length - 1`: subtract 1 if the dropped character `s[i - k]` was a vowel, add 1 if the incoming character `s[i]` is a vowel, and update the maximum vowel count at each step.

### Step-by-Step Thinking Process

1. Recognize the fixed sliding window pattern of width `k`.
2. Initialize the count of vowels in the first window `[0, k - 1]`.
3. Record `maxCount = vowelCount`.
4. Slide the window one position at a time: inspect the outgoing character `s[i - k]` and decrement `vowelCount` if it is a vowel; inspect incoming character `s[i]` and increment `vowelCount` if it is a vowel.
5. Update `maxCount = Math.max(maxCount, vowelCount)` after each slide and return `maxCount`.

### Algorithm / Intuition

The JavaScript function `maxVowels(s, k)`:
- Uses `let vowels = 'aeiou'`.
- First loop counts vowels for `i < k`: if `vowels.indexOf(s[i]) !== -1`, increment `vowelCount`.
- Sets `maxCount = vowelCount`.
- Second loop runs from `i = k` to `s.length - 1`:
  - Checks dropped character: `if (vowels.indexOf(s[i - k]) !== -1) vowelCount--;`
  - Checks added character: `if (vowels.indexOf(s[i]) !== -1) vowelCount++;`
  - Updates `maxCount = Math.max(maxCount, vowelCount);`
- Returns `maxCount`.

---

## Dry Run

Walkthrough on Example 1: `s = "abciiidef"`, `k = 3`.
- Initial window `s[0...2] = "abc"`:
  - `s[0] = 'a'` (vowel) -> `vowelCount = 1`
  - `s[1] = 'b'` (consonant)
  - `s[2] = 'c'` (consonant)
  - `maxCount = 1`.
- Slide window:
  - `i = 3 ('i')`: drop `s[0] ('a')` -> `vowelCount = 0`; add `s[3] ('i')` -> `vowelCount = 1`. `maxCount = 1`.
  - `i = 4 ('i')`: drop `s[1] ('b')` -> `vowelCount = 1`; add `s[4] ('i')` -> `vowelCount = 2`. `maxCount = 2`.
  - `i = 5 ('i')`: drop `s[2] ('c')` -> `vowelCount = 2`; add `s[5] ('i')` -> `vowelCount = 3`. `maxCount = 3`.
  - `i = 6 ('d')`: drop `s[3] ('i')` -> `vowelCount = 2`; add `s[6] ('d')` -> `vowelCount = 2`. `maxCount = 3`.
  - `i = 7 ('e')`: drop `s[4] ('i')` -> `vowelCount = 1`; add `s[7] ('e')` -> `vowelCount = 2`. `maxCount = 3`.
  - `i = 8 ('f')`: drop `s[5] ('i')` -> `vowelCount = 1`; add `s[8] ('f')` -> `vowelCount = 1`. `maxCount = 3`.
- Final result: `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Each character in `s` enters and exits the sliding window at most once. Character membership in `'aeiou'` takes `O(1)` time.
- **Space Complexity:** `O(1)` — Only a few primitive numeric variables and a constant vowel string are maintained.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1456maximum-number-of-vowels-in-a-substring-of-given-length.js](./1456maximum-number-of-vowels-in-a-substring-of-given-length.js) |

---

## Key Learnings

- Fixed-size sliding windows maintain rolling metrics in `O(1)` per step by adding incoming and subtracting outgoing elements.
- Avoid recounting elements inside overlapping windows to reduce `O(n * k)` to `O(n)`.
