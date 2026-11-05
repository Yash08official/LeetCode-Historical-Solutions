---
comments: true
difficulty: Medium
tags:
  - Array
  - String
  - Prefix Sum
---

# 2559. Count Vowel Strings in Ranges

**[View Problem on LeetCode](https://leetcode.com/problems/count-vowel-strings-in-ranges/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2559` (`2559`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `String`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 0-indexed array of strings `words` and a 2D integer array `queries` where `queries[i] = [l_i, r_i]`.

A string is called a **vowel string** if both its first character and its last character are English vowels (`'a'`, `'e'`, `'i'`, `'o'`, and `'u'`).

For each query `queries[i]`, determine the number of vowel strings that lie in the subarray `words[l_i...r_i]` (inclusive of both boundaries). Return an integer array `ans` where `ans[i]` is the answer to the `i`-th query.

---

## Examples

### Example 1

```text
Input: words = ["aba","bcb","ece","aa","e"], queries = [[0,2],[1,4],[1,1]]
Output: [2,3,0]
Explanation: The strings starting and ending with a vowel are "aba", "ece", "aa" and "e".
The answer to the query [0,2] is 2 (strings "aba" and "ece").
to query [1,4] is 3 (strings "ece", "aa", "e").
to query [1,1] is 0.
We return [2,3,0].
```

### Example 2

```text
Input: words = ["a","e","i"], queries = [[0,2],[0,1],[2,2]]
Output: [3,2,1]
Explanation: Every string satisfies the conditions, so we return [3,2,1].
```

---

## Constraints

- `1 <= words.length <= 10^5`

- `1 <= words[i].length <= 40`

- `words[i]` consists only of lowercase English letters.

- `sum(words[i].length) <= 3 * 10^5`

- `1 <= queries.length <= 10^5`

- `0 <= l_i <= r_i < words.length`

---

## Problem Understanding

We have $m$ range-count queries over an array of words of size $n$. A word is valid if `word[0]` and `word[word.length - 1]` are in the set `{'a', 'e', 'i', 'o', 'u'}`. Since $n, m \le 10^5$, answering each query by scanning the range `[l, r]` would take $O(m \cdot n)$ worst-case time, which will easily exceed the time limit. We must precompute indices or counts to answer each range query in sub-linear time.

---

## Approach

### Brute Force Approach

For each query `[l, r]`, iterate a loop from index `l` to `r`, inspect the first and last characters of `words[j]`, and increment a counter if both are vowels. For $10^5$ queries spanning ranges up to $10^5$, this requires up to $10^{10}$ character inspections, leading to Time Limit Exceeded.

### Optimized Approach

Collect the 0-indexed positions of all vowel strings into a sorted list `nums`. Because `nums` stores indices in strictly ascending order, the number of vowel strings in range `[l, r]` equals the count of indices in `nums` that satisfy $l \le idx \le r$. This can be computed using binary search: find the first index in `nums` $\ge r + 1$ and subtract the first index in `nums` $\ge l$.

### Step-by-Step Thinking Process

1. Identify the condition: word starts and ends with a vowel.
2. Instead of standard prefix sums of length $n$, the solution stores only the indices of valid words in a dynamic array `nums`.
3. Since indices are naturally added in strictly increasing order ($0, 1, \dots, n-1$), `nums` is already sorted.
4. To count how many elements of `nums` fall in $[l, r]$, use binary search (`lower_bound`): `search(r + 1) - search(l)`.
5. `search(x)` finds the count of elements in `nums` strictly less than `x` (i.e., the first index with `nums[idx] >= x`).

### Algorithm / Intuition

First, the method populates `nums` with indices `i` where both `words[i].charAt(0)` and `words[i].charAt(words[i].length() - 1)` are in `vowels`. Then, for each query `queries[i] = [l, r]`, `search(r + 1)` returns the index of the first valid word strictly after index `r` (which equals the total number of vowel words up to index `r`), and `search(l)` returns the index of the first valid word at or after `l` (which equals the total number of vowel words before `l`). The difference `search(r + 1) - search(l)` yields the exact count of vowel strings in `[l, r]` in $O(\log |nums|)$ time.

---

## Dry Run

Trace with Example 1: `words = ["aba","bcb","ece","aa","e"]`, `queries = [[0,2],[1,4],[1,1]]`.
- Check words:
  - `i=0` ("aba"): 'a' and 'a' -> vowel. `nums = [0]`.
  - `i=1` ("bcb"): 'b' not vowel. Skip.
  - `i=2` ("ece"): 'e' and 'e' -> vowel. `nums = [0, 2]`.
  - `i=3` ("aa"): 'a' and 'a' -> vowel. `nums = [0, 2, 3]`.
  - `i=4` ("e"): 'e' and 'e' -> vowel. `nums = [0, 2, 3, 4]`.
- Query 0: `[0, 2]`. `search(3) - search(0)`:
  - `search(3)`: first element $\ge 3$ in `[0, 2, 3, 4]` is at index 2. Returns 2.
  - `search(0)`: first element $\ge 0$ is at index 0. Returns 0.
  - `ans[0] = 2 - 0 = 2`.
- Query 1: `[1, 4]`. `search(5) - search(1)`:
  - `search(5)`: all elements $< 5$, returns `nums.size() = 4`.
  - `search(1)`: first element $\ge 1$ is at index 1 (`nums[1] = 2`). Returns 1.
  - `ans[1] = 4 - 1 = 3`.
- Query 2: `[1, 1]`. `search(2) - search(1)`:
  - `search(2)`: first element $\ge 2$ is at index 1 (`nums[1] = 2`). Returns 1.
  - `search(1)`: returns 1.
  - `ans[2] = 1 - 1 = 0`.
Result: `[2, 3, 0]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + m log n)` — Filtering the `n` words takes `O(n)` time (each word's first/last character checked in `O(1)`). For each of the `m` queries, two binary searches run on `nums` of size at most `n`, taking `O(log n)` time per query. Total time is `O(n + m log n)`.
- **Space Complexity:** `O(n + m)` — The `nums` list stores up to `n` indices, and `ans` stores `m` query answers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2559count-vowel-strings-in-ranges.java](./2559count-vowel-strings-in-ranges.java) |

---

## Key Learnings

- A sorted list of valid indices combined with binary search (`lower_bound`) provides a memory-efficient alternative to full prefix sum arrays, especially when valid items are sparse.
- Range counting in a sorted array is cleanly formulated as `lower_bound(r + 1) - lower_bound(l)`.
- Checking characters using a set of vowels `Set.of('a', 'e', 'i', 'o', 'u')` keeps code clean and readability high.
