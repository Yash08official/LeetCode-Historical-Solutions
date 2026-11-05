---
comments: true
difficulty: Hard
tags:
  - Hash Table
  - Linked List
  - Design
  - Doubly-Linked List
---

# 432. All O`one Data Structure

**[View Problem on LeetCode](https://leetcode.com/problems/all-oone-data-structure/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0432` (`432`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Hash Table`, `Linked List`, `Design`, `Doubly-Linked List` |
| **Solution Language** | JavaScript |

---

## Problem Description

Design the `AllOne` data structure that maintains string frequencies and retrieves keys with the minimum and maximum counts in **`O(1)` average time** per operation:
- `AllOne()`: Initializes an empty structure.
- `inc(key)`: Increments `key`'s count by `1` (inserting it with count `1` if absent).
- `dec(key)`: Decrements `key`'s count by `1` (removing `key` completely if its count hits `0`; `key` is guaranteed to exist before `dec`).
- `getMaxKey()`: Returns any key currently holding the maximum count, or `""` if empty.
- `getMinKey()`: Returns any key currently holding the minimum count, or `""` if empty.

---

## Examples

### Example 1

```text
Input
["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
[[], ["hello"], ["hello"], [], [], ["leet"], [], []]
Output
[null, null, null, "hello", "hello", null, "hello", "leet"]

Explanation
AllOne allOne = new AllOne();
allOne.inc("hello");
allOne.inc("hello");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "hello"
allOne.inc("leet");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "leet"
```

---

## Constraints

- `1 <= key.length <= 10`

- `key` consists of lowercase English letters.

- It is guaranteed that for each call to `dec`, `key` is existing in the data structure.

- At most `5 * 10^4` calls will be made to `inc`, `dec`, `getMaxKey`, and `getMinKey`.

---

## Problem Understanding

A plain `HashMap` updates counts in `O(1)` but takes `O(n)` to find min/max; a heap or BST finds min/max quickly (`O(1)` / `O(log n)`) but updates arbitrary keys in `O(log n)`.

How do we achieve **strict `O(1)`** for *all four* operations? Notice that `inc` and `dec` only ever change a key's frequency by **`+1` or `-1`**! If we group keys with identical frequencies into buckets arranged in a sorted **Doubly Linked List**, moving `key` from frequency `f` to `f + 1` or `f - 1` only touches the immediate `next` or `prev` neighbor of its current bucket—zero searching required!

---

## Approach

### Brute Force Approach

Maintaining counts in a `Map` and scanning all entries inside `getMaxKey()` and `getMinKey()` takes `O(n)` per query; even maintaining a balanced BST / sorted array takes `O(log n)` per `inc`/`dec`, violating the `O(1)` requirement.

### Optimized Approach

Combine a **Doubly Linked List of Frequency Buckets** (`dll` nodes sorted strictly ascending by `freq`, from `this.head` = minimum frequency to `this.tail` = maximum frequency, each holding a `Set` `ele` of keys) with a `Map` `this.nodeMap` mapping each active `key` directly to its `dll` bucket node.

### Step-by-Step Thinking Process

1. Define bucket node `dll(freq, ele, prev, next)` holding `this.freq`, pointers `prev`/`next`, and `this.ele = new Set()`.
2. Maintain `this.nodeMap = new Map()` (`key -> dll`), `this.head = null` (min-freq bucket), and `this.tail = null` (max-freq bucket).
3. On `inc(key)` via `addtodll(key, node)`: if `key` is new (`!node`), place it into a `freq = 1` bucket at `this.head` (reusing `head` if `head.freq === 1` or prepending a new `dll`). Otherwise move `key` to `n_freq = node.freq + 1` immediately after `node` (reusing `node.next` if its `freq === n_freq` or splicing in a new `dll`), delete `key` from `node.ele`, and unlink `node` if `node.ele.size === 0`.
4. On `dec(key)` via `removefromdll(key, node)`: if `node.freq === 1`, delete `key` from `node.ele`, unlink `head` if empty, and delete `key` from `nodeMap`. Otherwise move `key` to `r_freq = node.freq - 1` immediately before `node` (reusing `node.prev` if `freq === r_freq` or splicing a new `dll`), delete `key` from `node.ele`, and unlink `node` if empty.
5. For `getMaxKey()` and `getMinKey()`, extract the first element of `this.tail.ele` or `this.head.ele` in `O(1)` using iterable destructuring `const [f] = ...` (or return `''` if empty).

### Algorithm / Intuition

Every active bucket in the doubly linked list is guaranteed to be **non-empty** (`ele.size >= 1`), because `addtodll` and `removefromdll` immediately splice out `c_node` / `node` whenever `ele.size === 0` (updating `this.head` or `this.tail` at the boundaries).

Because empty buckets never linger in the list:
- `this.head` always holds all keys tied for the global minimum frequency.
- `this.tail` always holds all keys tied for the global maximum frequency.
- JavaScript's `Set` preserves insertion order and supports `O(1)` `.add()`, `.delete()`, and first-item destructuring `const [f] = set`!

---

## Dry Run

Tracing **Example 1**:

| Operation | Bucket List (`freq: {keys}`) | `head` / `tail` | Return |
| :--- | :--- | :--- | :--- |
| `AllOne()` | `empty` | `null` / `null` | `null` |
| `inc("hello")` | `[1: {"hello"}]` | `1` / `1` | `null` |
| `inc("hello")` | `[2: {"hello"}]` (`1` unlinked!) | `2` / `2` | `null` |
| `getMaxKey()` | `[2: {"hello"}]` | `2` / `2` | `"hello"` |
| `getMinKey()` | `[2: {"hello"}]` | `2` / `2` | `"hello"` |
| `inc("leet")` | `[1: {"leet"}] <-> [2: {"hello"}]` | `1` / `2` | `null` |
| `getMaxKey()` | `[1: {"leet"}] <-> [2: {"hello"}]` | `1` / `2` | `"hello"` |
| `getMinKey()` | `[1: {"leet"}] <-> [2: {"hello"}]` | `1` / `2` | `"leet"` |

---

## Complexity Analysis

- **Time Complexity:** `O(1)` average time for `inc`, `dec`, `getMaxKey`, and `getMinKey` — `Map` and `Set` operations are `O(1)` expected, and linked-list pointer updates are strict `O(1)`.
- **Space Complexity:** `O(n)` where `n` is the number of distinct active keys — Each active key appears in `nodeMap` once and in exactly one bucket's `Set`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [432all-oone-data-structure.js](./432all-oone-data-structure.js) |

---

## Key Learnings

- Whenever counters only change by `+-1` (like LFU Cache or `AllOne`), a Doubly Linked List of frequency buckets maintains global order in `O(1)` without sorting or heap bubbling.
- Promptly unlinking buckets as soon as `ele.size === 0` keeps `head` and `tail` directly pointing to valid min/max keys in `O(1)`.
- In JavaScript, `const [first] = mySet;` concisely peeks the first element of a `Set` in `O(1)` time without converting the entire set to an array.
