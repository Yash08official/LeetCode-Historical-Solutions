---
comments: true
difficulty: Medium
tags:
  - String
  - Dynamic Programming
---

# 97. Interleaving String

**[View Problem on LeetCode](https://leetcode.com/problems/interleaving-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0097` (`97`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given three strings `s1`, `s2`, and `s3`, determine whether `s3` can be formed by **interleaving** the characters of `s1` and `s2`.

Interleaving `s1` and `s2` means merging all characters from both strings into a single sequence of length `s1.length + s2.length` while preserving the relative left-to-right order of characters from `s1` and the relative left-to-right order of characters from `s2`.

---

## Examples

### Example 1

```text
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Explanation: One way to obtain s3 is:
Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
Since s3 can be obtained by interleaving s1 and s2, we return true.
```

### Example 2

```text
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
Explanation: Notice how it is impossible to interleave s2 with any other string to obtain s3.
```

### Example 3

```text
Input: s1 = "", s2 = "", s3 = ""
Output: true
```

---

## Constraints

- `0 <= s1.length, s2.length <= 100`

- `0 <= s3.length <= 200`

- `s1`, `s2`, and `s3` consist of lowercase English letters.

---

## Follow-up Questions

Could you solve it using only `O(s2.length)` additional memory space?

While the current top-down memoized solution uses `O(m * n)` space, we can achieve the follow-up's **`O(s2.length)` (`O(n)`)** space bound using bottom-up 1D DP: allocate `boolean[] dp = new boolean[n + 1]` where `dp[j]` represents whether `s1[0..i-1]` and `s2[0..j-1]` form `s3[0..i+j-1]`, updating `dp[j] = (dp[j] && s1.charAt(i - 1) == s3.charAt(i + j - 1)) || (dp[j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1))` row by row.

---

## Problem Understanding

- Note on the problem statement's `|n - m| <= 1` condition: because adjacent chunks from the same string can always be concatenated into a single chunk, alternating chunks automatically satisfy `|n - m| <= 1`. So the problem simply asks whether `s3` is an order-preserving merge of all characters in `s1` and `s2`!
- Necessary precondition: `s1.length() + s2.length()` **must** equal `s3.length()`; otherwise `false` immediately.
- At any point after consuming `i` characters from `s1` and `j` characters from `s2`, the index in `s3` we must match next is uniquely determined as `k = i + j` — we do not need `k` as a third DP dimension!

---

## Approach

### Brute Force Approach

Whenever `s1[i] == s3[i + j]` and `s2[j] == s3[i + j]` both hold (for example `s1 = "aaa..."`, `s2 = "aaa..."`), naive recursion branches two ways without caching visited `(i, j)` pairs, leading to `O(2^(m + n))` time complexity that times out for `m, n <= 100`.

### Optimized Approach

Use top-down Depth-First Search `dfs(i, j)` memoized with a `HashMap<List<Integer>, Boolean> f`, checking whether `s1[i]` or `s2[j]` matches `s3[i + j]` in `O(m * n)` time.

### Step-by-Step Thinking Process

1. Verify `m + n == s3.length()` first; if not, `s3` has the wrong total number of characters, so return `false`.
2. Define recursive state `dfs(i, j)` as whether suffixes `s1[i..m-1]` and `s2[j..n-1]` can interleave to form `s3[i+j .. m+n-1]`.
3. Base case: when `i >= m && j >= n`, all characters of `s1`, `s2`, and `s3` have been matched, so return `true`.
4. Memoize `(i, j)` using `var key = List.of(i, j)` in map `f` so each `(i, j)` pair is solved at most once.
5. Let `k = i + j`. Try consuming `s1.charAt(i)` if `i < m && s1.charAt(i) == s3.charAt(k)`, and if that fails (`!ans`), try consuming `s2.charAt(j)` if `j < n && s2.charAt(j) == s3.charAt(k)`.

### Algorithm / Intuition

In `Solution`, `isInterleave` stores `s1`, `s2`, `s3` and lengths `m`, `n` as instance fields after checking `m + n != s3.length()`.

Inside `dfs(int i, int j)`:
- `if (i >= m && j >= n) return true;` handles reaching the ends of both strings simultaneously.
- `var key = List.of(i, j);` builds an immutable 2-element list (which implements value-based `equals` and `hashCode` in Java) to look up cached results in `f`.
- `int k = i + j;` computes the exact position in `s3` corresponding to `(i, j)`.
- If `s1.charAt(i)` matches `s3.charAt(k)` and `dfs(i + 1, j)` succeeds, `ans` becomes `true` and the `!ans` guard skips the second recursive branch. Otherwise it tests `s2.charAt(j) == s3.charAt(k) && dfs(i, j + 1)`, caches `f.put(key, ans)`, and returns `ans`.

---

## Dry Run

Tracing Example 1 with `s1 = "aabcc"` (`m = 5`), `s2 = "dbbca"` (`n = 5`), `s3 = "aadbbcbcac"` (length `10 == 5 + 5`):

1. `dfs(0, 0)` (`k = 0`, `s3[0] = 'a'`): `s1[0] == 'a'` -> `dfs(1, 0)`
2. `dfs(1, 0)` (`k = 1`, `s3[1] = 'a'`): `s1[1] == 'a'` -> `dfs(2, 0)`
3. `dfs(2, 0)` (`k = 2`, `s3[2] = 'd'`): `s1[2] = 'b' != 'd'`, tries `s2[0] == 'd'` -> `dfs(2, 1)`
4. `dfs(2, 1)` (`k = 3`, `s3[3] = 'b'`): both `s1[2]` and `s2[1]` are `'b'`!
   - First tries `s1`: `dfs(3, 1)` (`s3[4]='b'`, `s2[1]='b'`) -> `dfs(3, 2)` (`s3[5]='c'`, `s1[3]='c'`) -> `dfs(4, 2)` (`s3[6]='b'`, `s2[2]='b'`) -> `dfs(4, 3)` (`s3[7]='c'`, `s1[4]='c'`) -> `dfs(5, 3)` (`s3[8]='a'`, `s2[3]='c' != 'a'` -> `false`!), backtracks and tries `s2[3]='c'` at `dfs(4, 3)` -> `dfs(4, 4)` (`s3[8]='a'`, `s2[4]='a'`) -> `dfs(4, 5)` (`s3[9]='c'`, `s1[4]='c'`) -> `dfs(5, 5)`!
5. `dfs(5, 5)`: `i >= 5 && j >= 5` returns `true`, unwinding `true` all the way back to `dfs(0, 0)`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — There are `(m + 1) * (n + 1)` possible `(i, j)` states, and each state performs `O(1)` character comparisons and hash map operations.
- **Space Complexity:** `O(m * n)` — The memoization map `f` stores up to `(m + 1) * (n + 1)` `List<Integer>` keys, and the recursion stack reaches depth `m + n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [97interleaving-string.java](./97interleaving-string.java) |

---

## Key Learnings

- Eliminating redundant state parameters (`k = i + j` instead of `(i, j, k)`) shrinks the state space from `O(m * n * (m + n))` down to `O(m * n)`.
- Java's `List.of(i, j)` provides a quick value-based composite key for `HashMap`, though `Boolean[][] memo = new Boolean[m + 1][n + 1]` avoids object allocation and hashing overhead in performance-critical code.
- Checking `!ans` before exploring the second choice short-circuits unnecessary search subtrees as soon as a valid interleaving path is discovered.
