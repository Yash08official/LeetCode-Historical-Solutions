---
comments: true
difficulty: Hard
tags:
  - Depth-First Search
  - Graph Theory
  - Eulerian Circuit
---

# 753. Cracking the Safe

**[View Problem on LeetCode](https://leetcode.com/problems/cracking-the-safe/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0753` (`753`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Depth-First Search`, `Graph Theory`, `Eulerian Circuit` |
| **Solution Language** | Java |

---

## Problem Description

There is a safe protected by a password. The password is a sequence of n digits where each digit can be in the range [0, k - 1].

The safe has a peculiar way of checking the password. When you enter in a sequence, it checks the most recent n digits that were entered each time you type a digit.


	For example, the correct password is "345" and you enter in "012345":

	
		After typing 0, the most recent 3 digits is "0", which is incorrect.
		After typing 1, the most recent 3 digits is "01", which is incorrect.
		After typing 2, the most recent 3 digits is "012", which is incorrect.
		After typing 3, the most recent 3 digits is "123", which is incorrect.
		After typing 4, the most recent 3 digits is "234", which is incorrect.
		After typing 5, the most recent 3 digits is "345", which is correct and the safe unlocks.
	
	


Return any string of minimum length that will unlock the safe at some point of entering it.

 
Example 1:


Input: n = 1, k = 2
Output: "10"
Explanation: The password is a single digit, so enter each digit. "01" would also unlock the safe.


Example 2:


Input: n = 2, k = 2
Output: "01100"
Explanation: For each possible password:
- "00" is typed in starting from the 4th digit.
- "01" is typed in starting from the 1st digit.
- "10" is typed in starting from the 3rd digit.
- "11" is typed in starting from the 2nd digit.
Thus "01100" will unlock the safe. "10011", and "11001" would also unlock the safe.


 
Constraints:


	1 <= n <= 4
	1 <= k <= 10
	1 <= kn <= 4096

---

## Problem Understanding

- We seek the shortest string containing all $k^n$ possible passwords of length $n$ with alphabet $0..k-1$.
- This is the construction of a **De Bruijn sequence** $B(k, n)$.
- We model states as strings of length $n-1$. An edge represents appending a digit $x \in [0, k-1]$ to form an $n$-length password and transitioning to state $(u \times 10 + x) \pmod{10^{n-1}}$.
- An Eulerian circuit traversing every edge visits every password exactly once.

---

## Approach

### Optimized Approach (Hierholzer's Algorithm / Post-Order DFS for De Bruijn Sequence)

1. Let `mod = 10^(n - 1)`.
2. Perform DFS from state $0$:
   - For each outgoing transition $x \in [0, k-1]$:
     - Edge ID: $e = u \times 10 + x$.
     - If edge $e$ is unvisited: mark visited, recurse to target vertex $v = e \pmod{mod}$, then append digit $x$ to result.
3. Finally append $(n - 1)$ zeros for the starting prefix.
4. Total string length is $k^n + n - 1$.

---

## Dry Run

For `n = 2, k = 2`:
Passwords: `"00"`, `"01"`, `"10"`, `"11"`. Total length: $2^2 + 2 - 1 = 5$.
DFS visits edges, producing post-order sequence ending with `"0"`, yielding `"01100"` or `"00110"`.

---

## Complexity Analysis

- **Time Complexity:** $O(k^n)$ — Visits every edge in the De Bruijn graph exactly once.
- **Space Complexity:** $O(k^n)$ — Visited edge set and recursion stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [753cracking-the-safe.java](./753cracking-the-safe.java) |

---

## Key Learnings

- Finding shortest superstrings over fixed-length alphabets directly maps to Eulerian paths on De Bruijn digraphs.
- Post-order traversal in Hierholzer's algorithm guarantees visiting all cycles without getting trapped.
