---
comments: true
difficulty: Hard
tags:
  - Two Pointers
  - Design
  - Sorting
  - Heap (Priority Queue)
  - Data Stream
---

# 295. Find Median from Data Stream

**[View Problem on LeetCode](https://leetcode.com/problems/find-median-from-data-stream/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0295` (`295`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Two Pointers`, `Design`, `Sorting`, `Heap (Priority Queue)`, `Data Stream` |
| **Solution Language** | Java |

---

## Problem Description

Design a `MedianFinder` data structure that processes a dynamic stream of integers and computes the median of all numbers inserted so far:

- `MedianFinder()` initializes an empty structure.
- `void addNum(int num)` inserts `num` into the collection.
- `double findMedian()` returns the middle value if the current count of elements is odd, or the average of the two middle values if the count is even.

---

## Examples

### Example 1

```text
Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
```

---

## Constraints

- `-10^5 <= num <= 10^5`

- There will be at least one element in the data structure before calling `findMedian`.

- At most `5 * 10^4` calls will be made to `addNum` and `findMedian`.

---

## Follow-up Questions

- If all integer numbers from the stream are in the range `[0, 100]`, how would you optimize your solution?

- If `99%` of all integer numbers from the stream are in the range `[0, 100]`, how would you optimize your solution?

1. **All numbers in `[0, 100]`:** Replace the heaps with a fixed frequency array `int[] count = new int[101]` and an integer `total`. `addNum` increments `count[num]` and `total` in `O(1)`, and `findMedian` walks `0..100` accumulating frequencies until reaching `total / 2` in `O(101) = O(1)` time and `O(1)` space.
2. **`99%` of numbers in `[0, 100]`:** Because `99%` of elements lie inside `[0, 100]`, the median (`50th` percentile) is guaranteed to fall inside `[0, 100]` (except possibly among the very first few elements before the `99%` distribution settles, which can be tracked with two small `TreeMap`s or heaps for `< 0` and `> 100` outliers alongside `count[101]`). Usually, two simple counters `lessThanZero` and `greaterThan100` plus `count[101]` suffice!

---

## Problem Understanding

- The median depends only on the central one or two elements of the sorted order—we do not need random access to arbitrary ranks.
- Splitting the stream into two balanced halves—a **lower half** where we only need its maximum, and an **upper half** where we only need its minimum—maps directly to a Max-Heap and a Min-Heap.
- With up to `5 * 10^4` operations, `O(n)` insertion or `O(n log n)` sorting per query is too slow; `O(log n)` insertion and `O(1)` median lookup are ideal.

---

## Approach

### Brute Force Approach

Appending each number to a dynamic list in `O(1)` and sorting the list inside `findMedian()` costs `O(n log n)` per query. Even maintaining a sorted `ArrayList` via binary search still requires `O(n)` element shifting on every `addNum`, leading to `O(n^2)` total time over `n` insertions.

### Optimized Approach

Maintain two priority queues—a max-heap `maxQ` for the smaller half of elements and a min-heap `minQ` for the larger half—keeping their sizes balanced such that `minQ.size()` equals either `maxQ.size()` (even total) or `maxQ.size() + 1` (odd total).

### Step-by-Step Thinking Process

1. Create `minQ` (standard Java min-heap) to store the upper half of numbers, and `maxQ` (`Collections.reverseOrder()`) to store the lower half.
2. Establish two invariants: (1) every element in `maxQ` is `<=` every element in `minQ`, and (2) `0 <= minQ.size() - maxQ.size() <= 1`.
3. On `addNum(num)`, push `num` into `maxQ` first, then immediately move `maxQ.poll()` (the largest element in the lower half) into `minQ`. This guarantees ordering invariant (1) always holds.
4. Check size balance: if `minQ.size() - maxQ.size() > 1`, move `minQ.poll()` back into `maxQ` to restore invariant (2).
5. On `findMedian()`, if `minQ.size() == maxQ.size()`, return `(minQ.peek() + maxQ.peek()) / 2.0`; otherwise `minQ` holds the extra middle element, so return `minQ.peek()`.

### Algorithm / Intuition

Routing every new number through `maxQ` -> `minQ` avoids messy `if/else` value comparisons against heap tops! Even if `num` belongs in the upper half, pushing it to `maxQ` makes `num` the maximum of `maxQ`, so `maxQ.poll()` immediately forwards `num` to `minQ`. Conversely, if `num` belongs in the lower half, `maxQ.poll()` evicts the old largest element of `maxQ` into `minQ`. Finally, rebalancing whenever `minQ` exceeds `maxQ` by more than `1` ensures `minQ.peek()` is always the exact median for odd counts.

---

## Dry Run

Tracing **Example 1** (`addNum(1)`, `addNum(2)`, `findMedian()`, `addNum(3)`, `findMedian()`):

1. `addNum(1)`:
   - `maxQ.offer(1)` -> `maxQ=[1]`; `minQ.offer(maxQ.poll())` -> `maxQ=[]`, `minQ=[1]`.
   - `minQ.size() - maxQ.size() = 1 <= 1` (no rebalance).
2. `addNum(2)`:
   - `maxQ.offer(2)` -> `maxQ=[2]`; `minQ.offer(maxQ.poll())` -> `maxQ=[]`, `minQ=[1, 2]`.
   - `minQ.size() - maxQ.size() = 2 > 1` -> `maxQ.offer(minQ.poll())` -> `maxQ=[1]`, `minQ=[2]`.
3. `findMedian()`:
   - Sizes equal (`1 == 1`) -> `(minQ.peek() + maxQ.peek()) / 2.0 = (2 + 1) / 2.0 = 1.5`.
4. `addNum(3)`:
   - `maxQ.offer(3)` -> `maxQ=[3, 1]`; `minQ.offer(maxQ.poll())` -> `maxQ=[1]`, `minQ=[2, 3]`.
   - Size difference is `2 - 1 = 1 <= 1`.
5. `findMedian()`:
   - Sizes unequal (`2 != 1`) -> returns `minQ.peek() = 2.0`.

---

## Complexity Analysis

- **Time Complexity:** `O(log n)` per `addNum` and `O(1)` per `findMedian` — `addNum` performs at most 3 heap insertions/removals of `O(log n)` each, while `findMedian` only peeks at heap roots.
- **Space Complexity:** `O(n)` — Across both heaps `minQ` and `maxQ`, every inserted integer is stored once.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [295find-median-from-data-stream.java](./295find-median-from-data-stream.java) |

---

## Key Learnings

- The two-heap pattern (`maxHeap` for lower half + `minHeap` for upper half) dynamically tracks any fixed quantile (like the median) in `O(log n)` update and `O(1)` query time.
- Unconditionally routing insertions through one heap into the other (`maxQ` -> `minQ`) eliminates edge-case checks on empty heaps during the first few insertions.
- Dividing by `2.0` (floating-point literal) also prevents integer overflow because `minQ.peek() + maxQ.peek()` is safe within `-10^5 .. 10^5` (use `(minQ.peek() + 0.0 + maxQ.peek()) / 2.0` if inputs could reach `Integer.MAX_VALUE`).
