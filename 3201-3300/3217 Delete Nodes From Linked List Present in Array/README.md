---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Linked List
---

# 3217. Delete Nodes From Linked List Present in Array

**[View Problem on LeetCode](https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3217` (`3217`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Linked List` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` and the `head` of a singly linked list.

Your task is to remove every node from the linked list whose value `val` appears in `nums`.

Return the `head` of the modified linked list after removing all matching nodes. The problem guarantees that at least one node in the linked list has a value that is not present in `nums`.

---

## Examples

### Example 1

**Input:** `nums = [1,2,3], head = [1,2,3,4,5]`

**Output:** `[4,5]`

**Explanation:**

Remove the nodes with values 1, 2, and 3.

### Example 2

**Input:** `nums = [1], head = [1,2,1,2,1,2]`

**Output:** `[2,2,2]`

**Explanation:**

Remove the nodes with value 1.

### Example 3

**Input:** `nums = [5], head = [1,2,3,4]`

**Output:** `[1,2,3,4]`

**Explanation:**

No node has value 5.

---

## Constraints

- `1 <= nums.length <= 10^5`

- `1 <= nums[i] <= 10^5`

- All elements in `nums` are unique.

- The number of nodes in the given list is in the range `[1, 10^5]`.

- `1 <= Node.val <= 10^5`

- The input is generated such that there is at least one node in the linked list that has a value not present in `nums`.

---

## Problem Understanding

- **Node Filtering:** Any node where `node.val` exists in `nums` must be excised from the linked list.
- **Head Modifications:** The initial `head` node itself might have its value in `nums`, requiring the head pointer to advance to the first node with a value not in `nums`.
- **Consecutive Deletions:** Multiple adjacent nodes in the list may all contain prohibited values, requiring successive deletions without prematurely advancing the reference pointer.
- **Lookup Efficiency:** Checking membership in `nums` using a linear search would take `O(|nums|)` per node; a hash set reduces membership checks to `O(1)` on average.

---

## Approach

### Brute Force Approach

Traversing the list and checking if each node's value exists in `nums` by scanning the array takes `O(n * m)` time, where `n` is the number of nodes in the linked list and `m` is the length of `nums`. With `n, m <= 10^5`, this naive approach performs up to `10^10` operations and times out.

### Optimized Approach

We populate a `HashSet<Integer>` with all elements of `nums` in `O(m)` time. First, we advance `head` using a loop while `head != null && set.contains(head.val)` to find the new valid head. Next, we traverse the list with a pointer `temp`: if `temp.next` has a value in `set`, we bypass it by setting `temp.next = temp.next.next` and use `continue` (to check the new `temp.next` without advancing `temp`). If `temp.next` is safe, we advance `temp = temp.next`. Finally, return the updated `head`.

### Step-by-Step Thinking Process

1. Membership checking in an array is slow, so insert all elements from `nums` into a `HashSet<Integer>` for `O(1)` lookups.
2. Handle head node deletions first: while the current head has a value in the set, move `head = head.next`.
3. Traverse remaining nodes with `temp`. Look ahead at `temp.next`.
4. If `set.contains(temp.next.val)`, bypass `temp.next` by rewiring `temp.next = temp.next.next`. Do not move `temp`, since the newly linked next node must also be evaluated.
5. If `temp.next.val` is not in `set`, advance `temp = temp.next`.
6. Return `head`.

### Algorithm / Intuition

In `Solution.modifiedList`: we construct `Set<Integer> set = new HashSet()` and add every `num` in `nums`. We set `ListNode temp = head`. The first while loop advances `temp = temp.next` while `set.contains(temp.val)`, stopping at the first surviving node, which becomes `head = temp`. The second while loop inspects each successor node: if `set.contains(temp.next.val)`, it executes `temp.next = temp.next.next; continue;`. The `continue` statement is crucial: it prevents `temp` from advancing, allowing the algorithm to eliminate consecutive matching nodes. When `temp.next` does not need deletion, `temp = temp.next` progresses forward. This cleanly filters the entire list in one linear pass.

---

## Dry Run

### Step-by-Step Execution on Example 1: `nums = [1, 2, 3]`, `head = [1, 2, 3, 4, 5]`

- **Step 1: Build Set:** `set = {1, 2, 3}`.
- **Step 2: Advance Head:**
  - `temp` at node 1 (`val = 1`): in set -> `temp = temp.next` (node 2).
  - `temp` at node 2 (`val = 2`): in set -> `temp = temp.next` (node 3).
  - `temp` at node 3 (`val = 3`): in set -> `temp = temp.next` (node 4).
  - `temp` at node 4 (`val = 4`): not in set -> break.
  - `head = temp` (node 4).
- **Step 3: Remove Inner Nodes:**
  - `temp` = node 4: `temp.next` is node 5 (`val = 5`), not in set -> `temp = temp.next` (node 5).
  - `temp` = node 5: `temp.next == null` -> loop ends.
- **Result:** Return `head` = `[4, 5]`.

---

## Complexity Analysis

- **Time Complexity:** `O(m + n)` — Building the `HashSet` from `nums` takes `O(m)` time. Traversing the linked list of `n` nodes with `O(1)` set lookups takes `O(n)` time.
- **Space Complexity:** `O(m)` — The `HashSet` stores the `m` unique values from `nums`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3217delete-nodes-from-linked-list-present-in-array.java](./3217delete-nodes-from-linked-list-present-in-array.java) |

---

## Key Learnings

- Using a `HashSet` converts repeatedly checking collection membership from `O(m)` to `O(1)` per list node.
- When deleting nodes by skipping `temp.next = temp.next.next`, never advance the traversal pointer until the replacement next node has been evaluated.
