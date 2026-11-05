---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - Design
  - Data Stream
  - Prefix Sum
---

# 1352. Product of the Last K Numbers

**[View Problem on LeetCode](https://leetcode.com/problems/product-of-the-last-k-numbers/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1352` (`1352`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `Design`, `Data Stream`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

Design a data structure `ProductOfNumbers` that processes a stream of non-negative integers and answers range-product queries over the most recent `k` elements:
- `ProductOfNumbers()` initializes an empty stream.
- `void add(int num)` appends `num` to the stream.
- `int getProduct(int k)` returns the product of the last `k` integers in the stream (it is guaranteed at least `k` numbers have been added).

All valid contiguous products are guaranteed to fit within a 32-bit signed integer.

---

## Examples

### Example

```text
Input
["ProductOfNumbers","add","add","add","add","add","getProduct","getProduct","getProduct","add","getProduct"]
[[],[3],[0],[2],[5],[4],[2],[3],[4],[8],[2]]

Output
[null,null,null,null,null,null,20,40,0,null,32]

Explanation
ProductOfNumbers productOfNumbers = new ProductOfNumbers();
productOfNumbers.add(3);        // [3]
productOfNumbers.add(0);        // [3,0]
productOfNumbers.add(2);        // [3,0,2]
productOfNumbers.add(5);        // [3,0,2,5]
productOfNumbers.add(4);        // [3,0,2,5,4]
productOfNumbers.getProduct(2); // return 20. The product of the last 2 numbers is 5 * 4 = 20
productOfNumbers.getProduct(3); // return 40. The product of the last 3 numbers is 2 * 5 * 4 = 40
productOfNumbers.getProduct(4); // return 0. The product of the last 4 numbers is 0 * 2 * 5 * 4 = 0
productOfNumbers.add(8);        // [3,0,2,5,4,8]
productOfNumbers.getProduct(2); // return 32. The product of the last 2 numbers is 4 * 8 = 32
```

---

## Constraints

- `0 <= num <= 100`

- `1 <= k <= 4 * 10^4`

- At most `4 * 10^4` calls will be made to `add` and `getProduct`.

- The product of the stream at any point in time will fit in a **32-bit** integer.

---

## Follow-up Questions

Can you implement **both** `GetProduct` and `Add` to work in `O(1)` time complexity instead of `O(k)` time complexity?

The implemented prefix-product reset approach directly satisfies the follow-up: `getProduct(k)` executes a single size comparison and integer division in strict `O(1)` time, while `add(num)` appends or resets the prefix list in amortized `O(1)` time (and strict `O(1)` time per call if re-instantiating `new ArrayList<>()` on `num == 0`), completely eliminating the `O(k)` loop.

---

## Problem Understanding

- Without zeroes, the product of the last `k` numbers is simply `(total prefix product) / (prefix product before the last k numbers)`, just like prefix sums with division instead of subtraction.
- **The Zero Obstacle:** If `0` is appended, multiplying the running prefix product by `0` turns all future prefix products to `0`, making division (`0 / 0`) impossible!
- **Key Insight on Zeroes:** Any `getProduct(k)` window that spans across at least one `0` automatically has product `0`! Only windows consisting **entirely** of elements added *after* the most recent `0` can have a non-zero product.
- Therefore, whenever `num == 0` arrives, we can discard all prior prefix products and reset our prefix product list to `[1]`!

---

## Approach

### Brute Force Approach

Store all appended integers in an `ArrayList<Integer>` and on each `getProduct(k)` multiply the last `k` elements in a loop. `add` runs in `O(1)` time, but `getProduct(k)` takes `O(k)` time—with `4 * 10^4` queries and `k <= 4 * 10^4`, worst-case total runtime degrades to `O(Q * k)` (~`1.6 * 10^9` operations).

### Optimized Approach

Maintain a prefix-product `ArrayList<Integer> s` initialized with `[1]` covering only the suffix of non-zero elements added **since the most recent `0`**. On `add(0)`, clear `s` and re-seed `[1]`; on `add(num > 0)`, append `last * num`. On `getProduct(k)`, return `0` if `s.size() <= k` (a `0` fell inside the last `k` numbers), else `s.get(n - 1) / s.get(n - k - 1)`.

### Step-by-Step Thinking Process

1. Seed `s` with `1` in the constructor so the product of `m` non-zero numbers sits at index `m` (`s.size() == m + 1`).
2. When `add(num)` receives `num != 0`, append `s.get(s.size() - 1) * num`.
3. When `add(0)` is called, every earlier element is now separated from future elements by a `0`; call `s.clear()` and `s.add(1)` to restart prefix products fresh.
4. In `getProduct(k)`, let `n = s.size()`, which means `n - 1` consecutive non-zero numbers have been added since the last `0`.
5. If `k > n - 1` (equivalently `n <= k`), the last `k` elements must include that `0`, so return `0`; otherwise return `s.get(n - 1) / s.get(n - k - 1)`.

### Algorithm / Intuition

List `s` maintains the invariant `s = [1, a_1, a_1 * a_2, ..., a_1 * ... * a_m]`, where `a_1, ..., a_m` are the `m` consecutive non-zero integers appended after the latest `0` (or since initialization). Notice `n = s.size() = m + 1`. When `n > k` (i.e., `k <= m`), the last `k` elements are `a_{m - k + 1} ... a_m`, all non-zero, so dividing `s.get(n - 1)` (`a_1 * ... * a_m`) by `s.get(n - k - 1)` (`a_1 * ... * a_{m - k}`) cancels the prefix cleanly without division by zero. When `n <= k` (`k > m`), the window reaches at least `m + 1` steps back—landing on or before the latest `0`—so the product is guaranteed to be `0`.

---

## Dry Run

Tracing the **Example** operations:

| Operation | Stream conceptually | Prefix list `s` (`n = s.size()`) | Return |
| :--- | :--- | :--- | :--- |
| `ProductOfNumbers()` | `[]` | `[1]` (`n = 1`) | `null` |
| `add(3)` | `[3]` | `[1, 3]` (`n = 2`) | `null` |
| `add(0)` | `[3, 0]` | `[1]` (`n = 1`, cleared & reset!) | `null` |
| `add(2)` | `[3, 0, 2]` | `[1, 2]` (`n = 2`) | `null` |
| `add(5)` | `[3, 0, 2, 5]` | `[1, 2, 10]` (`n = 3`) | `null` |
| `add(4)` | `[3, 0, 2, 5, 4]` | `[1, 2, 10, 40]` (`n = 4`) | `null` |
| `getProduct(2)` | last 2: `[5, 4]` | `n=4 > 2` -> `s[3] / s[1] = 40 / 2` | `20` |
| `getProduct(3)` | last 3: `[2, 5, 4]` | `n=4 > 3` -> `s[3] / s[0] = 40 / 1` | `40` |
| `getProduct(4)` | last 4: `[0, 2, 5, 4]` | `n=4 <= 4` -> window hits `0` | `0` |
| `add(8)` | `[3, 0, 2, 5, 4, 8]` | `[1, 2, 10, 40, 320]` (`n = 5`) | `null` |
| `getProduct(2)` | last 2: `[4, 8]` | `n=5 > 2` -> `s[4] / s[2] = 320 / 10` | `32` |

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — `getProduct` runs in strict `O(1)` time, and `add` runs in amortized `O(1)` time (in Java, `ArrayList.clear()` nulls current references, and each appended element is cleared at most once across the entire stream).
- **Space Complexity:** `O(N)` — `s` stores at most `N + 1` prefix products, where `N` is the number of `add` calls since the last `0`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1352product-of-the-last-k-numbers.java](./1352product-of-the-last-k-numbers.java) |

---

## Key Learnings

- Prefix products fail naively in the presence of `0` because multiplication by `0` is non-invertible, but resetting the prefix array upon seeing `0` turns `s.size()` itself into an `O(1)` zero-detector!
- Initializing `s` with `[1]` unifies full-suffix queries (`k == m`, dividing by `s.get(0) == 1`) with partial-suffix queries without extra branches.
- Replacing `s.clear(); s.add(1);` with `s = new ArrayList<>(); s.add(1);` upgrades `add(0)` from amortized `O(1)` to strict worst-case `O(1)`.
