---
comments: true
difficulty: Medium
tags:
  - Array
  - Stack
  - Monotonic Stack
---

# 739. Daily Temperatures

**[View Problem on LeetCode](https://leetcode.com/problems/daily-temperatures/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0739` (`739`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Stack`, `Monotonic Stack` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `temperatures` representing daily recorded temperatures, return an integer array `result` of the same length where `result[i]` is the number of days after day `i` you must wait to experience a **strictly warmer** temperature.

If no future day has a temperature strictly greater than `temperatures[i]`, set `result[i] = 0`.

---

## Examples

### Example 1

```text
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
```

### Example 2

```text
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
```

### Example 3

```text
Input: temperatures = [30,60,90]
Output: [1,1,0]
```

---

## Constraints

- `1 <= temperatures.length <= 10^5`

- `30 <= temperatures[i] <= 100`

---

## Problem Understanding

- For every index `i`, we need the **nearest index `j > i`** such that `temperatures[j] > temperatures[i]`, and the answer is the distance `j - i`.
- Finding the nearest strictly greater element to the right is the canonical **Next Greater Element** problem.
- Days whose warmer day hasn't arrived yet can be held in decreasing (non-increasing) order of temperature; as soon as a warmer day `i` arrives, it resolves all cooler pending days at the top of the list.

---

## Approach

### Brute Force Approach

For each day `i`, scan forward `j = i + 1, i + 2, ...` until finding `temperatures[j] > temperatures[i]`. When temperatures are non-increasing (e.g., `[90, 89, 88, ...]`), every inner loop scans to the end of the array, resulting in `O(n^2)` time, which is too slow for `n <= 10^5`.

### Optimized Approach

Use a **monotonic decreasing stack** storing day indices: as we iterate `i` from `0` to `n - 1`, pop every pending index `idx` whose temperature is strictly less than `temperatures[i]`, set `result[idx] = i - idx`, and push `i`.

### Step-by-Step Thinking Process

1. Allocate `int[] result = new int[n]` (Java initializes all entries to `0`, handling days that never see a warmer future day automatically).
2. Maintain a `Stack<Integer> stack` of indices whose warmer day has not yet been found. Notice their temperatures must be monotonically non-increasing from bottom to top.
3. At day `i`, while `stack` is non-empty and `temperatures[stack.peek()] < temperatures[i]`, day `i` is the very first warmer day for `idx = stack.pop()`, so record `result[idx] = i - idx`.
4. Push `i` onto `stack` to wait for its own future warmer day.

### Algorithm / Intuition

In `dailyTemperatures(int[] temperatures)`:
- Storing **indices** rather than raw temperatures in `stack` gives us access to both the temperature (`temperatures[stack.peek()]`) and the elapsed wait time (`i - idx`).
- Notice the strict `<` comparison: equal temperatures (`temperatures[stack.peek()] == temperatures[i]`) do **not** pop `stack.peek()`, matching the requirement for a **strictly warmer** day.
- Any indices still remaining in `stack` after the loop ends have no warmer day to their right, and their `result` slots are already `0`.

---

## Dry Run

Trace on **Example 1**: `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`.

| `i` | `temp` | Popped Indices & Updates | `stack` After Push (indices: temps) |
| :--- | :--- | :--- | :--- |
| `0` | `73` | — | `[0:73]` |
| `1` | `74` | pop `0` -> `result[0] = 1 - 0 = 1` | `[1:74]` |
| `2` | `75` | pop `1` -> `result[1] = 2 - 1 = 1` | `[2:75]` |
| `3` | `71` | — | `[2:75, 3:71]` |
| `4` | `69` | — | `[2:75, 3:71, 4:69]` |
| `5` | `72` | pop `4` (`result[4]=1`), pop `3` (`result[3]=2`) | `[2:75, 5:72]` |
| `6` | `76` | pop `5` (`result[5]=1`), pop `2` (`result[2]=4`) | `[6:76]` |
| `7` | `73` | — | `[6:76, 7:73]` |

Remaining indices `6` and `7` keep default `0`. Final `result = [1, 1, 4, 2, 1, 1, 0, 0]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Each index from `0` to `n - 1` is pushed onto `stack` once and popped at most once.
- **Space Complexity:** `O(n)` — In the worst case (strictly decreasing temperatures), `stack` holds all `n` indices (excluding the `result` array).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [739daily-temperatures.java](./739daily-temperatures.java) |

---

## Key Learnings

- Monotonic stacks solve 'next greater/smaller element' queries across an entire array in `O(n)` amortized time.
- Pushing array indices instead of element values lets you compute both index distances and value comparisons without storing pairs.
- In production Java, `ArrayDeque<Integer>` can also replace legacy `java.util.Stack` to avoid synchronization overhead.
