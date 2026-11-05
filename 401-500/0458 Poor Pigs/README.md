---
comments: true
difficulty: Hard
tags:
  - Math
  - Dynamic Programming
  - Combinatorics
---

# 458. Poor Pigs

**[View Problem on LeetCode](https://leetcode.com/problems/poor-pigs/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0458` (`458`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Math`, `Dynamic Programming`, `Combinatorics` |
| **Solution Language** | Java |

---

## Problem Description

You have `buckets` buckets of liquid, **exactly one** of which is poisonous. You can test the buckets in sequential rounds using live pigs within a total time budget of `minutesToTest` minutes.

In each round:
- Each live pig can drink a mixture from any subset of buckets simultaneously (taking `0` minutes).
- You must wait `minutesToDie` minutes to observe which pigs die (any pig that drank from the poisonous bucket dies at the end of the round; survivors continue to the next round).

Return the **minimum number of pigs** required to uniquely identify the poisonous bucket within `minutesToTest` minutes.

---

## Examples

### Example 1

```text
Input: buckets = 4, minutesToDie = 15, minutesToTest = 15
Output: 2
Explanation: We can determine the poisonous bucket as follows:
At time 0, feed the first pig buckets 1 and 2, and feed the second pig buckets 2 and 3.
At time 15, there are 4 possible outcomes:
- If only the first pig dies, then bucket 1 must be poisonous.
- If only the second pig dies, then bucket 3 must be poisonous.
- If both pigs die, then bucket 2 must be poisonous.
- If neither pig dies, then bucket 4 must be poisonous.
```

### Example 2

```text
Input: buckets = 4, minutesToDie = 15, minutesToTest = 30
Output: 2
Explanation: We can determine the poisonous bucket as follows:
At time 0, feed the first pig bucket 1, and feed the second pig bucket 2.
At time 15, there are 2 possible outcomes:
- If either pig dies, then the poisonous bucket is the one it was fed.
- If neither pig dies, then feed the first pig bucket 3, and feed the second pig bucket 4.
At time 30, one of the two pigs must die, and the poisonous bucket is the one it was fed.
```

---

## Constraints

- `1 <= buckets <= 1000`

- `1 <= minutesToDie <= minutesToTest <= 100`

---

## Problem Understanding

- **Number of rounds:** Within `minutesToTest` minutes, with each test taking `minutesToDie` minutes, you can run `T = minutesToTest / minutesToDie` complete rounds.
- **Information states per pig:** Across `T` rounds, a single pig has `base = T + 1` distinct observable outcomes: it dies in round `1`, dies in round `2`, ..., dies in round `T`, or survives all `T` rounds!
- **Base-`(T + 1)` encoding:** With `k` pigs, the joint outcome across all pigs is a `k`-digit tuple where each digit has `base = T + 1` possibilities, giving `base^k` distinguishable outcomes.
- **Constructive validity:** Labeling each bucket `0 .. buckets - 1` in base `(T + 1)` with `k` digits and feeding bucket `b` to pig `i` in round `r` (`1 <= r <= T`) whenever the `i`-th digit of `b` equals `r` guarantees that the observed death round of each pig reconstructs the exact base-`(T + 1)` digits of the poisoned bucket!

---

## Approach

### Brute Force Approach

Testing one bucket per pig per round without mixing liquids allows `k` pigs in `T` rounds to check only `k * T + 1` buckets, vastly overestimating the required number of pigs.

Alternatively, attempting dynamic programming over `(remaining_buckets, remaining_pigs, remaining_rounds)` using binomial coefficients `sum C(k, d) * dp(...)` works, but performs unnecessary combinatorial table work when a closed-form power relationship exists.

### Optimized Approach

Use **Information Theory / Radix State Counting**: compute `base = minutesToTest / minutesToDie + 1`, and multiply `p` by `base` starting from `p = 1` until `p >= buckets`, counting the exponent `res`.

### Step-by-Step Thinking Process

1. Determine how many full observation windows fit into the total time: `T = minutesToTest / minutesToDie`.
2. Recognize that each pig acts as an independent `(T + 1)`-state sensor (`base = T + 1`): dying in any of the `T` rounds or surviving.
3. With `res` pigs, we can distinguish at most `base^res` buckets. Conversely, any `buckets <= base^res` can be uniquely identified by assigning each bucket a unique `res`-digit base-`(T + 1)` coordinate.
4. Instead of computing `Math.ceil(Math.log(buckets) / Math.log(base))`—which can produce subtle IEEE-754 floating-point rounding errors (for instance `Math.log(125) / Math.log(5)` evaluating to `3.0000000000000004`)—iteratively multiply `p *= base` starting from `p = 1` while `p < buckets`.

### Algorithm / Intuition

In `poorPigs(int buckets, int minutesToDie, int minutesToTest)`:
- `int base = minutesToTest / minutesToDie + 1;` calculates the number of states one pig can encode (`>= 2` since `minutesToDie <= minutesToTest`).
- `res` starts at `0` and `p` starts at `1` (`base^0 = 1`, handling the edge case `buckets == 1` where `0` pigs are needed because the sole bucket is known to be poisonous).
- Each iteration of `for (int p = 1; p < buckets; p *= base)` increments `++res`, finding the smallest integer `res` satisfying `base^res >= buckets` using exact integer arithmetic.

---

## Dry Run

Tracing **Example 1** with `buckets = 4`, `minutesToDie = 15`, `minutesToTest = 15`:

1. Compute `base = 15 / 15 + 1 = 2`, initialize `res = 0`.
2. **Iteration 1:** `p = 1 < 4` -> `++res` (`res = 1`), `p *= 2` (`p = 2`).
3. **Iteration 2:** `p = 2 < 4` -> `++res` (`res = 2`), `p *= 2` (`p = 4`).
4. **Loop check:** `p = 4 < 4` is `false`; loop terminates.
5. Returns `res = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(log(buckets))` — Specifically `O(log_{base}(buckets))` multiplications; since `buckets <= 1000` and `base >= 2`, the loop runs at most 10 times.
- **Space Complexity:** `O(1)` — Uses only three integer variables (`base`, `res`, `p`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [458poor-pigs.java](./458poor-pigs.java) |

---

## Key Learnings

- Viewing sequential multi-round tests through an information-theoretic lens maps each test subject's survival timeline to a digit in base `(rounds + 1)`.
- Computing integer logarithms via repeated multiplication (`p *= base`) completely avoids floating-point precision bugs inherent in `Math.ceil(Math.log(a) / Math.log(b))`.
- When `buckets == 1`, zero tests (and `0` pigs) are needed because the single bucket is guaranteed to be the poisonous one.
