---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - Two Pointers
  - Binary Search
  - Sorting
---

# 1346. Check If N and Its Double Exist

**[View Problem on LeetCode](https://leetcode.com/problems/check-if-n-and-its-double-exist/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1346` (`1346`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `Two Pointers`, `Binary Search`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `arr`, determine whether there exist two **distinct** indices `i` and `j` (`i != j`, `0 <= i, j < arr.length`) such that `arr[i] == 2 * arr[j]`. Return `true` if such a pair exists, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: arr = [10,2,5,3]
Output: true
Explanation: For i = 0 and j = 2, arr[i] == 10 == 2 * 5 == 2 * arr[j]
```

### Example 2

```text
Input: arr = [3,1,7,11]
Output: false
Explanation: There is no i and j that satisfy the conditions.
```

---

## Constraints

- `2 <= arr.length <= 500`

- `-10^3 <= arr[i] <= 10^3`

---

## Problem Understanding

- Because `i` and `j` can appear in **either** relative order (`i < j` or `i > j`), as we scan left to right, the current element `x` could be either the **half** of a previously seen number (`2 * x` already seen) or the **double** of a previously seen number (`x / 2` already seen, provided `x` is even).
- **Zero edge case (`0 == 2 * 0`):** Since `i != j` is required, a single `0` in `arr` must **not** match itself (`[0, 3]` -> `false`), whereas two zeroes (`[0, 0]`) **must** match (`true`).
- **Integer division trap:** In Java, `5 / 2` truncates to `2`, so we must check `x % 2 == 0` before checking whether `x / 2` was seen.
- Negative numbers are allowed (`-10^3 <= arr[i] <= 10^3`), e.g., `-4 == 2 * (-2)`; in Java `-4 % 2 == 0` and `-4 / 2 == -2`, while `-3 % 2 == -1 != 0`, so `x % 2 == 0` works seamlessly for negatives as well.

---

## Approach

### Brute Force Approach

Use two nested loops over all pairs `(i, j)` with `i != j` and check `arr[i] == 2 * arr[j]`. This requires `O(n^2)` comparisons, whereas a single-pass hash set look-back solves the problem in linear time.

### Optimized Approach

Maintain a `HashSet<Integer> s` of elements seen so far. For each element `x` in `arr`, check whether `2 * x` is in `s` or (`x % 2 == 0` and `x / 2` is in `s`); if so, return `true`, otherwise insert `x` into `s`.

### Step-by-Step Thinking Process

1. Instead of populating a set upfront (which makes `x = 0` collide with itself at `i == j`), insert elements **on the fly** after checking prior elements.
2. When visiting `x`, any previously visited element `y` in `s` lives at an index strictly less than the current index (`i != j` guaranteed).
3. Check both relationship directions against `s`: either `y == 2 * x` (`s.contains(x * 2)`) or `x == 2 * y` (`x % 2 == 0 && s.contains(x / 2)`).
4. If neither holds, call `s.add(x)` and continue; if the loop finishes without a match, return `false`.

### Algorithm / Intuition

In `checkIfExist`, `s` stores all elements from prefix `arr[0..k-1]` when inspecting `x = arr[k]`. Checking `s` **before** calling `s.add(x)` cleanly handles `x = 0`: the first `0` sees `s.contains(0) == false` and inserts `0`; only a second `0` finds `0` already in `s` and returns `true`. Meanwhile, short-circuit evaluation in `x % 2 == 0 && s.contains(x / 2)` prevents odd integers from matching truncated quotients.

---

## Dry Run

Tracing `arr = [10, 2, 5, 3]` (**Example 1**):

- Initially: `s = {}`
- `x = 10`: `s.contains(20)` (`false`), `10 % 2 == 0 && s.contains(5)` (`false`) -> `s.add(10)` -> `s = {10}`
- `x = 2`: `s.contains(4)` (`false`), `2 % 2 == 0 && s.contains(1)` (`false`) -> `s.add(2)` -> `s = {10, 2}`
- `x = 5`: `s.contains(10)` is **`true`!** -> immediately returns `true` (never reaches `x = 3`).

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We iterate through `arr` at most once, performing `O(1)` average-time `HashSet` lookups and insertions per element.
- **Space Complexity:** `O(n)` — In the worst case (no valid pair found), `s` stores up to `n` integers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1346check-if-n-and-its-double-exist.java](./1346check-if-n-and-its-double-exist.java) |

---

## Key Learnings

- Checking a hash set **before** inserting the current element is the cleanest way to enforce `i != j` on self-matching values like `0` (`0 == 2 * 0`).
- Whenever rewriting `a == 2 * b` as `b == a / 2` in integer arithmetic, guard division with a parity check (`a % 2 == 0`) to prevent truncation false positives.
- Because pair order is unconstrained (`arr[i] == 2 * arr[j]` allows `i < j` or `i > j`), a single-pass look-back must test **both** `2 * x` and `x / 2`.
