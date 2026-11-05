---
comments: true
difficulty: Hard
tags:
  - Array
  - String
  - Trie
  - Counting
---

# 2416. Sum of Prefix Scores of Strings

**[View Problem on LeetCode](https://leetcode.com/problems/sum-of-prefix-scores-of-strings/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2416` (`2416`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `String`, `Trie`, `Counting` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an array of non-empty strings `words`.

The **score** of any string prefix is defined as the number of strings in `words` that start with that prefix. For each string `words[i]`, you need to calculate the sum of the scores of all its non-empty prefixes (including the string itself as a prefix).

Return an array `answer` of the same length, where `answer[i]` is the total prefix score sum for `words[i]`.

---

## Examples

### Example 1

```text
Input: words = ["abc","ab","bc","b"]
Output: [5,4,3,2]
Explanation: The answer for each string is the following:
- "abc" has 3 prefixes: "a", "ab", and "abc".
- There are 2 strings with the prefix "a", 2 strings with the prefix "ab", and 1 string with the prefix "abc".
The total is answer[0] = 2 + 2 + 1 = 5.
- "ab" has 2 prefixes: "a" and "ab".
- There are 2 strings with the prefix "a", and 2 strings with the prefix "ab".
The total is answer[1] = 2 + 2 = 4.
- "bc" has 2 prefixes: "b" and "bc".
- There are 2 strings with the prefix "b", and 1 string with the prefix "bc".
The total is answer[2] = 2 + 1 = 3.
- "b" has 1 prefix: "b".
- There are 2 strings with the prefix "b".
The total is answer[3] = 2.
```

### Example 2

```text
Input: words = ["abcd"]
Output: [4]
Explanation:
"abcd" has 4 prefixes: "a", "ab", "abc", and "abcd".
Each prefix has a score of one, so the total is answer[0] = 1 + 1 + 1 + 1 = 4.
```

---

## Constraints

- `1 <= words.length <= 1000`

- `1 <= words[i].length <= 1000`

- `words[i]` consists of lowercase English letters.

---

## Problem Understanding

Each word of length $L$ has exactly $L$ non-empty prefixes. If we independently evaluated the frequency of every prefix across all words, a brute-force search would be computationally prohibitive because the total number of characters across `words` can be up to $10^6$ ($1000$ words of length up to $1000$). Instead, multiple words share identical prefixes. A Trie (prefix tree) naturally captures shared prefixes: as we insert each character of a word, each node corresponds to a unique prefix, and keeping a counter `cnt` at each node tracks how many words pass through that prefix.

---

## Approach

### Brute Force Approach

A naive solution generates all prefixes of each word and counts how many words in `words` start with each prefix using string matching or prefix comparisons. For a word of length $L$, generating all prefixes takes $O(L^2)$ time. Comparing against all $N$ words takes $O(N \cdot L^2)$ per word, leading to an overall time complexity of $O(N^2 \cdot L^2)$. With $N = 1000$ and $L = 1000$, $N^2 L^2 \approx 10^{12}$, which results in a Time Limit Exceeded (TLE).

### Optimized Approach

Construct a Trie where each node maintains a hash map of `children` and a visitor counter `cnt`. First, insert all words into the Trie, incrementing `cnt` at each traversed character node. Second, query each word by walking down the Trie and summing the `cnt` values along its path.

### Step-by-Step Thinking Process

1. Recognize that the score of a prefix is the number of words that share that prefix, which is equivalent to counting node visit frequencies in a prefix tree.
2. Design a `Trie` class where each node contains a dictionary `children` and an integer `cnt` indicating how many words share the prefix ending at that node.
3. Implement `insert(w)`: traverse the Trie character by character, create missing nodes, and increment `node.cnt++` at each visited node.
4. Implement `search(w)`: walk the Trie following the characters of `w`, accumulating `ans += node.cnt` at each step, and return `ans`.
5. Map over `words` using `words.map(w => trie.search(w))` to produce the output array in linear time proportional to the total characters.

### Algorithm / Intuition

In the provided JavaScript implementation, the `Trie` class uses an object `this.children = {}` for child pointers and `this.cnt = 0` to count how many words pass through the prefix represented by that node.

1. During insertion (`insert(w)`), for every character `c` in word `w`, the pointer advances to `node.children[c]` (instantiating a new `Trie` node if undefined) and increments `node.cnt++`. When all words are inserted, every node's `cnt` equals the exact number of words containing that prefix.
2. During scoring (`search(w)`), the pointer traverses the exact path for word `w` from the root, accumulating `ans += node.cnt` at each character. Since each step corresponds to a prefix of `w` of increasing length, `ans` collects the sum of prefix scores directly.
3. Finally, `sumPrefixScores` builds the Trie over all `words` and evaluates each word via `trie.search(w)`.

---

## Dry Run

Consider Example 1: `words = ["abc", "ab", "bc", "b"]`

1. **Trie Insertion**:
   - Insert `"abc"`: Root -> 'a' (cnt=1) -> 'b' (cnt=1) -> 'c' (cnt=1).
   - Insert `"ab"`: Root -> 'a' (cnt=2) -> 'b' (cnt=2).
   - Insert `"bc"`: Root -> 'b' (cnt=1) -> 'c' (cnt=1).
   - Insert `"b"`: Root -> 'b' (cnt=2).

2. **Search / Scoring**:
   - For `"abc"`: 'a' (cnt=2) + 'b' (cnt=2) + 'c' (cnt=1) = `5`.
   - For `"ab"`: 'a' (cnt=2) + 'b' (cnt=2) = `4`.
   - For `"bc"`: 'b' (cnt=2) + 'c' (cnt=1) = `3`.
   - For `"b"`: 'b' (cnt=2) = `2`.

Result: `[5, 4, 3, 2]`.

---

## Complexity Analysis

- **Time Complexity:** `O(\sum |words[i]|)` — Inserting all strings takes time proportional to the total number of characters across all words, and querying each string traverses its characters once. If $N$ is the number of words and $L$ is the maximum word length, the total runtime is $O(N \cdot L)$.
- **Space Complexity:** `O(\sum |words[i]|)` — In the worst case where no words share prefixes, the Trie stores at most one node per character across all words.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2416sum-of-prefix-scores-of-strings.js](./2416sum-of-prefix-scores-of-strings.js) |

---

## Key Learnings

- A Trie is ideal for tracking prefix frequency across a collection of strings in linear time.
- Augmenting Trie nodes with a simple visit counter (`cnt`) avoids redundant subproblem recomputation.
- Using JavaScript plain objects (`{}`) as child mappings provides flexible character branching without fixed alphabet arrays.
