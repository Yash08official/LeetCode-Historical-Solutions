---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Sliding Window
---

# 3306. Count of Substrings Containing Every Vowel and K Consonants II

**[View Problem on LeetCode](https://leetcode.com/problems/count-of-substrings-containing-every-vowel-and-k-consonants-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3306` (`3306`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

You are given a string `word` consisting of lowercase English letters, and a non-negative integer `k`.

Your task is to find the total number of substrings of `word` that contain:
1. Every English vowel (`'a'`, `'e'`, `'i'`, `'o'`, and `'u'`) at least once, and
2. **Exactly** `k` consonants (any letter that is not a vowel).

Return the total count of such valid substrings.

---

## Examples

### Example 1

**Input:** `word = "aeioqq", k = 1`

**Output:** `0`

**Explanation:**

There is no substring with every vowel.

### Example 2

**Input:** `word = "aeiou", k = 0`

**Output:** `1`

**Explanation:**

The only substring with every vowel and zero consonants is `word[0..4]`, which is `"aeiou"`.

### Example 3

**Input:** `word = "`ieaouqqieaouqq`", k = 1`

**Output:** 3

**Explanation:**

The substrings with every vowel and one consonant are:

- `word[0..5]`, which is `"ieaouq"`.

- `word[6..11]`, which is `"qieaou"`.

- `word[7..12]`, which is `"ieaouq"`.

---

## Constraints

- `5 <= word.length <= 2 * 10^5`

- `word` consists only of lowercase English letters.

- `0 <= k <= word.length - 5`

---

## Problem Understanding

- **Two Substring Conditions:** Every valid substring must have vowel set cardinality equal to 5 (contains `'a'`, `'e'`, `'i'`, `'o'`, `'u'`) and consonant count exactly equal to `k`.
- **Exact vs. At-Least Sliding Window:** Standard sliding window algorithms naturally handle monotonic conditions like 'at least `k` consonants'. Counting 'exactly `k`' directly with a two-pointer sliding window is non-trivial because adding vowels does not increase consonant count.
- **Difference Trick:** By the inclusion-exclusion principle for monotonic properties:
  `count(exact == k) = count(at_least >= k) - count(at_least >= k + 1)`.
- This allows us to solve the problem by implementing a single sliding window function `f(word, k)` that counts substrings containing all 5 vowels and at least `k` consonants.

---

## Approach

### Brute Force Approach

Generate all `O(n^2)` possible substrings `word[i..j]`. For each substring, count the presence of all five vowels and the number of consonants. With `word.length <= 2 * 10^5`, generating and checking all substrings takes `O(n^2)` time, requiring up to `4 * 10^{10}` operations, resulting in Time Limit Exceeded.

### Optimized Approach

We reduce the problem to `f(word, k) - f(word, k + 1)`. The helper function `f(word, k)` maintains a sliding window `[l, r]`, a hash map `cnt` for vowel counts, and an integer `x` for consonants. As right pointer advances, we add character `c`. Whenever the window contains all 5 vowels (`cnt.size() == 5`) and at least `k` consonants (`x >= k`), all substrings starting from index 0 up to `l` and ending at the current character are valid. We shrink from the left by incrementing `l` while the condition holds. For each right pointer step, exactly `l` valid starting positions exist, so we accumulate `ans += l`.

### Step-by-Step Thinking Process

1. Finding substrings with 'at least' a condition is monotonic, whereas 'exactly `k`' is not.
2. Transform the exact count condition into: `count(exact k) = count(at least k) - count(at least k + 1)`.
3. Define `f(word, k)`: returns the number of substrings with all 5 vowels and `>= k` consonants.
4. Use a sliding window with left pointer `l` and right pointer moving across `word`.
5. When `cnt.size() == 5` and `x >= k`, the current window is valid. Shrink `l` to find the boundary where the window stops being valid.
6. At each right endpoint, any start index from `0` to `l - 1` forms a substring ending at `r` that contains all 5 vowels and `>= k` consonants. Thus, `ans += l`.
7. Return `f(word, k) - f(word, k + 1)`.

### Algorithm / Intuition

In `Solution.countOfSubstrings`: `f(word, k)` iterates character `c` through `word.toCharArray()`. If `c` is a vowel, `cnt.merge(c, 1, Integer::sum)` records it; if consonant, `++x`. The `while (x >= k && cnt.size() == 5)` loop shrinks the window from the left: character `d = word.charAt(l++)` is removed from `cnt` (or `x` is decremented). Once the while loop breaks, `l` represents the count of valid starting indices `[0 .. l - 1]` for which substring `word[start .. r]` contains all 5 vowels and `>= k` consonants. Adding `ans += l` accumulates valid substrings ending at `r`. Evaluating `f(word, k) - f(word, k + 1)` precisely yields the number of substrings with exactly `k` consonants.

---

## Dry Run

### Step-by-Step Execution on Example 1: `word = "aeioqq"`, `k = 1`

- Vowels present in `word`: `'a'`, `'e'`, `'i'`, `'o'`. The vowel `'u'` never appears.
- In `f(word, 1)`:
  - `cnt` contains at most 4 vowels (`'a'`, `'e'`, `'i'`, `'o'`).
  - The condition `cnt.size() == 5` is never satisfied for any window.
  - The `while` loop never executes; `l` remains `0` throughout.
  - `ans = 0`.
- In `f(word, 2)`:
  - Similarly, `'u'` is never seen, so `cnt.size() == 5` is never met.
  - `ans = 0`.
- Result: `f(word, 1) - f(word, 2) = 0 - 0 = 0`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Both `f(word, k)` and `f(word, k + 1)` make a single pass where the left pointer `l` and right pointer each advance at most `n` times. Map operations are on at most 5 elements (`O(1)`).
- **Space Complexity:** `O(1)` — The vowel map `cnt` stores at most 5 distinct vowel characters (`'a'`, `'e'`, `'i'`, `'o'`, `'u'`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3306count-of-substrings-containing-every-vowel-and-k-consonants-ii.java](./3306count-of-substrings-containing-every-vowel-and-k-consonants-ii.java) |

---

## Key Learnings

- Problems asking for 'exactly `k`' occurrences can often be converted into two calls to an 'at least `k`' sliding window function: `f(k) - f(k + 1)`.
- When shrinking a valid window `[l, r]`, the final position of `l` directly counts the number of valid starting indices ending at `r`.
