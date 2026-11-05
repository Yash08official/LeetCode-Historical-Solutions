---
comments: true
difficulty: Easy
tags:
  - Array
  - Stack
  - Monotonic Stack
---

# 1475. Final Prices With a Special Discount in a Shop

**[View Problem on LeetCode](https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1475` (`1475`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Stack`, `Monotonic Stack` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an integer array `prices`, where `prices[i]` is the original price of the `i`-th item in a shop.

When buying item `i`, you get a discount equal to `prices[j]`, where `j` is the **smallest index strictly to the right of `i`** (`j > i`) satisfying `prices[j] <= prices[i]`. If no such item `j` exists to the right, no discount is applied.

Return an array where index `i` holds the final discounted price (`prices[i] - discount`) for each item.

---

## Examples

### Example 1

```text
Input: prices = [8,4,6,2,3]
Output: [4,2,4,2,3]
Explanation:
For item 0 with price[0]=8 you will receive a discount equivalent to prices[1]=4, therefore, the final price you will pay is 8 - 4 = 4.
For item 1 with price[1]=4 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 4 - 2 = 2.
For item 2 with price[2]=6 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 6 - 2 = 4.
For items 3 and 4 you will not receive any discount at all.
```

### Example 2

```text
Input: prices = [1,2,3,4,5]
Output: [1,2,3,4,5]
Explanation: In this case, for all items, you will not receive any discount at all.
```

### Example 3

```text
Input: prices = [10,1,1,6]
Output: [9,0,1,6]
```

---

## Constraints

- `1 <= prices.length <= 500`

- `1 <= prices[i] <= 1000`

---

## Problem Understanding

This problem asks for the **Next Smaller or Equal Element** to the right of every index `i`:
- Note the `<=` condition: if `prices[i] = 1` and the next `1` to the right has `prices[j] = 1`, it **qualifies** as a discount, making the final price `1 - 1 = 0`!
- When scanning from **right to left**, suppose we see an item `x = prices[i]` and there is a later item `y` (`j > i`) with `y > x`. Not only can `y` *not* discount `x`, `y` can **never** be the first `<=` element for any item further to the left either — because `x` sits closer on the left and is strictly smaller than `y`! Thus `y` can be permanently discarded.

---

## Approach

### Brute Force Approach

For each item `i`, scanning `j = i + 1` to `n - 1` until finding the first `prices[j] <= prices[i]` takes `O(n)` per item in the worst case (e.g., a strictly increasing array `[1, 2, 3, 4, 5]`), resulting in `O(n^2)` total time.

### Optimized Approach

The solution uses a **monotonic non-decreasing stack (`stk`) scanning from right to left** and updates `prices` in-place:
- Iterate `i` backward from `prices.length - 1` down to `0` (`for (let i = prices.length - 1; ~i; --i)`).
- Store the original price `const x = prices[i]`.
- Pop elements from `stk` while `stk.at(-1) > x`.
- Subtract `stk.at(-1) || 0` from `prices[i]`, then push the **original** price `x` onto `stk`.

### Step-by-Step Thinking Process

1. Traverse `prices` right-to-left so candidate discounts `prices[j]` (`j > i`) are already processed and sitting in `stk`.
2. Save `const x = prices[i]` before modifying `prices[i]`, because future items to the left must compare against item `i`'s *original* price, not its discounted price!
3. Maintain `stk` so its top `stk.at(-1)` is the nearest right-side price: pop while `stk.length && stk.at(-1) > x` (strictly `>`, keeping equal prices since `prices[j] <= prices[i]` is valid).
4. Apply the discount in-place via `prices[i] -= stk.at(-1) || 0` (when `stk` is empty, `stk.at(-1)` is `undefined`, falling back to `0`).
5. Push `x` onto `stk` and continue leftward.

### Algorithm / Intuition

Two subtle JavaScript idioms power `finalPrices`:
1. **Loop condition `~i`**: Bitwise NOT satisfies `~i === -(i + 1)`. For all `i >= 0`, `~i` is non-zero (truthy); as soon as `i` decrements to `-1`, `~(-1)` becomes `0` (falsy), cleanly stopping the countdown at `0`.
2. **Saving `const x = prices[i]`**: Because `prices[i]` is mutated in-place (`prices[i] -= ...`), pushing `x` (the pre-discount price) onto `stk` ensures items at `< i` see the true shelf price of item `i`.

---

## Dry Run

Trace on **Example 1**: `prices = [8, 4, 6, 2, 3]`

| `i` | Original `x` | Popped (`> x`) | `stk.at(-1)` (Discount) | Updated `prices[i]` | `stk` after `push(x)` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `4` | `3` | none | `undefined` (`0`) | `3 - 0 = 3` | `[3]` |
| `3` | `2` | `3` | `undefined` (`0`) | `2 - 0 = 2` | `[2]` |
| `2` | `6` | none (`2 <= 6`) | `2` | `6 - 2 = 4` | `[2, 6]` |
| `1` | `4` | `6` (`2 <= 4`) | `2` | `4 - 2 = 2` | `[2, 4]` |
| `0` | `8` | none (`4 <= 8`) | `4` | `8 - 4 = 4` | `[2, 4, 8]` |

Returns `[4, 2, 4, 2, 3]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Each of the `n` prices is pushed onto `stk` once and popped at most once.
- **Space Complexity:** `O(n)` — In the worst case (strictly increasing `prices`), the monotonic stack `stk` holds up to `n` elements (`prices` itself is modified in-place).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1475final-prices-with-a-special-discount-in-a-shop.js](./1475final-prices-with-a-special-discount-in-a-shop.js) |

---

## Key Learnings

- Monotonic stacks solve 'Next Greater/Smaller Element' queries in `O(n)` amortized time because every element enters and exits the stack at most once.
- Pay careful attention to strict vs. non-strict inequalities: because equal prices qualify as discounts (`prices[j] <= prices[i]`), the pop condition must be strictly greater (`stk.at(-1) > x`).
- When mutating an input array in-place while also caching values for future comparisons, always capture the original value (`const x = prices[i]`) first.
