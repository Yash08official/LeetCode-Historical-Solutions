---
comments: true
difficulty: Hard
tags:
  - Hash Table
  - Linked List
  - Design
  - Doubly-Linked List
---

# 460. LFU Cache

**[View Problem on LeetCode](https://leetcode.com/problems/lfu-cache/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0460` (`460`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Hash Table`, `Linked List`, `Design`, `Doubly-Linked List` |
| **Solution Language** | Java |

---

## Problem Description

Design and implement a **Least Frequently Used (LFU)** cache supporting fixed `capacity` and `O(1)` average-time operations:

- `LFUCache(int capacity)`: Initializes the cache with maximum size `capacity`.
- `int get(int key)`: Returns the value associated with `key` and increments its access frequency counter by `1`, or returns `-1` if `key` is absent.
- `void put(int key, int value)`: Updates `key`'s value and increments its frequency counter if `key` already exists. Otherwise, inserts `(key, value)` with initial frequency `1`. If the cache is already at full `capacity`, it first evicts the key with the **lowest frequency**—breaking ties by evicting the **least recently used (LRU)** key among those tied at the minimum frequency.

---

## Examples

### Example 1

```text
Input
["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, 3, null, -1, 3, 4]

Explanation
// cnt(x) = the use counter for key x
// cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)
LFUCache lfu = new LFUCache(2);
lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
lfu.get(1);      // return 1
                 // cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
                 // cache=[3,1], cnt(3)=1, cnt(1)=2
lfu.get(2);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
                 // cache=[4,3], cnt(4)=1, cnt(3)=2
lfu.get(1);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,4], cnt(4)=1, cnt(3)=3
lfu.get(4);      // return 4
                 // cache=[4,3], cnt(4)=2, cnt(3)=3
```

---

## Constraints

- `1 <= capacity <= 10^4`

- `0 <= key <= 10^5`

- `0 <= value <= 10^9`

- At most `2 * 10^5` calls will be made to `get` and `put`.

---

## Problem Understanding

- **Dual ordering requirement:** Eviction depends first on **minimum access count (`freq`)**, and second on **recency** within that exact frequency tier.
- **Why a heap isn't optimal:** A min-heap over `(freq, timestamp)` takes `O(log capacity)` per update, missing the strict `O(1)` time requirement.
- **`minFreq` tracking:** Notice `freq` only ever changes in two ways: either a brand-new node is inserted (`minFreq` immediately becomes `1`), or an existing node's frequency increases by `+1` from `f` to `f + 1`. If `f == minFreq` and no other nodes remain at frequency `f`, the new minimum frequency must be `f + 1`! This lets us maintain `minFreq` in `O(1)` without scanning.

---

## Approach

### Brute Force Approach

Storing `(value, freq, lastUsedTick)` in a single `HashMap` makes `get` fast, but every eviction on a full `put` requires scanning all `capacity` entries to find the minimum `(freq, lastUsedTick)` pair.

With `capacity <= 10^4` and `2 * 10^5` calls, an `O(capacity)` scan per eviction degrades worst-case total time to `O(N * capacity)`, causing Time Limit Exceeded.

### Optimized Approach

Combine **Two Hash Maps + Frequency-Bucketed Doubly Linked Lists**: `map` maps `key -> Node`, `freqMap` maps `freq -> DoublyLinkedList` (ordered from most-recently-used at `head.next` to least-recently-used at `tail.prev`), and an integer `minFreq` tracks the lowest active frequency in `O(1)`.

### Step-by-Step Thinking Process

1. Store every cached entry in a doubly-linked `Node(key, value, freq)` indexed by `map` (`key -> Node`) for `O(1)` direct lookup.
2. Group all nodes sharing the same frequency `f` into their own `DoublyLinkedList` in `freqMap.get(f)`, using dummy `head` and `tail` sentinels so `addFirst`, `remove`, and `removeLast` run in `O(1)` without null-pointer edge cases.
3. Always insert newly touched nodes at the front (`addFirst`), which naturally leaves the least recently used node of frequency `f` at the back (`removeLast()` -> `tail.prev`).
4. On `incrFreq(node)`, unlink `node` from `freqMap.get(freq)`. If that bucket becomes empty, remove `freq` from `freqMap`, and if `freq == minFreq`, increment `minFreq++`. Then increment `node.freq++` and insert `node` at the front of `freqMap` bucket `freq + 1`.
5. On `put(key, value)` for a new key at full capacity, evict `freqMap.get(minFreq).removeLast()` and remove its key from `map`, then add the new node with `freq = 1` and reset `minFreq = 1`.

### Algorithm / Intuition

The `LFUCache` implementation coordinates three core components:
- `map`: `HashMap<Integer, Node>` providing `O(1)` lookup by `key`.
- `freqMap`: `HashMap<Integer, DoublyLinkedList>` mapping each active frequency count to an LRU-ordered doubly linked list.
- `minFreq`: tracks which frequency bucket to evict from when `map.size() == capacity`.

Helper `incrFreq(Node node)` handles every frequency promotion (used by both `get` and update-`put`): it removes `node` from its old frequency list, cleans up empty buckets in `freqMap`, bumps `minFreq` by `1` only when the `minFreq` bucket itself just emptied, increments `node.freq`, and calls `addNode(node)` to prepend `node` to the `node.freq` list. Notice the defensive `if (capacity == 0)` checks at the top of `get` and `put`.

---

## Dry Run

Tracing **Example 1** with `LFUCache(2)`:

| Operation | Action & Eviction | `freqMap` Buckets (MRU -> LRU) | `minFreq` | Output |
| :--- | :--- | :--- | :--- | :--- |
| `put(1, 1)` | Insert `1` (`freq=1`) | `1: [(1:1)]` | `1` | `null` |
| `put(2, 2)` | Insert `2` (`freq=1`) | `1: [(2:2), (1:1)]` | `1` | `null` |
| `get(1)` | Promote `1` (`1 -> 2`) | `1: [(2:2)]`, `2: [(1:1)]` | `1` | `1` |
| `put(3, 3)` | Full! Evict `minFreq=1` LRU `(2:2)`, insert `3` | `1: [(3:3)]`, `2: [(1:1)]` | `1` | `null` |
| `get(2)` | Miss | `1: [(3:3)]`, `2: [(1:1)]` | `1` | `-1` |
| `get(3)` | Promote `3` (`1 -> 2`); bucket `1` empty -> `minFreq=2` | `2: [(3:3), (1:1)]` | `2` | `3` |
| `put(4, 4)` | Full! Evict `minFreq=2` LRU `(1:1)`, insert `4` | `1: [(4:4)]`, `2: [(3:3)]` | `1` | `null` |
| `get(1)` | Miss | `1: [(4:4)]`, `2: [(3:3)]` | `1` | `-1` |
| `get(3)` | Promote `3` (`2 -> 3`) | `1: [(4:4)]`, `3: [(3:3)]` | `1` | `3` |
| `get(4)` | Promote `4` (`1 -> 2`); bucket `1` empty -> `minFreq=2` | `2: [(4:4)]`, `3: [(3:3)]` | `2` | `4` |

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — Both `get` and `put` perform a constant number of `HashMap` operations and doubly-linked list pointer updates in average `O(1)` time.
- **Space Complexity:** `O(capacity)` — `map` stores at most `capacity` `Node` objects, and `freqMap` holds at most `capacity` non-empty `DoublyLinkedList` buckets at any time.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [460lfu-cache.java](./460lfu-cache.java) |

---

## Key Learnings

- Bucketed doubly-linked lists indexed by frequency upgrade LRU cache's `O(1)` mechanics to handle two-tiered `(frequency, recency)` eviction.
- Maintaining `minFreq` works in `O(1)` because frequencies only ever start at `1` or increment by `+1` from an existing bucket.
- Using sentinel `head` and `tail` nodes in custom doubly-linked lists eliminates null checks across `addFirst`, `remove`, and `removeLast`.
