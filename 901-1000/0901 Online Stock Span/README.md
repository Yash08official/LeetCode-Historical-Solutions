---
comments: true
difficulty: Medium
tags:
  - Stack
  - Design
  - Monotonic Stack
  - Data Stream
---

# 901. Online Stock Span

**[View Problem on LeetCode](https://leetcode.com/problems/online-stock-span/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0901` (`901`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Stack`, `Design`, `Monotonic Stack`, `Data Stream` |
| **Solution Language** | Java |

---

## Problem Description

Design a `StockSpanner` class that processes a stream of daily stock prices and returns the **span** of today's price on each call.

The **span** of today's stock price is the maximum number of consecutive days ending today (including today itself, counting backward) on which the stock price was **less than or equal to** today's price.

Implement:
- `StockSpanner()`: Initializes the spanner object.
- `int next(int price)`: Records today's `price` and returns its span.

---

## Examples

### Example 1

```text
Input
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
Output
[null, 1, 1, 1, 2, 1, 4, 6]

Explanation
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2
stockSpanner.next(60);  // return 1
stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
stockSpanner.next(85);  // return 6
```

---

## Constraints

- `1 <= price <= 10^5`

- At most `10^4` calls will be made to `next`.

---

## Problem Understanding

- **Self-Inclusion:** Today's price is always `<= price`, so the minimum possible span returned by `next(price)` is `1`.
- **Transitivity of Dominance:** Suppose yesterday's price `p_prev <= price` had a span of `s_prev` consecutive days. Every one of those `s_prev` days had price `<= p_prev <= price`, and the day right before that block had price `> p_prev`! Therefore, we can absorb all `s_prev` days at once and never need to inspect individual days inside that block again.
- **Online Stream:** Prices arrive one at a time via up to `10^4` calls to `next`.

---

## Approach

### Brute Force Approach

Store all historical prices in an `ArrayList` and, on each `next(price)` call, scan backward from the end while `list.get(i) <= price`. If prices arrive in strictly increasing order (`1, 2, 3, ..., N`), each call scans the entire history, taking `O(N)` per call and `O(N^2)` total time.

### Optimized Approach

Maintain a **Monotonic Decreasing Stack** using two synchronized stacks (`prices` and `spans`). When `next(price)` arrives, pop all top entries with `prices.peek() <= price`, summing their `spans` into today's `span`, and push `(price, span)`.

### Step-by-Step Thinking Process

1. Notice that once an earlier day with price `<= price` is absorbed into today's span, any future day `price_future`: (a) if `price_future < price`, stops immediately at today anyway; (b) if `price_future >= price`, absorbs today's aggregated `span` which already counts that earlier day.
2. Thus, dominated days (`<= price`) never need to be stored individually again—we only need to keep strictly decreasing historical price peaks alongside their accumulated spans.
3. Use two stacks `prices` and `spans` initialized in `StockSpanner()`.
4. In `next(price)`, start `span = 1`, loop `while (!prices.isEmpty() && prices.peek() <= price)` adding `spans.pop()` and popping `prices`, then push `price` and `span`.

### Algorithm / Intuition

In `StockSpanner`, `prices` stores a strictly decreasing sequence of un-dominated historical prices (from bottom to top), and `spans` stores the exact span of each corresponding entry.

When `next(price)` is called:
1. `span` starts at `1` (counting today).
2. While `prices.peek() <= price`, that top historical day—and every consecutive day already folded into its `spans.peek()`—had a price `<= prices.peek() <= price`. Popping both stacks and adding `spans.pop()` jumps backward across the entire block in `O(1)` time.
3. The loop stops either when `prices` becomes empty (all prior days were `<= price`) or at the nearest previous day strictly greater than `price`. Pushing `price` and `span` restores the strictly decreasing invariant.

---

## Dry Run

Trace on **Example 1**: `prices` stream `[100, 80, 60, 70, 60, 75, 85]`

| Call `next(price)` | Popped `(price, span)` Pairs | Computed `span` | Stacks After Push `(price:span)` (bottom -> top) | Return |
| :--- | :--- | :--- | :--- | :--- |
| `next(100)` | none | `1` | `[(100:1)]` | `1` |
| `next(80)` | none (`100 > 80`) | `1` | `[(100:1), (80:1)]` | `1` |
| `next(60)` | none (`80 > 60`) | `1` | `[(100:1), (80:1), (60:1)]` | `1` |
| `next(70)` | `(60, 1)` | `1 + 1 = 2` | `[(100:1), (80:1), (70:2)]` | `2` |
| `next(60)` | none (`70 > 60`) | `1` | `[(100:1), (80:1), (70:2), (60:1)]` | `1` |
| `next(75)` | `(60, 1)`, `(70, 2)` | `1 + 1 + 2 = 4` | `[(100:1), (80:1), (75:4)]` | `4` |
| `next(85)` | `(75, 4)`, `(80, 1)` | `1 + 4 + 1 = 6` | `[(100:1), (85:6)]` | `6` |

---

## Complexity Analysis

- **Time Complexity:** `O(1)` amortized per `next` call (`O(N)` total for `N` calls) — Every price is pushed onto `prices` and `spans` once and popped at most once.
- **Space Complexity:** `O(N)` — In the worst case of strictly decreasing prices, the stacks hold all `N` elements.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [901online-stock-span.java](./901online-stock-span.java) |

---

## Key Learnings

- Online 'Previous Greater Element' queries are the textbook use case for a monotonic decreasing stack.
- Compressing contiguous segments into `(price, span)` pairs lets you answer distance/span queries without tracking explicit day indices.
- In production Java, `ArrayDeque<int[]>` is often preferred over legacy `java.util.Stack` to avoid synchronization overhead, though the algorithmic complexity is identical.
