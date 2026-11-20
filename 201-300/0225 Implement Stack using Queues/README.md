---
comments: true
difficulty: Easy
tags:
  - Stack
  - Design
  - Queue
---

# 225. Implement Stack using Queues

**[View Problem on LeetCode](https://leetcode.com/problems/implement-stack-using-queues/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0225` (`225`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Stack`, `Design`, `Queue` |
| **Solution Language** | Java |

---

## Problem Description

Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, and `empty`).

Implement the `MyStack` class:

	
- `void push(int x)` Pushes element x to the top of the stack.
	
- `int pop()` Removes the element on the top of the stack and returns it.
	
- `int top()` Returns the element on the top of the stack.
	
- `boolean empty()` Returns `true` if the stack is empty, `false` otherwise.

Notes:

	
- You must use **only** standard operations of a queue, which means that only `push to back`, `peek/pop from front`, `size` and `is empty` operations are valid.
	
- Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.

---

## Examples

### Example 1

```text
**Input**
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
**Output**
[null, null, null, 2, 2, false]

**Explanation**
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // return 2
myStack.pop(); // return 2
myStack.empty(); // return False
```

 

**

---

## Constraints

**

	
- `1 <= x <= 9`
	
- At most `100` calls will be made to `push`, `pop`, `top`, and `empty`.
	
- All the calls to `pop` and `top` are valid.

 

**Follow-up:** Can you implement the stack using only one queue?

---

## Problem Understanding

- Implement a LIFO stack (`push`, `pop`, `top`, `empty`) using only standard FIFO queue operations.

---

## Approach

### Optimized Approach (Two Queues — Push-Heavy Reordering)
1. Maintain primary queue `q1` (front = stack top) and helper queue `q2`.
2. On `push(x)`: enqueue `x` into `q2`, drain all elements from `q1` into `q2`, then swap `q1` and `q2`.
3. `pop()` and `top()` simply call `q1.poll()` and `q1.peek()` in $O(1)$.

---

## Complexity Analysis

- **Time Complexity:** `push`: $O(n)$; `pop`, `top`, `empty`: $O(1)$.\n- **Space Complexity:** $O(n)$ — Elements stored in `q1`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [225implement-stack-using-queues.java](./225implement-stack-using-queues.java) |

---

## Key Learnings

- Reordering on `push` keeps the stack top always at the front of the primary queue for $O(1)$ reads and pops.
