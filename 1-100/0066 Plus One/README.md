---
comments: true
difficulty: Easy
tags:
  - Array
  - Math
---

# 66. Plus One

**[View Problem on LeetCode](https://leetcode.com/problems/plus-one/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0066` (`66`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Math` |
| **Solution Language** | Java |

---

## Problem Description

You are given a **large non-negative integer** represented as an array `digits`, ordered from most significant digit (`digits[0]`) to least significant digit (`digits[n - 1]`), with no leading zeros (except `[0]` itself).

Add `1` to this integer and return the resulting array of digits.

---

## Examples

### Example 1

```text
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].
```

### Example 2

```text
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].
```

### Example 3

```text
Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].
```

---

## Constraints

- `1 <= digits.length <= 100`

- `0 <= digits[i] <= 9`

- `digits` does not contain any leading `0`'s.

---

## Problem Understanding

- **Arbitrary Length (`n <= 100`):** A 100-digit integer cannot fit into primitive `int` or `long` (`<= 19` digits), so addition must operate directly on the `digits` array.
- **Carry Behavior when Adding `1`:** Adding `1` only propagates a carry as long as trailing digits equal `9` (`9 + 1 = 10 -> 0` with carry `1`). The very first digit `< 9` absorbs the carry (`d + 1` in `[1..9]`) and stops carry propagation immediately.
- **Length Increase Condition:** The output array grows from length `n` to `n + 1` **if and only if** every single digit in the input was `9` (`9 -> 10`, `99 -> 100`, `999 -> 1000`), producing `[1, 0, 0, ..., 0]`.

---

## Approach

### Brute Force Approach

Converting `digits` into a string, constructing a `BigInteger`, adding `BigInteger.ONE`, converting back to a string, and parsing characters back into a new `int[]` works functionally, but allocates multiple heap objects and runs full `O(n)` base conversions even for trivial inputs like `[1, 2, 3]` where only the last digit changes.

### Optimized Approach

Scan `digits` **from right to left (`n - 1` down to `0`)**: increment `digits[i]`, take modulo `10`, and if the resulting digit is non-zero (no carry out), immediately return `digits`. If the loop finishes (meaning every digit wrapped from `9` to `0`), allocate `new int[n + 1]`, set index `0` to `1`, and return it.

### Step-by-Step Thinking Process

1. Start at the least significant digit `i = n - 1` and move left while carries continue.
2. Increment `++digits[i]` and wrap `digits[i] %= 10`.
3. Observe: if `digits[i]` was `0..8`, it is now `1..9` (`digits[i] != 0`), meaning there is **no carry** to `i - 1`—return `digits` right away!
4. If `digits[i]` was `9`, `++digits[i]` becomes `10` and `%= 10` sets `digits[i] = 0`, so the loop naturally advances to `i - 1` to apply the carry of `1`.
5. If the loop exits past `i = 0` without returning, the input was `99...9` (now `00...0`). Allocate `new int[n + 1]` (Java initializes all slots to `0`), set `digits[0] = 1`, and return it.

### Algorithm / Intuition

In `plusOne(int[] digits)`:
- No explicit `carry` variable is needed! Because we are adding `1`, the loop body *itself* represents an active carry of `1` arriving at index `i`.
- `if (digits[i] != 0) return digits;` acts as an early exit as soon as the carry is absorbed.
- In the all-`9`s overflow fallback, `digits = new int[n + 1]; digits[0] = 1; return digits;` exploits Java's guaranteed zero-initialization of newly allocated `int[]` arrays so we don't even need a loop to fill the trailing `n` zeros.

---

## Dry Run

**Trace 1 (Example 1):** `digits = [1, 2, 3]` (`n = 3`)
- `i = 2`: `++digits[2]` -> `4`; `digits[2] %= 10` -> `4`.
- `digits[2] != 0` (`4 != 0`) is `true` -> immediately returns **`[1, 2, 4]`**!

**Trace 2 (All-9s Carry Edge Case — Example 3):** `digits = [9]` (`n = 1`)
- `i = 0`: `++digits[0]` -> `10`; `digits[0] %= 10` -> `0`.
- `digits[0] != 0` is `false` -> loop ends.
- Allocates `digits = new int[2]` (`[0, 0]`), sets `digits[0] = 1` -> returns **`[1, 0]`**.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` in the worst case (when many trailing digits are `9`), and `O(1)` in the average/best case whenever the last digit is `< 9`.
- **Space Complexity:** `O(1)` auxiliary space when updating `digits` in-place (or `O(n)` for the returned `new int[n + 1]` array only when all `n` input digits are `9`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [66plus-one.java](./66plus-one.java) |

---

## Key Learnings

- When incrementing by `1`, `digits[i] == 0` after `(digits[i] + 1) % 10` uniquely identifies carry generation without maintaining a separate `carry` variable.
- Notice how Java's zero-initialized `new int[n + 1]` turns the `999...9 + 1 = 1000...0` resize case into two `O(1)` statements after the `O(n)` scan.
- In production code where mutating the caller's input array is undesirable, clone `digits` first (`digits.clone()`), trading `O(n)` space for immutability.
