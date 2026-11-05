---
comments: true
difficulty: Easy
tags:
  - String
  - Stack
  - Simulation
---

# 2696. Minimum String Length After Removing Substrings

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-string-length-after-removing-substrings/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2696` (`2696`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String`, `Stack`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

You are given a string `s` consisting only of uppercase English letters.

You can apply an operation any number of times where you remove **any** occurrence of either substring `"AB"` or `"CD"` from `s`.

Return the **minimum possible length** of the resulting string after performing all possible removals.

---

## Examples

### Example 1

```text
Input: s = "ABFCACDB"
Output: 2
Explanation: We can do the following operations:
- Remove the substring "ABFCACDB", so s = "FCACDB".
- Remove the substring "FCACDB", so s = "FCAB".
- Remove the substring "FCAB", so s = "FC".
So the resulting length of the string is 2.
It can be shown that it is the minimum length that we can obtain.
```

### Example 2

```text
Input: s = "ACBBD"
Output: 5
Explanation: We cannot do any operations on the string so the length remains the same.
```

---

## Constraints

- `1 <= s.length <= 100`

- `s` consists only of uppercase English letters.

---

## Problem Understanding

Removing substrings can create new adjacent matching substrings that were not adjacent before.

For example, in `"ACDB"`, removing `"CD"` leaves `"AB"`, which can then also be removed to yield an empty string `""`.

Key properties:
- The order in which operations are applied does not affect the final minimal length (all valid reduction sequences yield the same set of remaining characters).
- This problem is isomorphic to valid parentheses matching, where `'A'` matches `'B'` and `'C'` matches `'D'`.
- A stack allows immediate detection and removal of newly adjacent pairs in a single linear pass.

---

## Approach

### Brute Force Approach

A brute force approach would repeatedly search the string for `"AB"` or `"CD"` using string replacement: `s = s.replace("AB", "").replace("CD", "")` in a loop until no more changes occur.

In each iteration, string replacement creates a new string in `O(n)` time. Since up to `n / 2` pairs can be removed, this takes `O(n^2)` time in the worst case (e.g. `"AAAA...BBBB"`).

### Optimized Approach

The optimal approach uses a `Stack<Character>` to process the string in a single linear pass `O(n)`.

Traverse each character `ch` of `s`:
1. If `stack` is not empty:
   - If `ch == 'B'` and `stack.peek() == 'A'`, pop `'A'` (removes `"AB"`).
   - If `ch == 'D'` and `stack.peek() == 'C'`, pop `'C'` (removes `"CD"`).
   - Otherwise, push `ch` onto the stack.
2. If `stack` is empty, push `ch`.
3. At the end, return `stack.size()`.

### Step-by-Step Thinking Process

1. We want to repeatedly remove `"AB"` and `"CD"` until none remain.
2. Removing a pair brings its left and right neighbors adjacent to each other.
3. This LIFO (Last-In-First-Out) neighbor adjacency is the classic signature of a Stack.
4. Iterate through each character of `s`.
5. If the current character is `'B'` and top of stack is `'A'`, they cancel out -> pop `'A'`.
6. If the current character is `'D'` and top of stack is `'C'`, they cancel out -> pop `'C'`.
7. Otherwise, push the character onto the stack.
8. The remaining characters in the stack cannot form any more pairs; its size is the answer.

### Algorithm / Intuition

The stack simulates greedy substring cancellation in a single scan:

1. `Stack<Character> stack = new Stack<>()` holds uncancelled characters.
2. For each `ch` at index `i`:
   - If the stack is empty, `stack.push(ch)`.
   - If `ch == 'B'` and `stack.peek() == 'A'`, the pair `"AB"` is formed. Popping `'A'` cancels both `'A'` and `'B'` simultaneously.
   - If `ch == 'D'` and `stack.peek() == 'C'`, the pair `"CD"` is formed. Popping `'C'` cancels both `'C'` and `'D'` simultaneously.
   - Otherwise, `ch` cannot be cancelled by the previous character, so `stack.push(ch)` adds it to the candidate pool.
3. After scanning all `n` characters, all reducible pairs have been cancelled. The minimum string length is `stack.size()`.

---

## Dry Run

Trace for `s = "ABFCACDB"`:

- `stack = []`.
- **i = 0 ('A'):** Stack is empty -> `push('A')`. Stack: `['A']`.
- **i = 1 ('B'):** `ch == 'B'` and `peek() == 'A'` -> `pop('A')`. Stack: `[]`.
- **i = 2 ('F'):** Stack is empty -> `push('F')`. Stack: `['F']`.
- **i = 3 ('C'):** Top is `'F'`. No pair -> `push('C')`. Stack: `['F', 'C']`.
- **i = 4 ('A'):** Top is `'C'`. No pair -> `push('A')`. Stack: `['F', 'C', 'A']`.
- **i = 5 ('C'):** Top is `'A'`. No pair -> `push('C')`. Stack: `['F', 'C', 'A', 'C']`.
- **i = 6 ('D'):** `ch == 'D'` and `peek() == 'C'` -> `pop('C')`. Stack: `['F', 'C', 'A']`.
- **i = 7 ('B'):** `ch == 'B'` and `peek() == 'A'` -> `pop('A')`. Stack: `['F', 'C']`.
- Loop ends.
- Final stack: `['F', 'C']`.
- **Return:** `stack.size() = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Where `n` is `s.length()`. We iterate through the string once, performing `O(1)` push or pop operations per character.
- **Space Complexity:** `O(n)` — In the worst case where no characters can be removed, the stack stores all `n` characters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2696minimum-string-length-after-removing-substrings.java](./2696minimum-string-length-after-removing-substrings.java) |

---

## Key Learnings

- Substring elimination where deletions cascade into new adjacent pairs is efficiently solved with a Stack in `O(n)` time.
- Checking `stack.peek()` against the incoming character simulates in-place pair cancellation without string re-allocation.
- The final stack size directly represents the reduced string length without reconstructing the string.
