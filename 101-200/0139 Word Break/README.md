---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - String
  - Dynamic Programming
  - Trie
  - Memoization
  - Brute-Force Search
---

# 139. Word Break

**[View Problem on LeetCode](https://leetcode.com/problems/word-break/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0139` (`139`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `String`, `Dynamic Programming`, `Trie`, `Memoization`, `Brute-Force Search` |
| **Solution Language** | Java |

---

## Problem Description

Given a non-empty string `s` and a list of unique dictionary strings `wordDict`, determine whether `s` can be completely partitioned into one or more contiguous substrings that all appear in `wordDict`.

You may reuse any word from `wordDict` as many times as needed, and every character of `s` must belong to exactly one chosen dictionary word. Return `true` if a valid segmentation exists, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
```

### Example 2

```text
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
```

### Example 3

```text
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
```

---

## Constraints

- `1 <= s.length <= 300`

- `1 <= wordDict.length <= 1000`

- `1 <= wordDict[i].length <= 20`

- `s` and `wordDict[i]` consist of only lowercase English letters.

- All the strings of `wordDict` are **unique**.

---

## Problem Understanding

- **Complete Prefix Coverage:** A prefix `s[0..i-1]` can be segmented if and only if there is some split index `j` (`0 <= j < i`) where the shorter prefix `s[0..j-1]` is already segmentable and the remaining suffix `s[j..i-1]` is a dictionary word.
- **Overlapping Subproblems:** Multiple word combinations may reach the exact same index `j` (for instance, `"cat" + "sand"` and `"cats" + "and"` both reach index `7`). Once we know index `7` is reachable, we never need to re-verify how we got there.
- **Fast Dictionary Lookup:** Converting `wordDict` into a `HashSet` avoids linear scans through the dictionary list during substring checks.

---

## Approach

### Brute Force Approach

A naive recursive backtracking solution tries every prefix of `s` that matches a word in `wordDict` and recursively checks the remaining suffix. On adversarial inputs like `s = "aaaaaaaa...b"` and `wordDict = ["a", "aa", "aaa"]`, recursion repeatedly solves identical suffix indices, exploding to `O(2^n)` time.

### Optimized Approach

Use **Bottom-Up 1D Dynamic Programming** with a boolean array `f` of size `n + 1` and a `HashSet<String> words` for `O(L)` substring lookups, marking `f[i] = true` as soon as a valid split `j < i` is found.

### Step-by-Step Thinking Process

1. Store `wordDict` in a `HashSet<String> words` so membership tests depend only on substring length rather than dictionary size.
2. Define DP state `f[i]` (for `0 <= i <= n`) as whether the prefix of length `i` (`s.substring(0, i)`) can be segmented into dictionary words.
3. Set the base case `f[0] = true` representing the empty prefix.
4. For each prefix length `i` from `1` to `n`, iterate split points `j` from `0` to `i - 1`. If `f[j]` is `true` and `words.contains(s.substring(j, i))`, set `f[i] = true` and `break` immediately.
5. Return `f[n]`, which indicates whether the entire string `s` can be segmented.

### Algorithm / Intuition

In `wordBreak`, `boolean[] f = new boolean[n + 1]` acts as reachable stepping stones across indices `0..n` of string `s`. Index `0` starts reachable (`f[0] = true`). To determine if index `i` is reachable, the inner loop checks every prior index `j < i`: first short-circuiting on `f[j]` so we only extract and hash `s.substring(j, i)` when `j` itself is reachable. As soon as one valid last word `s.substring(j, i)` bridges `j` to `i`, `f[i]` becomes `true` and `break` skips unnecessary remaining splits.

---

## Dry Run

Trace on **Example 1**: `s = "leetcode"` (`n = 8`), `words = {"leet", "code"}`

- **Base Case:** `f = [true, false, false, false, false, false, false, false, false]`
- `i = 1..3`: Only `j = 0` has `f[0] == true`; `"l"`, `"le"`, `"lee"` are not in `words` -> `f[1..3] = false`.
- `i = 4`: At `j = 0`, `f[0]` is `true` and `s.substring(0, 4) = "leet"` is in `words` -> set `f[4] = true` and `break`.
- `i = 5..7`: Reachable indices are `j = 0` and `j = 4`, but neither `s.substring(0, i)` nor `s.substring(4, i)` (`"c"`, `"co"`, `"cod"`) is in `words` -> `f[5..7] = false`.
- `i = 8`: `j = 0` (`"leetcode"` not in `words`), `j = 1..3` (`f[j]` false), `j = 4` (`f[4]` is `true` and `s.substring(4, 8) = "code"` is in `words`) -> set `f[8] = true` and `break`.
- Return `f[8] = true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^3 + m * k)` — Building the `HashSet` from `m` dictionary words of average length `k` takes `O(m * k)`. The nested loops iterate `O(n^2)` pairs `(j, i)`, and each `s.substring(j, i)` plus `HashSet.contains` takes `O(i - j) = O(n)` time in Java.
- **Space Complexity:** `O(n + m * k)` — `f` uses `O(n)` booleans and the `HashSet` `words` stores the dictionary characters taking `O(m * k)` space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [139word-break.java](./139word-break.java) |

---

## Key Learnings

- Checking `f[j]` before calling `s.substring(j, i)` avoids allocating substrings from unreachable split positions.
- Breaking out of the inner loop immediately once `f[i]` becomes `true` prevents redundant checks for the same prefix.
- If `wordDict[i].length` is small (here `<= 20`), you can further prune the inner loop to only check `i - j <= maxWordLen`.
