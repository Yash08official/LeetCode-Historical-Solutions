---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
---

# 1207. Unique Number of Occurrences

**[View Problem on LeetCode](https://leetcode.com/problems/unique-number-of-occurrences/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1207` (`1207`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `arr`, count how many times each distinct integer appears in `arr`. Return `true` if **no two distinct values have the same occurrence count**, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: arr = [1,2,2,1,1,3]
Output: true
Explanation: The value 1 has 3 occurrences, 2 has 2 and 3 has 1. No two values have the same number of occurrences.
```

### Example 2

```text
Input: arr = [1,2]
Output: false
```

### Example 3

```text
Input: arr = [-3,0,1,-3,1,1,1,-3,10,0]
Output: true
```

---

## Constraints

- `1 <= arr.length <= 1000`

- `-1000 <= arr[i] <= 1000`

---

## Problem Understanding

- **Injective Frequency Mapping:** Let `k` be the number of distinct integers in `arr`. Each distinct integer maps to a positive frequency count. All frequencies are unique if and only if collecting those `k` frequencies into a mathematical set still produces a set of size `k`.
- **Negative Values Allowed:** Elements lie in `[-1000, 1000]`, so using a `HashMap<Integer, Integer>` handles negative and positive keys directly without index-offset arithmetic.

---

## Approach

### Brute Force Approach

For each element in `arr`, scan the entire array to count its occurrences, store `(value, count)` pairs, and compare every pair of distinct values in nested loops to check for duplicate counts. That takes `O(n^2)` time.

### Optimized Approach

Count element frequencies in a `HashMap<Integer, Integer> cnt` using `cnt.merge(x, 1, Integer::sum)`, then check whether `new HashSet<>(cnt.values()).size() == cnt.size()`.

### Step-by-Step Thinking Process

1. Traverse `arr` once and tally each number `x`'s count in `Map<Integer, Integer> cnt`.
2. Extract all frequency values via `cnt.values()` and insert them into a `HashSet<Integer>`.
3. Observe that `cnt.size()` is the number of distinct integers, while `new HashSet<>(cnt.values()).size()` is the number of distinct frequencies.
4. Return whether the two sizes are equal.

### Algorithm / Intuition

`cnt.merge(x, 1, Integer::sum)` inserts `1` the first time `x` is seen and adds `1` to the existing count on subsequent encounters.

Once `cnt` holds `(value -> frequency)` for all `k = cnt.size()` distinct values, `new HashSet<>(cnt.values())` deduplicates the collection of `k` frequencies. By the Pigeonhole Principle, the `HashSet` retains size `k` if and only if every single key in `cnt` had a distinct frequency.

---

## Dry Run

Using **Example 1** (`arr = [1, 2, 2, 1, 1, 3]`):

1. **Frequency Counting (`cnt`):**
   - `x = 1` -> `{1: 1}`
   - `x = 2` -> `{1: 1, 2: 1}`
   - `x = 2` -> `{1: 1, 2: 2}`
   - `x = 1` -> `{1: 2, 2: 2}`
   - `x = 1` -> `{1: 3, 2: 2}`
   - `x = 3` -> `{1: 3, 2: 2, 3: 1}`
2. **Uniqueness Check:**
   - `cnt.size()` = `3`.
   - `cnt.values()` = `[3, 2, 1]` -> `new HashSet<>(cnt.values())` = `{1, 2, 3}` -> `.size()` = `3`.
   - `3 == 3` -> returns **`true`**.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Iterating over `arr` of length `n` performs `n` `O(1)` average hash map updates, and building the `HashSet` over `k <= n` frequency values takes `O(k)` average time.
- **Space Complexity:** `O(k)` (`O(n)` worst-case) — Both `cnt` and the `HashSet` store at most `k` entries, where `k` is the number of unique elements in `arr`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1207unique-number-of-occurrences.java](./1207unique-number-of-occurrences.java) |

---

## Key Learnings

- Comparing `new HashSet<>(collection).size() == collection.size()` is a concise, readable Java idiom for testing whether all elements in a collection are unique.
- `Map.merge(key, 1, Integer::sum)` avoids verbose `getOrDefault` lookups when building frequency tables.
