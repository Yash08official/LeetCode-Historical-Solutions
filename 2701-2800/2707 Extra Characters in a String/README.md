---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - String
  - Dynamic Programming
  - Trie
---

# 2707. Extra Characters in a String

**[View Problem on LeetCode](https://leetcode.com/problems/extra-characters-in-a-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2707` (`2707`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `String`, `Dynamic Programming`, `Trie` |
| **Solution Language** | Java |

---

## Problem Description

We are given a 0-indexed string `s` and a dictionary of words `dictionary`. We want to break `s` into one or more non-overlapping substrings such that each substring is found in `dictionary`.

Some characters in `s` might not belong to any valid dictionary word; these characters are counted as **extra characters**.

Our goal is to find the **minimum number of extra characters** left over if we break up `s` optimally.

---

## Examples

### Example 1

```text
Input: s = "leetscode", dictionary = ["leet","code","leetcode"]
Output: 1
Explanation: We can break s in two substrings: "leet" from index 0 to 3 and "code" from index 5 to 8. There is only 1 unused character (at index 4), so we return 1.
```

### Example 2

```text
Input: s = "sayhelloworld", dictionary = ["hello","world"]
Output: 3
Explanation: We can break s in two substrings: "hello" from index 3 to 7 and "world" from index 8 to 12. The characters at indices 0, 1, 2 are not used in any substring and thus are considered as extra characters. Hence, we return 3.
```

---

## Constraints

- `1 <= s.length <= 50`

- `1 <= dictionary.length <= 50`

- `1 <= dictionary[i].length <= 50`

- `dictionary[i]` and `s` consists of only lowercase English letters

- `dictionary` contains distinct words

---

## Problem Understanding

Key properties and constraints:
- String length `s.length <= 50`, dictionary size `<= 50`, and word length `<= 50`.
- Substrings taken from the dictionary must not overlap.
- Any character not covered by a dictionary word costs `1` extra character.
- Small constraints ($N \le 50$) make dynamic programming in $O(N^2)$ or $O(N^3)$ fully feasible.
- At every index `i`, we have two choices: treat `s[i - 1]` as an extra character, or find a matching dictionary word ending at `i`.

---

## Approach

### Brute Force Approach

A naive approach would use backtracking to test every possible partition of `s`. At each position, we can either skip the current character (cost +1) or match any dictionary word that begins at that position. Without memoization, this explores an exponential number of combinations $O(2^N)$, which easily times out even for $N = 50$.

### Optimized Approach

The solution uses 1D Dynamic Programming. We first store all dictionary words in a `HashSet<String>` `ss` for $O(1)$ expected lookup. We define `f[i]` as the minimum extra characters needed for the prefix `s[0..i-1]`. For each `i` from 1 to `n`, we initialize `f[i] = f[i - 1] + 1` (treating `s.charAt(i - 1)` as extra). Then, for each possible start index `j` from `0` to `i - 1`, we check if `s.substring(j, i)` is in `ss`. If it is, all characters from `j` to `i - 1` are matched with 0 extra cost, allowing us to update `f[i] = Math.min(f[i], f[j])`. Finally, `f[n]` gives the minimum extra characters for the full string.

### Step-by-Step Thinking Process

1. Observe that the optimal subproblem structure matches prefix DP: the minimum extra characters for `s[0..i-1]` depends on optimal answers for shorter prefixes `s[0..j-1]`.
2. Define state `f[i]` = minimum extra characters in prefix of length `i` (`s.substring(0, i)`). Base case: `f[0] = 0`.
3. Transition 1: If we do not match `s.charAt(i - 1)` into any word, it is an extra character, giving `f[i] = f[i - 1] + 1`.
4. Transition 2: If there exists `j < i` such that `s.substring(j, i)` is in `dictionary`, we can transition without extra cost: `f[i] = min(f[i], f[j])`.
5. Insert all dictionary words into a `HashSet` to enable fast membership queries.
6. Return `f[n]` as the answer.

### Algorithm / Intuition

The DP table `f` of size `n + 1` has `f[0] = 0`. As `i` increases from 1 to `n`, `f[i]` is initially set to `f[i - 1] + 1`, representing the scenario where the character `s.charAt(i - 1)` cannot be part of any dictionary word and must be counted as extra. The inner loop iterates `j` from `0` to `i - 1`. If `ss.contains(s.substring(j, i))` is true, the substring `s[j..i-1]` forms a complete dictionary word, meaning zero additional extra characters are incurred beyond whatever was optimal for prefix `s[0..j-1]`. Thus, `f[i] = Math.min(f[i], f[j])`. At the end, `f[n]` represents the optimal cost for the entire string `s`.

---

## Dry Run

We trace Example 1 with `s = "leetscode"` (length 9) and `dictionary = ["leet", "code", "leetcode"]`:

- `ss = {"leet", "code", "leetcode"}`, `f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]`.
- `i = 1`: `f[1] = f[0] + 1 = 1`. Substring "l" not in `ss`.
- `i = 2`: `f[2] = 2`.
- `i = 3`: `f[3] = 3`.
- `i = 4`: `f[4] = f[3] + 1 = 4`. When `j = 0`, `s.substring(0, 4) = "leet"` is in `ss`! `f[4] = Math.min(4, f[0]) = 0`.
- `i = 5`: `f[5] = f[4] + 1 = 1` ('s' is extra). No matching substring ending at 5.
- `i = 6`: `f[6] = f[5] + 1 = 2`.
- `i = 7`: `f[7] = 3`.
- `i = 8`: `f[8] = 4`.
- `i = 9`: `f[9] = f[8] + 1 = 5`. When `j = 5`, `s.substring(5, 9) = "code"` is in `ss`! `f[9] = Math.min(5, f[5]) = Math.min(5, 1) = 1`.
- Return `f[9] = 1`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^3 + m \cdot L)` where `n` is `s.length()`, `m` is `dictionary.length`, and `L` is average word length. Inserting dictionary words takes `O(m \cdot L)`. The nested loops run in $O(n^2)$ iterations, each computing `s.substring(j, i)` and hash lookup in $O(n)$ time. For $n \le 50$, $50^3 = 125,000$ operations, which finishes in under 5 ms.
- **Space Complexity:** `O(n + m \cdot L)` — `O(n)` space for the DP array `f`, plus `O(m \cdot L)` to store dictionary words in the `HashSet`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2707extra-characters-in-a-string.java](./2707extra-characters-in-a-string.java) |

---

## Key Learnings

- Prefix-based 1D dynamic programming is ideal for string word-break problems.
- Defaulting `f[i] = f[i - 1] + 1` elegantly handles non-matching 'extra' characters before checking for matching words.
- For larger constraints, replacing `HashSet` lookups with a Trie would reduce substring hashing overhead from $O(n^3)$ to $O(n^2)$.
