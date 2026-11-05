---
comments: true
difficulty: Easy
tags:
  - Array
---

# 1431. Kids With the Greatest Number of Candies

**[View Problem on LeetCode](https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1431` (`1431`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array` |
| **Solution Language** | JavaScript |

---

## Problem Description

There are `n` kids with candies. You are given an integer array `candies`, where each `candies[i]` represents the number of candies the `i`-th kid has, and an integer `extraCandies`, denoting the number of extra candies you can distribute.

Return a boolean array `result` of length `n`, where `result[i]` is `true` if, after giving all `extraCandies` to the `i`-th kid, they will have the greatest number of candies among all the kids (i.e. at least as many candies as any other kid), or `false` otherwise. Note that multiple kids can have the greatest number of candies simultaneously.

---

## Examples

### Example 1

```text
Input: candies = [2,3,5,1,3], extraCandies = 3
Output: [true,true,true,false,true]
Explanation: If you give all extraCandies to:
- Kid 1, they will have 2 + 3 = 5 candies, which is the greatest among the kids.
- Kid 2, they will have 3 + 3 = 6 candies, which is the greatest among the kids.
- Kid 3, they will have 5 + 3 = 8 candies, which is the greatest among the kids.
- Kid 4, they will have 1 + 3 = 4 candies, which is not the greatest among the kids.
- Kid 5, they will have 3 + 3 = 6 candies, which is the greatest among the kids.
```

### Example 2

```text
Input: candies = [4,2,1,1,2], extraCandies = 1
Output: [true,false,false,false,false]
Explanation: There is only 1 extra candy.
Kid 1 will always have the greatest number of candies, even if a different kid is given the extra candy.
```

### Example 3

```text
Input: candies = [12,1,12], extraCandies = 10
Output: [true,false,true]
```

---

## Constraints

- `n == candies.length`

- `2 <= n <= 100`

- `1 <= candies[i] <= 100`

- `1 <= extraCandies <= 50`

---

## Problem Understanding

Key observations:
- A kid `i` will have the greatest number of candies if and only if `candies[i] + extraCandies >= max(candies)`.
- We do not need to simulate giving candies to kids simultaneously; each kid is evaluated independently as if receiving all `extraCandies`.
- Constraints: `candies.length <= 100`, `candies[i] <= 100`, `extraCandies <= 50`.

---

## Approach

### Brute Force Approach

For each kid `i`, compute `candies[i] + extraCandies` and compare this value against every other kid `candies[j]` in an inner loop. This takes `O(n^2)` time. With `n <= 100`, this easily passes, but precomputing the maximum reduces the complexity to `O(n)`.

### Optimized Approach

Find the maximum candy count among all kids first using `Math.max(...candies)`. Then use `Array.prototype.map` to evaluate whether `candy + extraCandies >= maxCandies` for each kid in a single pass.

### Step-by-Step Thinking Process

1. Find the benchmark threshold: the maximum candy count currently held by any kid, `maxCandies`.
2. Recognize that kid `i` meets the condition if and only if their boosted total `candies[i] + extraCandies` is greater than or equal to `maxCandies`.
3. Iterate through the `candies` array using `.map()` and return the resulting boolean array.

### Algorithm / Intuition

The JavaScript function `kidsWithCandies(candies, extraCandies)`:
- Computes `let maxCandies = Math.max(...candies);`.
- Returns `candies.map(candy => candy + extraCandies >= maxCandies)`.
Each element is mapped to a boolean value representing whether adding `extraCandies` reaches or exceeds `maxCandies`.

---

## Dry Run

Walkthrough on Example 1: `candies = [2, 3, 5, 1, 3]`, `extraCandies = 3`.
- `maxCandies = Math.max(2, 3, 5, 1, 3) = 5`.
- Evaluation for each kid:
  - Kid 0: `2 + 3 = 5 >= 5` -> `true`
  - Kid 1: `3 + 3 = 6 >= 5` -> `true`
  - Kid 2: `5 + 3 = 8 >= 5` -> `true`
  - Kid 3: `1 + 3 = 4 >= 5` -> `false`
  - Kid 4: `3 + 3 = 6 >= 5` -> `true`
- Output: `[true, true, true, false, true]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Finding the maximum takes `O(n)` time, and mapping each element takes `O(n)` time, where `n = candies.length`.
- **Space Complexity:** `O(1)` auxiliary space — Excluding the returned boolean array of length `n`, only a single scalar variable `maxCandies` is allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1431kids-with-the-greatest-number-of-candies.js](./1431kids-with-the-greatest-number-of-candies.js) |

---

## Key Learnings

- Precomputing the global maximum eliminates redundant pairwise comparisons.
- Idiomatic JavaScript functions like `Math.max(...arr)` and `arr.map()` yield concise and readable solutions.
