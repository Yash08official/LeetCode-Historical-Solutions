---
comments: true
difficulty: Easy
tags:
  - Binary Search
  - Interactive
---

# 374. Guess Number Higher or Lower

**[View Problem on LeetCode](https://leetcode.com/problems/guess-number-higher-or-lower/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0374` (`374`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Binary Search`, `Interactive` |
| **Solution Language** | JavaScript |

---

## Problem Description

In the Guess Game, a secret integer `pick` is chosen uniformly from `1` to `n`. You can query a pre-defined helper `guess(num)` which returns:
- `-1` if your guess `num` is strictly greater than `pick` (`num > pick`),
- `1` if your guess `num` is strictly less than `pick` (`num < pick`),
- `0` if `num == pick`.

Return the secret number `pick`.

---

## Examples

### Example 1

```text
Input: n = 10, pick = 6
Output: 6
```

### Example 2

```text
Input: n = 1, pick = 1
Output: 1
```

### Example 3

```text
Input: n = 2, pick = 1
Output: 1
```

---

## Constraints

- `1 <= n <= 2^31 - 1`

- `1 <= pick <= n`

---

## Problem Understanding

The return value of `guess(num)` is monotonic over `[1, n]`: for `1 <= num < pick` it returns `1`, at `num == pick` it returns `0`, and for `pick < num <= n` it returns `-1`. Therefore, the predicate `guess(mid) <= 0` transitions from `false` to `true` exactly at `pick`!

Key observations:
- `n` can be as large as `2^{31} - 1` (`2,147,483,647`), ruling out linear search.
- Careful attention is needed on `(left + right) / 2`: in JavaScript, `Number` uses 64-bit IEEE-754 floating-point values (`Number.MAX_SAFE_INTEGER = 2^{53} - 1`), so `left + right` up to `2^{32}` never overflows!

---

## Approach

### Brute Force Approach

Testing every integer `num` sequentially from `1` to `n` until `guess(num) === 0` makes up to `n` API calls.

When `n = 2^{31} - 1`, over two billion calls will exceed the time limit (`O(n)`).

### Optimized Approach

We apply **Lower-Bound Binary Search** on the interval `[1, n]`. At each step, we test `mid = Math.floor((left + right) / 2)`: if `guess(mid) <= 0`, `pick` lies in `[left, mid]`, so we set `right = mid`; otherwise `pick` is strictly larger, so we set `left = mid + 1`.

### Step-by-Step Thinking Process

1. Set the search space bounds to `left = 1` and `right = n`.
2. Loop while `left < right` (more than one candidate remains).
3. Compute the midpoint `mid = Math.floor((left + right) / 2)`.
4. Call `guess(mid)`: if the result is `<= 0` (`0` means exact match, `-1` means `mid > pick`), keep `mid` inside the candidate range by setting `right = mid`.
5. Otherwise (`guess(mid) === 1`, meaning `mid < pick`), discard `mid` and everything below it via `left = mid + 1`.
6. When `left === right`, the search space has converged onto `pick`; return `left`.

### Algorithm / Intuition

Notice how `if (guess(mid) <= 0)` merges the `0` and `-1` cases into one clean branch (`right = mid`) instead of writing a 3-way `if / else if / else`. Because `mid = Math.floor((left + right) / 2)` rounds down toward `left`, `mid` is strictly less than `right` whenever `left < right`, guaranteeing that both `right = mid` and `left = mid + 1` strictly shrink the interval `[left, right]` on every iteration without risking an infinite loop.

---

## Dry Run

Tracing `guessNumber(10)` with `pick = 6` (**Example 1**):

| Step | `left` | `right` | `mid` | `guess(mid)` | Condition `<= 0`? | Updated Bounds |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `1` | `10` | `5` | `1` (`5 < 6`) | `false` | `left = 6`, `right = 10` |
| 2 | `6` | `10` | `8` | `-1` (`8 > 6`) | `true` | `left = 6`, `right = 8` |
| 3 | `6` | `8` | `7` | `-1` (`7 > 6`) | `true` | `left = 6`, `right = 7` |
| 4 | `6` | `7` | `6` | `0` (`6 == 6`) | `true` | `left = 6`, `right = 6` |

Now `left === right === 6`, so the loop exits and returns `6`.

---

## Complexity Analysis

- **Time Complexity:** `O(log n)` — Each iteration halves the interval `[left, right]`, making at most `31` calls to `guess` for `n <= 2^{31} - 1`.
- **Space Complexity:** `O(1)` — Only three scalar variables (`left`, `right`, `mid`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [374guess-number-higher-or-lower.js](./374guess-number-higher-or-lower.js) |

---

## Key Learnings

- Read interactive API return codes carefully: `-1` means *your guess* is too high (`num > pick`), whereas `1` means *your guess* is too low (`num < pick`).
- In JavaScript, `(left + right) / 2` with `Math.floor` is safe for 32-bit bounds because JS numbers have 53 bits of integer precision; in 32-bit typed languages (Java/C++), use `left + ((right - left) >> 1)` or `(left + right) >>> 1` (and avoid bitwise `>>` in JS on sums `>= 2^{31}` because JS bitwise operators coerce to signed 32-bit ints!).
- Two-branch binary search (`while (left < right)`) avoids off-by-one bugs and always terminates when `mid` is rounded down and updates are `right = mid` / `left = mid + 1`.
