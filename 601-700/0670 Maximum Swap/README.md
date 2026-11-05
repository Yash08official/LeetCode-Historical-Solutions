---
comments: true
difficulty: Medium
tags:
  - Math
  - Greedy
---

# 670. Maximum Swap

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-swap/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0670` (`670`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

You are given a non-negative integer `num`. You may swap any two digits of `num` **at most once**. Return the **maximum possible integer** obtainable after performing zero or one digit swap.

---

## Examples

### Example 1

```text
Input: num = 2736
Output: 7236
Explanation: Swap the number 2 and the number 7.
```

### Example 2

```text
Input: num = 9973
Output: 9973
Explanation: No swap.
```

---

## Constraints

- `0 <= num <= 10^8`

---

## Problem Understanding

- **Most Significant Improvement First:** To maximize a base-10 number with a single swap, we want the **leftmost** (highest place value) digit `arr[i]` that has a strictly larger digit somewhere to its right (`j > i`) to be swapped.
- **Which Larger Digit to Pick?** We should swap `arr[i]` with the **largest** digit available in `arr[i + 1 .. n - 1]`. Crucially, if that maximum digit appears **multiple times** to the right (e.g., `num = 1993`), we must swap `1` with the **rightmost** `9` (`9913` > `9193`) so the smaller digit `1` lands in the least significant position possible!

---

## Approach

### Brute Force Approach

Converting `num` to a digit array of length `d` (`d <= 9` for `num <= 10^8`), trying all `d * (d - 1) / 2` pairs `(i, j)`, swapping, parsing back to an integer, and tracking the maximum takes `O(d^3)` time (`<= 9 * 8 / 2 * 9` operations). While acceptable for `d <= 9`, it does not scale linearly if `num` were given as a 100,000-digit string.

### Optimized Approach

Precompute `rightMax[i]` — the index of the **rightmost** maximum digit in `arr[i .. n - 1]` — via a right-to-left pass, then scan left-to-right to swap the first digit `arr[i]` that is smaller than `arr[rightMax[i]]`.

### Step-by-Step Thinking Process

1. Convert `num` into a character array `arr` of length `n`.
2. Create `int[] rightMax = new int[n]` and initialize `maxPos = n - 1`, `rightMax[n - 1] = n - 1`.
3. Scan `i` from `n - 2` down to `0`: update `maxPos = i` **only on strict inequality** `arr[i] > arr[rightMax[i + 1]]` (so ties keep the rightmost index!), and set `rightMax[i] = maxPos`.
4. Scan `i` from `0` to `n - 1`: find the first position where `arr[i] != arr[rightMax[i]]` (meaning a strictly larger digit exists at `rightMax[i]`).
5. Swap `arr[i]` and `arr[rightMax[i]]`, convert back to `int`, and return immediately; if the loop finishes, return `num` unchanged.

### Algorithm / Intuition

Two subtle details in `maximumSwap` guarantee exact optimality:
1. **Strict `>` when scanning right-to-left (`arr[i] > arr[rightMax[i + 1]]`):** When an equal digit appears further left (e.g., the first `'9'` in `"1993"`), `maxPos` is *not* overwritten, so `rightMax` continues pointing to the **rightmost** occurrence of `'9'`. Swapping places the small digit as far right (lowest place value) as possible.
2. **Value comparison `arr[i] != arr[rightMax[i]]` when scanning left-to-right:** Since `arr[rightMax[i]]` is the maximum value in `arr[i .. n - 1]`, `arr[rightMax[i]] >= arr[i]` always holds. Comparing character *values* (`arr[i] != arr[rightMax[i]]`) rather than indices (`i != rightMax[i]`) avoids swapping two identical digits (such as the two `'9'`s in `"9973"`, where `rightMax[0] == 1` but `arr[0] == arr[1] == '9'`).

---

## Dry Run

Tracing Example 1: `num = 2736` (`arr = ['2', '7', '3', '6']`, `n = 4`):

1. **Right-to-left `rightMax` build:**
   - Init: `maxPos = 3`, `rightMax[3] = 3` (`'6'`).
   - `i = 2` (`'3'`): `'3' > '6'` is false -> `rightMax[2] = 3`.
   - `i = 1` (`'7'`): `'7' > '6'` is true -> `maxPos = 1`, `rightMax[1] = 1`.
   - `i = 0` (`'2'`): `'2' > '7'` is false -> `rightMax[0] = 1`.
   - Result: `rightMax = [1, 1, 3, 3]`.
2. **Left-to-right swap check:**
   - `i = 0`: `arr[0]` (`'2'`) `!= arr[rightMax[0]]` (`arr[1] = '7'`) -> **Swap index `0` and `1`**!
   - `arr` becomes `['7', '2', '3', '6']`.
3. **Return:** `Integer.valueOf("7236")` = `7236`.

---

## Complexity Analysis

- **Time Complexity:** `O(d)` (which is `O(1)` since `d <= 9` for `num <= 10^8`) — Performs two linear passes over the `d` digits of `num`.
- **Space Complexity:** `O(d)` (`O(1)` bounded by `d <= 9`) — Allocates `char[d]` for `arr` and `int[d]` for `rightMax`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [670maximum-swap.java](./670maximum-swap.java) |

---

## Key Learnings

- When duplicate maxima exist in digit-swap greedy problems, always pick the **rightmost** copy of the larger digit to swap with the **leftmost** upgradable position.
- Comparing values (`arr[i] != arr[rightMax[i]]`) rather than indices (`i != rightMax[i]`) prevents no-op swaps when duplicate maximum digits sit to the right.
- Space can even be reduced from `O(d)` to `O(1)` auxiliary variables (two swap candidates `swapLeft`, `swapRight` alongside `maxPos`) by folding both passes into one right-to-left scan.
