---
comments: true
difficulty: Easy
tags:
  - Stack
  - Design
  - Queue
---

# 232. Implement Queue using Stacks

**[View Problem on LeetCode](https://leetcode.com/problems/implement-queue-using-stacks/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0232` (`232`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Stack`, `Design`, `Queue` |
| **Solution Language** | Java |

---

## Problem Description

Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

Implement the `MyQueue` class:

	
- `void push(int x)` Pushes element x to the back of the queue.
	
- `int pop()` Removes the element from the front of the queue and returns it.
	
- `int peek()` Returns the element at the front of the queue.
	
- `boolean empty()` Returns `true` if the queue is empty, `false` otherwise.

**Notes:**

	
- You must use **only** standard operations of a stack, which means only `push to top`, `peek/pop from top`, `size`, and `is empty` operations are valid.
	
- Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.

---

## Examples

### Example 1

```text
**Input**
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
**Output**
[null, null, null, 1, 1, false]

**Explanation**
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
```

 

**

---

## Constraints

**

	
- `1 <= x <= 9`
	
- At most `100` calls will be made to `push`, `pop`, `peek`, and `empty`.
	
- All the calls to `pop` and `peek` are valid.

 

**Follow-up:** Can you implement the queue such that each operation is **amortized** `O(1)` time complexity? In other words, performing `n` operations will take overall `O(n)` time even if one of those operations may take longer.

---

## Problem Understanding

- Implement a FIFO queue (`push`, `pop`, `peek`, `empty`) using only two LIFO stacks.

---

## Approach

### Optimized Approach (Two Stacks — Lazy Amortized Transfer)
1. `push(x)` always pushes onto input stack `stk1`.
2. `move()` transfers all elements from `stk1` to output stack `stk2` only when `stk2` is empty, reversing their order into FIFO.
3. `pop()` and `peek()` call `move()` then operate on `stk2`.

---

## Complexity Analysis

- **Time Complexity:** Amortized $O(1)$ per operation (each element is pushed and popped at most twice).\n- **Space Complexity:** $O(n)$ across `stk1` and `stk2`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [232implement-queue-using-stacks.java](./232implement-queue-using-stacks.java) |

---

## Key Learnings

- Lazy stack transfer achieves amortized $O(1)$ queue operations without eager copying on every push.
