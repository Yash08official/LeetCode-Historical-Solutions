---
comments: true
difficulty: Hard
tags:
  - Array
  - String
  - Dynamic Programming
---

# 1639. Number of Ways to Form a Target String Given a Dictionary

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-ways-to-form-a-target-string-given-a-dictionary/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1639` (`1639`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array of equal-length strings `words` and a target string `target`.

Your task is to form `target` from left to right using characters from the strings in `words`. To form the $i$-th character of `target`, you can choose character at index $k$ of any word in `words` such that `words[j][k] == target[i]`. Once index $k$ is used, all indices $\le k$ become unusable for subsequent characters across all words.

Return the total number of ways to construct `target` modulo $10^9 + 7$.

---

## Examples

### Example 1

```text
Input: words = ["acca","bbbb","caca"], target = "aba"
Output: 6
Explanation: There are 6 ways to form target.
"aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("caca")
"aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("caca")
"aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("acca")
"aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("acca")
"aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("acca")
"aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("caca")
```

### Example 2

```text
Input: words = ["abba","baab"], target = "bab"
Output: 4
Explanation: There are 4 ways to form target.
"bab" -> index 0 ("baab"), index 1 ("baab"), index 2 ("abba")
"bab" -> index 0 ("baab"), index 1 ("baab"), index 3 ("baab")
"bab" -> index 0 ("baab"), index 2 ("baab"), index 3 ("baab")
"bab" -> index 1 ("abba"), index 2 ("baab"), index 3 ("baab")
```

---

## Constraints

- `1 <= words.length <= 1000`

- `1 <= words[i].length <= 1000`

- All strings in `words` have the same length.

- `1 <= target.length <= 1000`

- `words[i]` and `target` contain only lowercase English letters.

---

## Problem Understanding

Let $n$ be the length of each word in `words`, and $m$ be the length of `target`.
We must pick $m$ column indices $0 \le k_0 < k_1 < \dots < k_{m-1} < n$ such that at column $k_i$, at least one word has `target[i]`.
Crucially, the choice of word at column $k$ does not depend on which specific word was chosen at column $k-1$; only the column index matters!
Therefore, all words can be summarized column-by-column: `cnt[k][ch]` is the number of words having character `ch` at index $k$.
If we pick column $k$ to match `target[i]`, there are `cnt[k][target[i]]` independent choices.

---

## Approach

### Brute Force Approach

A naive brute-force recursion considers every combination of matching words and indices directly without column frequency precomputation. Because each of the $m$ characters can potentially choose from up to $1000$ words across $1000$ columns, the search tree has size $O(\binom{n}{m} \times |words|^m)$, which blows up astronomically.

### Optimized Approach

Precompute character frequencies per column in `cnt[n][26]`. Then define DP state `dfs(i, j)`: the number of ways to form the suffix `target[i..m-1]` using available columns $j \dots n-1$. At state `(i, j)`, we either skip column $j$ (`dfs(i, j + 1)`) or use column $j$ to match `target[i]` (`dfs(i + 1, j + 1) * cnt[j][target[i] - 'a']`). Memoize results in `f[m][n]` modulo $10^9 + 7$.

### Step-by-Step Thinking Process

1. Notice that the exact word chosen at column $k$ has zero impact on future choices; only the column index $k$ advances strictly forward.
2. Precompute `cnt[j][c]`, counting how many words have character `c` at column $j$. This takes $O(|words| \times n)$.
3. Formulate the recursive relation `dfs(i, j)` where $i$ is the target index ($0 \le i \le m$) and $j$ is the words column index ($0 \le j \le n$).
4. Base cases: if $i == m$, the target is fully formed -> return 1. If $j == n$ (and $i < m$), run out of columns -> return 0.
5. Transition: Option 1 is skip column $j$: `dfs(i, j + 1)`. Option 2 (if `cnt[j][target[i]] > 0`) is use column $j$: `dfs(i + 1, j + 1) * cnt[j][target[i]]`.
6. Memoize with `Integer[][] f` of dimension $m \times n$, taking all sums modulo $10^9 + 7$.

### Algorithm / Intuition

The Java solution initializes `cnt = new int[n][26]` and populates column character frequencies in an initial pass. The memoization table `f = new Integer[m][n]` caches results for subproblems `(i, j)`. Inside `dfs(i, j)`, `ans` accumulates `dfs(i, j + 1)` (skipping the current column) plus `1L * dfs(i + 1, j + 1) * cnt[j][target.charAt(i) - 'a']` (consuming column $j$ for character `target[i]`). Multiplication uses `1L` to prevent integer overflow before taking `% mod`. Because each state `(i, j)` is computed once, the total number of subproblems is $m \times n$.

---

## Dry Run

Let's trace Example 1: `words = ["acca","bbbb","caca"]`, `target = "aba"`. $m = 3, n = 4$.
- Precompute column counts `cnt` for length 4:
  - Col 0: 'a': 1, 'b': 1, 'c': 1
  - Col 1: 'c': 1, 'b': 1, 'a': 1 -> 'b': 1, 'a': 1
  - Col 2: 'c': 2, 'b': 1
  - Col 3: 'a': 2, 'b': 1
- Target is 'a', 'b', 'a':
  - To form target, we need 3 strictly increasing columns $(k_0, k_1, k_2)$ matching 'a', 'b', 'a'.
  - Ways with columns (0, 1, 3): `cnt[0]['a'] * cnt[1]['b'] * cnt[3]['a'] = 1 * 1 * 2 = 2` ways.
  - Ways with columns (0, 2, 3): `cnt[0]['a'] * cnt[2]['b'] * cnt[3]['a'] = 1 * 1 * 2 = 2` ways.
  - Ways with columns (1, 2, 3): `cnt[1]['a'] * cnt[2]['b'] * cnt[3]['a'] = 1 * 1 * 2 = 2` ways.
- Total ways = $2 + 2 + 2 = 6$.
`dfs(0, 0)` computes this systematically with memoization and returns 6.

---

## Complexity Analysis

- **Time Complexity:** `O(W * n + m * n)` where `W` is the number of words, `n` is the length of each word, and `m` is the length of `target`. Frequency counting takes `O(W * n)`, and the DP has `m * n` states with `O(1)` work per state.
- **Space Complexity:** `O(m * n + 26 * n)` for the memoization table `f`, frequency matrix `cnt`, and recursion call stack of depth $O(m + n)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1639number-of-ways-to-form-a-target-string-given-a-dictionary.java](./1639number-of-ways-to-form-a-target-string-given-a-dictionary.java) |

---

## Key Learnings

- Independent column frequency aggregation collapses multi-string choices into a 2D dynamic programming problem.
- Strictly increasing index constraints map naturally to the classic 'skip or take' DP paradigm.
- Always promote intermediate multiplication products to 64-bit integers (`1L * ...`) before taking modulo to avoid overflow.
