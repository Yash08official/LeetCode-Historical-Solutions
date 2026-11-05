---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Sliding Window
---

# 2260. Minimum Consecutive Cards to Pick Up

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-consecutive-cards-to-pick-up/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2260` (`2260`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `cards`, where `cards[i]` is the value of the `i`-th card in a row. Two cards **match** if they have the exact same value.

Return the **minimum** number of **consecutive** cards (i.e., shortest contiguous subarray length) you must pick up so that your hand contains at least one matching pair of cards. If all cards are distinct, return `-1`.

---

## Examples

### Example 1

```text
Input: cards = [3,4,2,3,4,7]
Output: 4
Explanation: We can pick up the cards [3,4,2,3] which contain a matching pair of cards with value 3. Note that picking up the cards [4,2,3,4] is also optimal.
```

### Example 2

```text
Input: cards = [1,0,5,3]
Output: -1
Explanation: There is no way to pick up a set of consecutive cards that contain a pair of matching cards.
```

---

## Constraints

- `1 <= cards.length <= 10^5`

- `0 <= cards[i] <= 10^6`

---

## Problem Understanding

- **Shortest Subarray With Duplicate == Closest Adjacent Occurrences:** Any contiguous subarray containing two matching cards at indices `L` and `R` (`L < R`, `cards[L] == cards[R]`) has length at least `R - L + 1`, and picking `[L..R]` itself achieves length `R - L + 1`.
- **Only Consecutive Occurrences Matter:** If value `v` appears at indices `i_1 < i_2 < i_3`, we never need to check `(i_1, i_3)` because `(i_2, i_3)` (and `(i_1, i_2)`) is strictly shorter! Thus, as we scan `i` from left to right, we only need to remember the **most recent** index where each card value appeared.

---

## Approach

### Brute Force Approach

Checking every starting index `i` and expanding `j` rightward until `cards[j] == cards[i]` inspects up to `O(n)` elements for each of `n` indices, taking `O(n^2)` worst-case time (`~10^{10}` operations when `n = 10^5` and all cards are distinct).

### Optimized Approach

Scan `cards` once from left to right while maintaining a `HashMap<Integer, Integer> last` mapping each card value to its most recently seen index, updating `ans = Math.min(ans, i - last.get(cards[i]) + 1)` whenever a repeat is seen.

### Step-by-Step Thinking Process

1. Create `Map<Integer, Integer> last = new HashMap<>()` to store `cardValue -> mostRecentIndex`.
2. Initialize `ans = n + 1` (an impossible sentinel length larger than the entire array of size `n`).
3. Iterate `i` from `0` to `n - 1`: if `last.containsKey(cards[i])`, compute the window length `i - last.get(cards[i]) + 1` and update `ans`.
4. Update `last.put(cards[i], i)` so future occurrences measure against this newer, closer index.
5. Return `-1` if `ans > n`, or `ans` otherwise.

### Algorithm / Intuition

In `minimumCardPickup`, `last.put(cards[i], i)` overwrites any older index of `cards[i]` on every step. Because `i` increases monotonically, `last.get(cards[i])` is guaranteed to be the largest index `< i` sharing the value `cards[i]`, minimizing `i - prevIndex + 1` among all subarrays ending at `i` whose duplicate pair uses `cards[i]`.

---

## Dry Run

Trace on **Example 1**: `cards = [3, 4, 2, 3, 4, 7]` (`n = 6`, `ans = 7`).

| `i` | `cards[i]` | `last.containsKey`? | Window Length | `ans` | `last` after `put` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `3` | `false` | — | `7` | `{3: 0}` |
| `1` | `4` | `false` | — | `7` | `{3: 0, 4: 1}` |
| `2` | `2` | `false` | — | `7` | `{3: 0, 4: 1, 2: 2}` |
| `3` | `3` | `true` (`0`) | `3 - 0 + 1 = 4` | `4` | `{3: 3, 4: 1, 2: 2}` |
| `4` | `4` | `true` (`1`) | `4 - 1 + 1 = 4` | `4` | `{3: 3, 4: 4, 2: 2}` |
| `5` | `7` | `false` | — | `4` | `{3: 3, 4: 4, 2: 2, 7: 5}` |

`ans = 4 <= 6`, so returns `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We iterate through the `n` cards once, performing `O(1)` average-time `HashMap` lookups and updates per element.
- **Space Complexity:** `O(n)` — In the worst case where all cards are distinct, `last` stores `n` key-value pairs.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2260minimum-consecutive-cards-to-pick-up.java](./2260minimum-consecutive-cards-to-pick-up.java) |

---

## Key Learnings

- Minimizing distance between equal elements in an array reduces to tracking only the **last seen index** of each value in a hash map.
- Initializing `ans = n + 1` provides a clean sentinel for minimum-subarray-length problems since no valid subarray can exceed length `n`.
