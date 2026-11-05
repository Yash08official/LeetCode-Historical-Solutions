---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - String
  - Sorting
---

# 539. Minimum Time Difference

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-time-difference/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0539` (`539`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `String`, `Sorting` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an array `timePoints` of 24-hour clock timestamps in `"HH:MM"` format (`"00:00"` through `"23:59"`), return the **minimum difference in minutes** between any two timestamps in the list.

---

## Examples

### Example 1

```text
Input: timePoints = ["23:59","00:00"]
Output: 1
```

### Example 2

```text
Input: timePoints = ["00:00","23:59","00:00"]
Output: 0
```

---

## Constraints

- `2 <= timePoints.length <= 2 * 10^4`

- `timePoints[i]` is in the format **"HH:MM"**.

---

## Problem Understanding

- **Circular 24-hour clock:** Time wraps around midnight! A day has `24 * 60 = 1440` minutes, so `"23:59"` (`1439`) and `"00:00"` (`0`) are only `1` minute apart (`0 + 1440 - 1439 = 1`), not `1439` minutes apart.
- **Pigeonhole Principle (`> 1440` entries):** Because only `1440` distinct `"HH:MM"` values exist in a 24-hour day, if `timePoints.length > 1440`, at least two timestamps **must** be identical, immediately forcing the minimum difference to `0`!

---

## Approach

### Brute Force Approach

Converting every timestamp to minutes and comparing all `n * (n - 1) / 2` pairs (`min(|a - b|, 1440 - |a - b|)`) takes `O(n^2)` time, which performs up to `2 * 10^8` comparisons for `n = 2 * 10^4`.

### Optimized Approach

Apply **Pigeonhole Early Exit + Minute Conversion & Circular Sorting**: return `0` immediately if `timePoints.length > 1440`; otherwise convert each `"HH:MM"` to total minutes `[0..1439]`, sort ascending, append `nums[0] + 1440` at the end to close the midnight wrap-around, and find the minimum adjacent difference.

### Step-by-Step Thinking Process

1. Check `if (timePoints.length > 1440) return 0;`—by the Pigeonhole Principle, duplicate timestamps are guaranteed when `n > 1440`.
2. Convert each `"HH:MM"` string into integer minutes since `00:00` via `parseInt(t[0]) * 60 + parseInt(t[1])`.
3. Once sorted in ascending order, the closest pair on a circle must either be two adjacent elements `nums[i - 1]` and `nums[i]`, OR the wrap-around pair between the last element `nums[n - 1]` and the first element `nums[0]` across midnight.
4. Appending `nums[n] = nums[0] + 1440` turns the midnight wrap-around into just one more adjacent check `nums[n] - nums[n - 1]`!
5. Scan `i` from `1` to `n` and return the minimum of `nums[i] - nums[i - 1]`.

### Algorithm / Intuition

In `findMinDifference(timePoints)`:
- `if (timePoints.length > 1440) return 0;` caps the array size `n` passed to the rest of the function at `1440`!
- Notice a subtle JavaScript detail with `let nums = new Array(n + 1)`: indices `0 .. n - 1` are filled with integers, leaving `nums[n]` as `undefined`. Per the ECMAScript specification, `Array.prototype.sort` **always** places `undefined` elements at the very end of the array without invoking the comparator on them—so `nums.sort((a, b) => a - b)` sorts the `n` integers into `nums[0 .. n - 1]` while keeping `nums[n]` at the end, ready to be overwritten by `nums[n] = nums[0] + 1440;`!
- Finally, `for (let i = 1; i <= n; ++i)` checks all `n` adjacent intervals around the 1440-minute circle uniformly.

---

## Dry Run

Tracing **Example 1** with `timePoints = ["23:59", "00:00"]`:

1. `timePoints.length` is `2 <= 1440`. Allocate `nums = new Array(3)`.
2. Convert to minutes:
   - `i = 0` (`"23:59"`): `23 * 60 + 59 = 1439` -> `nums[0] = 1439`.
   - `i = 1` (`"00:00"`): `0 * 60 + 0 = 0` -> `nums[1] = 0`.
3. Sort: `nums.sort((a, b) => a - b)` -> `[0, 1439, undefined]`.
4. Wrap-around sentinel: `nums[2] = nums[0] + 1440 = 0 + 1440 = 1440` -> `nums = [0, 1439, 1440]`.
5. Adjacent scan:
   - `i = 1`: `ans = min(MAX_SAFE_INTEGER, 1439 - 0) = 1439`.
   - `i = 2`: `ans = min(1439, 1440 - 1439) = 1`.

Returns `1`.

---

## Complexity Analysis

- **Time Complexity:** `O(min(n, C) log min(n, C))` (which is `O(1)` bounded!) — Where `C = 1440` is the number of minutes in a day: inputs with `n > 1440` return in `O(1)` time, and inputs with `n <= 1440` sort at most `1440` numbers.
- **Space Complexity:** `O(min(n, C))` (`O(1)` bounded) — `nums` is only allocated when `n <= 1440`, using at most `1441` slots.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [539minimum-time-difference.js](./539minimum-time-difference.js) |

---

## Key Learnings

- Applying the Pigeonhole Principle (`n > 1440 => return 0`) turns an unbounded `O(n log n)` runtime into `O(1)` worst-case time!
- Appending `first + period` (`nums[0] + 1440`) to a sorted circular array unifies wrap-around distance with standard adjacent differences.
- A `1440`-element boolean bucket array (`Counting Sort`) can also eliminate comparison sorting entirely if desired.
