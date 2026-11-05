---
comments: true
difficulty: Medium
tags:
  - Array
  - Linked List
  - Design
  - Queue
---

# 641. Design Circular Deque

**[View Problem on LeetCode](https://leetcode.com/problems/design-circular-deque/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0641` (`641`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Linked List`, `Design`, `Queue` |
| **Solution Language** | JavaScript |

---

## Problem Description

Design and implement a fixed-capacity **circular double-ended queue (`MyCircularDeque`)** initialized with maximum capacity `k`. Support the following operations:

- `insertFront(value)`: Inserts `value` at the front; returns `true` on success or `false` if full.
- `insertLast(value)`: Inserts `value` at the rear; returns `true` on success or `false` if full.
- `deleteFront()`: Removes the front element; returns `true` on success or `false` if empty.
- `deleteLast()`: Removes the rear element; returns `true` on success or `false` if empty.
- `getFront()`: Returns the front element, or `-1` if empty.
- `getRear()`: Returns the rear element, or `-1` if empty.
- `isEmpty()` / `isFull()`: Returns whether the deque currently holds `0` or `k` elements.

---

## Examples

### Example 1

```text
Input
["MyCircularDeque", "insertLast", "insertLast", "insertFront", "insertFront", "getRear", "isFull", "deleteLast", "insertFront", "getFront"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]
Output
[null, true, true, true, false, 2, true, true, true, 4]

Explanation
MyCircularDeque myCircularDeque = new MyCircularDeque(3);
myCircularDeque.insertLast(1);  // return True
myCircularDeque.insertLast(2);  // return True
myCircularDeque.insertFront(3); // return True
myCircularDeque.insertFront(4); // return False, the queue is full.
myCircularDeque.getRear();      // return 2
myCircularDeque.isFull();       // return True
myCircularDeque.deleteLast();   // return True
myCircularDeque.insertFront(4); // return True
myCircularDeque.getFront();     // return 4
```

---

## Constraints

- `1 <= k <= 1000`

- `0 <= value <= 1000`

- At most `2000` calls will be made to `insertFront`, `insertLast`, `deleteFront`, `deleteLast`, `getFront`, `getRear`, `isEmpty`, `isFull`.

---

## Problem Understanding

- **Why Circular Indexing:** Using JavaScript's `Array.unshift()` / `Array.shift()` shifts all elements in `O(k)` time. A ring buffer wraps indices modulo `k` so both ends grow and shrink in `O(1)` time without shifting data.
- **`front` + `size` Representation:** Storing `this.front`, `this.size`, and `this.capacity` eliminates the classic ambiguity between an empty ring buffer and a full ring buffer (where `front == rear`), because `size === 0` and `size === capacity` distinguish them cleanly and `rear` is always derived on demand.

---

## Approach

### Brute Force Approach

Backing the deque with a plain dynamic array and calling `unshift()` for `insertFront` and `shift()` for `deleteFront` copies up to `k` elements per front operation, degrading each call to `O(k)` time instead of `O(1)`.

### Optimized Approach

Use a fixed-size array `this.q = new Array(k)` as a **Circular Ring Buffer** parameterized by `this.front` and `this.size`, computing rear positions dynamically via modular arithmetic `(this.front + this.size - 1) % this.capacity`.

### Step-by-Step Thinking Process

1. Allocate `this.q = new Array(k)`, set `this.front = 0`, `this.size = 0`, and `this.capacity = k`.
2. Maintain the invariant that when `size > 0`, the `size` active elements occupy indices `front`, `(front + 1) % k`, ..., `(front + size - 1) % k`.
3. For `insertLast(value)`: if not full, write directly to `(front + size) % capacity` and increment `size` (Notice when `size === 0`, this writes right at `front`!).
4. For `insertFront(value)`: if not full, step `front` backward via `(front - 1 + capacity) % capacity` *only when `!isEmpty()`* (when empty, writing directly at `front` keeps the invariant aligned with `size = 1`), write `value`, and increment `size`.
5. For `deleteFront()`, advance `front = (front + 1) % capacity` and decrement `size`; for `deleteLast()`, simply decrement `size`!

### Algorithm / Intuition

All active deque elements live in a contiguous modular window starting at `this.front` of length `this.size`:
- **Front element:** `this.q[this.front]`.
- **Rear element:** `this.q[(this.front + this.size - 1) % this.capacity]`.
- **Next free rear slot:** `(this.front + this.size) % this.capacity`.

Notice the subtle guard `if (!this.isEmpty())` inside `insertFront`: when `size === 0`, `insertFront` places the single element at `this.front` without decrementing `this.front`, so that both `getFront()` (`q[front]`) and `getRear()` (`q[(front + 1 - 1) % k] = q[front]`) agree on the exact same slot!

---

## Dry Run

Tracing Example 1 (`k = 3`, `q = [_, _, _]`, `front = 0`, `size = 0`):

| Call | Action & State (`q`, `front`, `size`) | Return |
| :--- | :--- | :--- |
| `insertLast(1)` | `idx = (0+0)%3 = 0` -> `q=[1,_,_]`, `front=0`, `size=1` | `true` |
| `insertLast(2)` | `idx = (0+1)%3 = 1` -> `q=[1,2,_]`, `front=0`, `size=2` | `true` |
| `insertFront(3)` | `!empty`: `front = (0-1+3)%3 = 2` -> `q=[1,2,3]`, `front=2`, `size=3` | `true` |
| `insertFront(4)` | `isFull()` (`size === 3`) | `false` |
| `getRear()` | `idx = (2+3-1)%3 = 1` -> `q[1]` | `2` |
| `isFull()` | `3 === 3` | `true` |
| `deleteLast()` | `size` becomes `2` (active: `q[2]=3, q[0]=1`) | `true` |
| `insertFront(4)` | `!empty`: `front = (2-1+3)%3 = 1` -> `q=[1,4,3]`, `front=1`, `size=3` | `true` |
| `getFront()` | `q[front] = q[1]` | `4` |

---

## Complexity Analysis

- **Time Complexity:** `O(1)` per operation — Every insert, delete, and query performs constant-time modular arithmetic (`O(k)` once in the constructor to allocate `new Array(k)`).
- **Space Complexity:** `O(k)` — The backing ring buffer `this.q` has fixed length `k`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [641design-circular-deque.js](./641design-circular-deque.js) |

---

## Key Learnings

- Tracking `(front, size)` instead of `(front, rear)` simplifies ring-buffer boundary logic: `deleteLast()` becomes a single `this.size--` statement!
- In JavaScript, `-1 % k` evaluates to `-1` (negative remainder), so always add `this.capacity` before taking modulo when stepping backward: `(this.front - 1 + this.capacity) % this.capacity`.
- Whenever `size === 0` in a `(front, size)` design, make sure `insertFront` and `insertLast` agree on where the single element at `size = 1` resides.
