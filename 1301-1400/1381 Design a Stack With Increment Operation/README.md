---
comments: true
difficulty: Medium
tags:
  - Array
  - Stack
  - Design
---

# 1381. Design a Stack With Increment Operation

**[View Problem on LeetCode](https://leetcode.com/problems/design-a-stack-with-increment-operation/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1381` (`1381`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Stack`, `Design` |
| **Solution Language** | JavaScript |

---

## Problem Description

Design a bounded stack class `CustomStack` supporting an additional bottom-`k` increment operation:
- `CustomStack(int maxSize)` initializes an empty stack capable of holding at most `maxSize` elements.
- `void push(int x)` pushes `x` onto the top of the stack if the current size is strictly less than `maxSize` (otherwise ignores `x`).
- `int pop()` removes and returns the top element of the stack, or returns `-1` if the stack is empty.
- `void increment(int k, int val)` adds `val` to the **bottom `k`** elements of the stack (or to **all** elements currently in the stack if fewer than `k` elements exist).

---

## Examples

### Example 1

```text
Input
["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
[[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
Output
[null,null,null,2,null,null,null,null,null,103,202,201,-1]
Explanation
CustomStack stk = new CustomStack(3); // Stack is Empty []
stk.push(1);                          // stack becomes [1]
stk.push(2);                          // stack becomes [1, 2]
stk.pop();                            // return 2 --> Return top of the stack 2, stack becomes [1]
stk.push(2);                          // stack becomes [1, 2]
stk.push(3);                          // stack becomes [1, 2, 3]
stk.push(4);                          // stack still [1, 2, 3], Do not add another elements as size is 4
stk.increment(5, 100);                // stack becomes [101, 102, 103]
stk.increment(2, 100);                // stack becomes [201, 202, 103]
stk.pop();                            // return 103 --> Return top of the stack 103, stack becomes [201, 202]
stk.pop();                            // return 202 --> Return top of the stack 202, stack becomes [201]
stk.pop();                            // return 201 --> Return top of the stack 201, stack becomes []
stk.pop();                            // return -1 --> Stack is empty return -1.
```

---

## Constraints

- `1 <= maxSize, x, k <= 1000`

- `0 <= val <= 100`

- At most `1000` calls will be made to each method of `increment`, `push` and `pop` each separately.

---

## Problem Understanding

- Backing the stack with a 0-indexed array places the **bottom** of the stack at index `0` and the **top** of the stack at index `this.top`.
- Current number of elements in the stack is `this.top + 1` (so `this.top === -1` means empty, and `this.top === maxSize - 1` means full).
- Because constraints are modest (`maxSize, k <= 1000` and at most `1000` calls per method), updating the bottom `Math.min(k, this.top + 1)` slots directly in `this.stack` takes at most `1000` additions per `increment` call (`<= 10^6` operations total).

---

## Approach

### Brute Force Approach

Using a linked-node stack or only standard LIFO stack primitives would require popping all elements into a temporary stack just to reach the bottom `k` elements and pushing them all back (`O(size)` per `increment` with heavy constant factors), whereas an array-backed stack accesses bottom indices `0..k-1` directly in place.

### Optimized Approach

Use a pre-allocated fixed-size array `this.stack` of length `maxSize` and an integer index pointer `this.top` initialized to `-1`. Implement `push` and `pop` via `O(1)` index updates on `this.top`, and implement `increment(k, val)` by looping `i` from `0` up to `Math.min(k, this.top + 1) - 1` and adding `val` directly to `this.stack[i]`.

### Step-by-Step Thinking Process

1. Pre-allocate `this.stack = new Array(maxSize).fill(0)` and track the active top index with `this.top = -1`.
2. In `push(x)`, check capacity via `if (this.top < this.stack.length - 1)`; if room exists, increment `this.top` and write `this.stack[this.top] = x`.
3. In `pop()`, if `this.top !== -1`, return `this.stack[this.top--]` (post-decrement returns the current top value and shrinks the logical stack by `1`); otherwise return `-1`.
4. In `increment(k, val)`, the current stack size is `this.top + 1`, so cap the loop bound at `Math.min(k, this.top + 1)` and add `val` to `this.stack[0 .. bound - 1]`.

### Algorithm / Intuition

Using `this.top` as a cursor inside pre-allocated `this.stack` avoids dynamic array resizing (`Array.prototype.push` / `pop` memory churn) and makes capacity checks trivial (`this.top < this.stack.length - 1`). Notice that `pop()` does not even need to zero out `this.stack[this.top]` because `increment` stops strictly at `this.top + 1`, and any future `push` overwrites `this.stack[++this.top]` completely!

---

## Dry Run

Tracing **Example 1** (`maxSize = 3`):

- `new CustomStack(3)`: `stack = [0, 0, 0]`, `top = -1`
- `push(1)` -> `top = 0`, active `stack[0..0] = [1]`
- `push(2)` -> `top = 1`, active `stack[0..1] = [1, 2]`
- `pop()` -> returns `stack[1] = 2`, `top = 0`, active `[1]`
- `push(2)` -> `top = 1`, active `[1, 2]`
- `push(3)` -> `top = 2`, active `[1, 2, 3]`
- `push(4)` -> `top < 2` is `false` -> ignored, active `[1, 2, 3]`
- `increment(5, 100)` -> `min(5, 3) = 3` -> adds `100` to indices `0, 1, 2` -> active `[101, 102, 103]`
- `increment(2, 100)` -> `min(2, 3) = 2` -> adds `100` to indices `0, 1` -> active `[201, 202, 103]`
- Four `pop()` calls -> returns `103` (`top=1`), `202` (`top=0`), `201` (`top=-1`), and `-1` (`top === -1`).

---

## Complexity Analysis

- **Time Complexity:** `O(1)` for `push` and `pop`; `O(min(k, n))` for `increment` (where `n = this.top + 1 <= maxSize` is the current stack size).
- **Space Complexity:** `O(maxSize)` — Pre-allocates a single fixed-length array `this.stack` of size `maxSize`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1381design-a-stack-with-increment-operation.js](./1381design-a-stack-with-increment-operation.js) |

---

## Key Learnings

- Array-backed stacks naturally expose `O(1)` random access to the bottom of the stack (`index 0`), making bottom-`k` updates straightforward.
- Using an explicit `top` cursor avoids mutating array length on `push`/`pop`, provided `increment` bounds its loop with `this.top + 1` rather than `this.stack.length`.
- If constraints were scaled to `maxSize, calls <= 10^5`, **lazy propagation** (storing pending increments at `inc[min(k, top + 1) - 1] += val` and propagating `inc[top]` down to `inc[top - 1]` during `pop()`) reduces `increment` to `O(1)` time as well.
