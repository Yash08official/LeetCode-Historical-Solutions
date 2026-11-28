---
comments: true
difficulty: Medium
tags:
  - Array
  - Greedy
  - Sorting
  - Heap (Priority Queue)
---

# 3947. Maximum Number of Items From Sale II

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-number-of-items-from-sale-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3947` (`3947`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Greedy`, `Sorting`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 2D integer array `items`, where `items[i] = [factori, pricei]` represents the `i^th` item. You are also given an integer `budget`.

There are unlimited copies of each item available for purchase. You may buy any number of copies of any items such that the total cost of the purchased copies is at most `budget`.

After buying items, you may receive free copies according to the following rules:

	- Each purchased copy of item `i` can give you **at most one** free copy of another item `j`.

	- The free item must satisfy `i != j` and `factori` divides `factorj`.

	- For each ordered pair `(i, j)`, you can receive a free copy of item `j` from purchases of item `i` **at most once**, regardless of how many copies of item `i` you buy.

	- The same item `j` can be received multiple times for free if it is received from purchases of different item types.

Return the **maximum total number of item copies** you can obtain, including both purchased copies and free copies, while spending at most `budget` on purchased items.

---

## Examples

### Example 1

**Input:** items = [[1,6],[2,4],[3,5]], budget = 19

**Output:** 5

**Explanation:**

	- You can buy 2 copies of item 0 and 1 copy of item 1 for a total cost of `2 * 6 + 4 = 16`, which is not greater than `budget = 19`.

	- One purchased copy of item 0 gives 1 free copy of item 1, because `factor0 = 1` divides `factor1 = 2`.

	- The other purchased copy of item 0 gives 1 free copy of item 2, because `factor0 = 1` divides `factor2 = 3`.

	- You leave with 3 purchased copies and 2 free copies, for a total of 5 item copies.

### Example 2

**Input:** items = [[2,8],[1,10],[6,6],[4,12],[5,20],[5,17]], budget = 35

**Output:** 7

**Explanation:**

	- You can buy 2 copies of item 0, 1 copy of item 1, and 1 copy of item 2 for a total cost of `2 * 8 + 10 + 6 = 32`, which is not greater than `budget = 35`.

	- One purchased copy of item 0 gives 1 free copy of item 2, because `factor0 = 2` divides `factor2 = 6`.

	- The other purchased copy of item 0 gives 1 free copy of item 3, because `factor0 = 2` divides `factor3 = 4`.

	- The purchased copy of item 1 gives 1 free copy of item 2, because `factor1 = 1` divides `factor2 = 6`.

	- Buying item 2 gives no free copy, because `factor2 = 6` does not divide the factor of any other item.

	- You leave with 4 purchased copies and 3 free copies, for a total of 7 item copies.

 

**

---

## Constraints

**

	- `1 <= items.length <= 10^5`

	- `items[i] = [factori, pricei]`

	- `1 <= factori <= items.length`

	- `1 <= pricei <= 10^9`

	- `1 <= budget <= 10^9`

---

## Problem Understanding

- Maximize the total number of items obtained from a sale within `budget`, where items can grant free copies of other items sharing compatible factors and remaining funds can be spent on the cheapest item.

---

## Approach

### Optimized Approach (Factor Sieve Multiples + Greedy Boost Selection)
1. Tally factor frequencies `freq` and track global minimum price `minPrice`.
2. For each factor $1 \le f \le n$, count total multiples in $O(n/f)$ harmonic series steps to precalculate free bonus opportunities `gain[factor] = count - 1`.
3. Sort items ascending by price.
4. Iterate through items: if `price > 2 * minPrice`, buying a boosted item is less cost-effective than simply buying two copies of the cheapest item; break early.
5. Otherwise greedily take up to `available` boosted copies within remaining budget, adding `take * 2` items.
6. Spend any remaining budget on the cheapest item: `total += remainingBudget / minPrice`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log n)$ — harmonic sieve takes $O(n \log n)$ and sorting takes $O(n \log n)$.
- **Space Complexity:** $O(n)$ for factor frequency and gain arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3947maximum-number-of-items-from-sale-ii.java](./3947maximum-number-of-items-from-sale-ii.java) |

---

## Key Learnings

- Harmonic sieve precomputation coupled with an exchange argument (`price <= 2 * minPrice`) makes greedy selection optimal over knapsack DP.
