---
comments: true
difficulty: Easy
tags:
  - String
---

# 2490. Circular Sentence

**[View Problem on LeetCode](https://leetcode.com/problems/circular-sentence/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2490` (`2490`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String` |
| **Solution Language** | Java |

---

## Problem Description

A sentence is a list of words separated by single spaces with no leading or trailing spaces. Words consist of lowercase and uppercase English letters.

A sentence is **circular** if:
1. The last character of each word is equal to the first character of the next word.
2. The last character of the last word is equal to the first character of the first word.

Return `true` if the sentence is circular, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: sentence = "leetcode exercises sound delightful"
Output: true
Explanation: The words in sentence are ["leetcode", "exercises", "sound", "delightful"].
- leetcode's last character is equal to exercises's first character.
- exercises's last character is equal to sound's first character.
- sound's last character is equal to delightful's first character.
- delightful's last character is equal to leetcode's first character.
The sentence is circular.
```

### Example 2

```text
Input: sentence = "eetcode"
Output: true
Explanation: The words in sentence are ["eetcode"].
- eetcode's last character is equal to eetcode's first character.
The sentence is circular.
```

### Example 3

```text
Input: sentence = "Leetcode is cool"
Output: false
Explanation: The words in sentence are ["Leetcode", "is", "cool"].
- Leetcode's last character is not equal to is's first character.
The sentence is not circular.
```

---

## Constraints

- `1 <= sentence.length <= 500`

- `sentence` consist of only lowercase and uppercase English letters and spaces.

- The words in `sentence` are separated by a single space.

- There are no leading or trailing spaces.

---

## Problem Understanding

Let the sentence consist of words $w_0, w_1, \dots, w_{n-1}$. The sentence is circular if and only if for every index $i$ from $0$ to $n - 1$:

$$w_i[\text{last}] == w_{(i + 1) \% n}[\text{first}]$$

This wraps around circularly: the last word $w_{n-1}$ must connect back to the first word $w_0$. Case sensitivity matters ('a' != 'A'). If any condition fails, the result is `false`.

---

## Approach

### Brute Force Approach

Splitting the sentence into words and checking adjacent word boundary characters sequentially takes linear time $O(L)$, where $L$ is the length of the string. Since $L \le 500$, this approach is already completely optimal.

### Optimized Approach

Split the input string `sentence` by space into an array of words `ss`. Iterate $i$ from $0$ to $n - 1$ and check if the character at `ss[i].length() - 1` equals the first character of `ss[(i + 1) % n]`. If any comparison fails, return `false`; otherwise return `true`.

### Step-by-Step Thinking Process

1. Split `sentence` into individual words using `sentence.split(" ")`.
2. Determine the number of words $n = ss.length$.
3. Use modulo arithmetic `(i + 1) % n` to cleanly link the last word back to index 0.
4. For each word $i$, check `ss[i].charAt(ss[i].length() - 1) == ss[(i + 1) % n].charAt(0)`.
5. If any pair doesn't match, return `false` immediately. If all match, return `true`.

### Algorithm / Intuition

In the provided Java solution:

1. `var ss = sentence.split(" ")` splits the string into word tokens.
2. The loop runs for $i = 0$ to $n - 1$.
3. At each step, `ss[i].charAt(ss[i].length() - 1)` extracts the ending character of word $i$, and `ss[(i + 1) % n].charAt(0)` extracts the starting character of the next word (wrapping around to word 0 when $i = n - 1$).
4. If they differ, `return false`. If the loop completes without mismatches, `return true`.

---

## Dry Run

Consider Example 1: `sentence = "leetcode exercises sound delightful"`

1. Words: `ss = ["leetcode", "exercises", "sound", "delightful"]`, $n = 4$.
2. $i = 0$: `"leetcode"` ends in `'e'`, `"exercises"` starts with `'e'`. Match ('e' == 'e').
3. $i = 1$: `"exercises"` ends in `'s'`, `"sound"` starts with `'s'`. Match ('s' == 's').
4. $i = 2$: `"sound"` ends in `'d'`, `"delightful"` starts with `'d'`. Match ('d' == 'd').
5. $i = 3$: `"delightful"` ends in `'l'`, `"leetcode"` (index $(3+1)\%4 = 0$) starts with `'l'`. Match ('l' == 'l').

Final Return: `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(L)` — Splitting the sentence of length $L$ into words takes $O(L)$ time, and iterating over the $n$ words checks boundary characters in $O(n)$ where $n \le L$.
- **Space Complexity:** `O(L)` — Storing the array of word strings `ss` uses memory proportional to the input length $L$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2490circular-sentence.java](./2490circular-sentence.java) |

---

## Key Learnings

- Circular ring conditions are cleanly expressed using modular indexing `(i + 1) % n`.
- String splitting simplifies token-level character validation problems.
- Early exit on the first mismatch optimizes best-case and average-case execution.
