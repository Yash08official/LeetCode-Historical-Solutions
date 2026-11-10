---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - Math
  - Binary Search
  - Sorting
  - Randomized
---

# 710. Random Pick with Blacklist

**[View Problem on LeetCode](https://leetcode.com/problems/random-pick-with-blacklist/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0710` (`710`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `Math`, `Binary Search`, `Sorting`, `Randomized` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer `n` and an array of **unique** integers `blacklist`. Design an algorithm to pick a random integer in the range `[0, n - 1]` that is **not** in `blacklist`. Any integer that is in the mentioned range and not in `blacklist` should be **equally likely** to be returned.

Optimize your algorithm such that it minimizes the number of calls to the built-in random function of your language.

Implement the `Solution` class:

- `Solution(int n, int[] blacklist)` Initializes the object with the integer `n` and the blacklisted integers `blacklist`.
- `int pick()` Returns a random integer in the range `[0, n - 1]` and not in `blacklist`.

---

## Examples

### Example 1

```text
Input
["Solution", "pick", "pick", "pick", "pick", "pick", "pick", "pick"]
[[7, [2, 3, 5]], [], [], [], [], [], [], []]
Output
[null, 0, 4, 1, 6, 1, 0, 4]

Explanation
Solution solution = new Solution(7, [2, 3, 5]);
solution.pick(); // return 0, any integer from [0,1,4,6] should be ok and equally likely
solution.pick(); // return 4
solution.pick(); // return 1
solution.pick(); // return 6
solution.pick(); // return 1
solution.pick(); // return 0
solution.pick(); // return 4
```

---

## Constraints

- `1 <= n <= 10^9`
- `0 <= blacklist.length <= min(10^5, n - 1)`
- `0 <= blacklist[i] < n`
- All the values of `blacklist` are **unique**.
- At most `2 * 10^4` calls will be made to `pick`.

---

## Problem Understanding

- Total valid numbers available: $k = n - |blacklist|$.
- To sample uniformly with minimal random calls, we should draw a random integer $x \in [0, k - 1]$.
- If $x$ is not blacklisted, return $x$.
- If $x$ is blacklisted, we must remap $x$ to an available, non-blacklisted number in the upper range $[k, n - 1]$.

---

## Approach

### Optimized Approach (Virtual Remapping via Hash Map)

1. Compute $k = n - |blacklist|$.
2. Store all blacklist elements in a hash set `black`.
3. Set pointer `i = k`.
4. For each blacklisted number $b < k$:
   - Advance `i` while `black.contains(i)`.
   - Remap: `d.put(b, i++)`.
5. In `pick()`:
   - Generate random index $x = \text{rand.nextInt}(k)$.
   - Return `d.getOrDefault(x, x)`.

---

## Complexity Analysis

- **Time Complexity:**
  - Initialization: $O(B)$ where $B = |blacklist|$. Each blacklist element is processed once, and pointer `i` advances at most $B$ times.
  - `pick()`: $O(1)$ — One random number generation and one hash map lookup.
- **Space Complexity:** $O(B)$ — Hash map and set store at most $B$ elements.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [710random-pick-with-blacklist.java](./710random-pick-with-blacklist.java) |

---

## Key Learnings

- Virtual remapping maps the problem onto an ideal compact interval $[0, k - 1]$, ensuring exactly 1 random call per `pick()` invocation.
- Only blacklisted elements strictly less than $k$ need remapping, bounding memory strictly by $O(B)$.
