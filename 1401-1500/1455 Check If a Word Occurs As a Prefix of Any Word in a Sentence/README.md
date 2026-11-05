---
comments: true
difficulty: Easy
tags:
  - Two Pointers
  - String
  - String Matching
---

# 1455. Check If a Word Occurs As a Prefix of Any Word in a Sentence

**[View Problem on LeetCode](https://leetcode.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1455` (`1455`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Two Pointers`, `String`, `String Matching` |
| **Solution Language** | Java |

---

## Problem Description

Given a `sentence` that consists of words separated by a single space, and a string `searchWord`, check if `searchWord` is a prefix of any word in `sentence`.

Return the 1-indexed position of the first word in `sentence` where `searchWord` occurs as a prefix. If `searchWord` is not a prefix of any word in the sentence, return `-1`.

---

## Examples

### Example 1

```text
Input: sentence = "i love eating burger", searchWord = "burg"
Output: 4
Explanation: "burg" is prefix of "burger" which is the 4th word in the sentence.
```

### Example 2

```text
Input: sentence = "this problem is an easy problem", searchWord = "pro"
Output: 2
Explanation: "pro" is prefix of "problem" which is the 2nd and the 6th word in the sentence, but we return 2 as it's the minimal index.
```

### Example 3

```text
Input: sentence = "i am tired", searchWord = "you"
Output: -1
Explanation: "you" is not a prefix of any word in the sentence.
```

---

## Constraints

- `1 <= sentence.length <= 100`

- `1 <= searchWord.length <= 10`

- `sentence` consists of lowercase English letters and spaces.

- `searchWord` consists of lowercase English letters.

---

## Problem Understanding

Key observations:
- Words in `sentence` are delimited by a single space `' '`.
- Prefix check: word `W` has prefix `searchWord` if `W.startsWith(searchWord)`.
- The result must be 1-based (the first word has index 1).
- If multiple words match, we must return the index of the first occurrence.
- Constraints: `sentence.length <= 100`, `searchWord.length <= 10`.

---

## Approach

### Brute Force Approach

Manual two-pointer scanning through the sentence characters, counting spaces to track word indices, and comparing prefix characters with `searchWord`. While this saves string allocations, splitting the sentence by spaces is direct and completely optimal given `sentence.length <= 100`.

### Optimized Approach

Split `sentence` into an array of words using `sentence.split(" ")`. Iterate through the words using index `i` from `0` to `words.length - 1`. If `words[i].startsWith(searchWord)` is true, return `i + 1`. If no match is found after scanning all words, return `-1`.

### Step-by-Step Thinking Process

1. Split the input string `sentence` into individual words using the delimiter space `" "`.
2. Loop through the array of words from left to right.
3. For each word, test if it begins with `searchWord` via `startsWith()`.
4. Return `i + 1` immediately on the first match to satisfy the 1-based index and first-occurrence requirements.
5. Return `-1` if the loop concludes without finding a match.

### Algorithm / Intuition

The Java method `isPrefixOfWord(String sentence, String searchWord)`:
- `String[] words = sentence.split(" ");` creates an array of words.
- The loop `for (int i = 0; i < words.length; ++i)` checks each word.
- `if (words[i].startsWith(searchWord)) return i + 1;` returns the 1-based index on the first match.
- If no word matches, `return -1;`.

---

## Dry Run

Walkthrough on Example 1: `sentence = "i love eating burger"`, `searchWord = "burg"`.
- `words = ["i", "love", "eating", "burger"]`.
- `i = 0`: `words[0] = "i"`, `"i".startsWith("burg")` is `false`.
- `i = 1`: `words[1] = "love"`, `"love".startsWith("burg")` is `false`.
- `i = 2`: `words[2] = "eating"`, `"eating".startsWith("burg")` is `false`.
- `i = 3`: `words[3] = "burger"`, `"burger".startsWith("burg")` is `true`. Return `3 + 1 = 4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + m * k)` — Splitting the sentence of length `n` takes `O(n)` time. Checking prefix across `m` words with search word length `k` takes at most `O(m * k)` time. Total time is negligible for `n <= 100`.
- **Space Complexity:** `O(n)` — Storing the array of split words requires `O(n)` memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1455check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence.java](./1455check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence.java) |

---

## Key Learnings

- Java's `String.startsWith()` provides an efficient standard prefix check.
- Early return upon the first matching word directly resolves the tie-breaking condition.
