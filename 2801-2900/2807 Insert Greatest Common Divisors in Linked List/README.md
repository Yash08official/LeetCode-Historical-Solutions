---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Math
  - Number Theory
---

# 2807. Insert Greatest Common Divisors in Linked List

**[View Problem on LeetCode](https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2807` (`2807`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Math`, `Number Theory` |
| **Solution Language** | JavaScript |

---

## Problem Description

We are given the `head` of a singly linked list where each node contains a positive integer `val`.

Between every pair of adjacent nodes in the linked list, we must insert a new node whose value is equal to the **greatest common divisor (GCD)** of the values of those two adjacent nodes.

We need to return the modified linked list after all insertions are complete.

---

## Examples

### Example 1

```text
Input: head = [18,6,10,3]
Output: [18,6,6,2,10,1,3]
Explanation: The 1^st diagram denotes the initial linked list and the 2^nd diagram denotes the linked list after inserting the new nodes (nodes in blue are the inserted nodes).
- We insert the greatest common divisor of 18 and 6 = 6 between the 1^st and the 2^nd nodes.
- We insert the greatest common divisor of 6 and 10 = 2 between the 2^nd and the 3^rd nodes.
- We insert the greatest common divisor of 10 and 3 = 1 between the 3^rd and the 4^th nodes.
There are no more adjacent nodes, so we return the linked list.
```

### Example 2

```text
Input: head = [7]
Output: [7]
Explanation: The 1^st diagram denotes the initial linked list and the 2^nd diagram denotes the linked list after inserting the new nodes.
There are no pairs of adjacent nodes, so we return the initial linked list.
```

---

## Constraints

- The number of nodes in the list is in the range `[1, 5000]`.

- `1 <= Node.val <= 1000`

---

## Problem Understanding

Key considerations:
- If the list has only 1 node, there are no adjacent pairs, so the list remains unchanged.
- For a list of $n$ nodes, exactly $n - 1$ new GCD nodes will be inserted, resulting in $2n - 1$ nodes total.
- The insertions must be performed between original adjacent nodes: `pre -> gcdNode -> cur`.
- After inserting, `pre` moves to `cur`, and `cur` moves to `cur.next` to continue to the next original adjacent pair.
- Node values are up to 1000, so GCD computation via the Euclidean algorithm takes very few steps.

---

## Approach

### Brute Force Approach

A naive approach might convert the entire linked list into an array, compute the GCDs, construct a new array with interleaved GCD values, and rebuild an entirely new linked list from scratch. While $O(N)$, it wastes $O(N)$ extra memory allocating intermediate arrays and nodes. The in-place pointer insertion method is cleaner and reuses all existing nodes.

### Optimized Approach

The solution iterates through the linked list with two pointers, `pre` and `cur` (initially `head` and `head.next`):
1. While `cur !== null`, compute `x = gcd(pre.val, cur.val)` using the Euclidean algorithm.
2. Insert a new node: `pre.next = new ListNode(x, cur)`.
3. Advance pointers: `pre = cur` and `cur = cur.next`.
4. Return `head`.

### Step-by-Step Thinking Process

1. Use two pointers: `pre` tracking the left node and `cur` tracking the right node of an adjacent pair.
2. Implement helper `gcd(a, b)` using Euclidean algorithm: `if (b === 0) return a; return gcd(b, a % b);`.
3. Inside the loop `while (cur !== null)`, calculate `x = gcd(pre.val, cur.val)`.
4. Create a new node `new ListNode(x, cur)` and link it after `pre`: `pre.next = new ListNode(x, cur)`.
5. Advance pointers past the newly inserted node: `pre = cur`, `cur = cur.next`.
6. Return the original `head`.

### Algorithm / Intuition

We maintain `pre` and `cur` as pointers to the two consecutive nodes being considered. By setting `pre.next = new ListNode(x, cur)`, the new node is spliced directly between `pre` and `cur`. Crucially, advancing `pre = cur` and `cur = cur.next` moves the sliding pair to the next original pair in the list, completely skipping over the newly created node so we do not erroneously compute GCDs with the newly inserted nodes.

---

## Dry Run

We trace Example 1 with `head = [18, 6, 10, 3]`:

- Initialize: `pre = Node(18)`, `cur = Node(6)`.
- Iteration 1:
  - `gcd(18, 6) = 6`.
  - Insert node `6`: `18 -> 6 -> 6`.
  - Advance: `pre = Node(6)`, `cur = Node(10)`.
- Iteration 2:
  - `gcd(6, 10) = 2`.
  - Insert node `2`: `6 -> 2 -> 10`.
  - Advance: `pre = Node(10)`, `cur = Node(3)`.
- Iteration 3:
  - `gcd(10, 3) = 1`.
  - Insert node `1`: `10 -> 1 -> 3`.
  - Advance: `pre = Node(3)`, `cur = null`.
- Loop terminates. List is `18 -> 6 -> 6 -> 2 -> 10 -> 1 -> 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n \log(\min(V)))` where `n` is the number of nodes in the linked list and $V \le 1000$ is the node value. Euclidean GCD on numbers $\le 1000$ takes at most $\approx 10$ steps, making each insertion practically $O(1)$.
- **Space Complexity:** `O(1)` auxiliary memory (excluding the $n - 1$ required output nodes).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2807insert-greatest-common-divisors-in-linked-list.js](./2807insert-greatest-common-divisors-in-linked-list.js) |

---

## Key Learnings

- In linked list splicing, passing `cur` as the `next` parameter to `new ListNode(val, next)` simplifies pointer rewiring to a single line.
- Careful pointer advancement (`pre = cur; cur = cur.next`) avoids infinite loops and skips newly inserted nodes.
- The Euclidean algorithm computes the greatest common divisor in logarithmic time with minimal code.
