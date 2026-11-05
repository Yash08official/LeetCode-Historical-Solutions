---
comments: true
difficulty: Medium
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2622. Cache With Time Limit

**[View Problem on LeetCode](https://leetcode.com/problems/cache-with-time-limit/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2622` (`2622`) |
| **Difficulty** | Medium |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Write a class `TimeLimitedCache` that allows storing key-value pairs where each key has an associated time-to-live (expiration duration in milliseconds).

The class must implement three public methods:
1. `set(key, value, duration)`: Sets the `key` to `value` with a lifetime of `duration` milliseconds. Returns `true` if an unexpired key already existed, or `false` otherwise. If the key already exists, its value and expiration duration are updated.
2. `get(key)`: Returns the value associated with `key` if it exists and has not expired; otherwise returns `-1`.
3. `count()`: Returns the number of currently unexpired keys.

---

## Examples

### Example 1

```text
Input:
actions = ["TimeLimitedCache", "set", "get", "count", "get"]
values = [[], [1, 42, 100], [1], [], [1]]
timeDelays = [0, 0, 50, 50, 150]
Output: [null, false, 42, 1, -1]
Explanation:
At t=0, the cache is constructed.
At t=0, a key-value pair (1: 42) is added with a time limit of 100ms. The value doesn't exist so false is returned.
At t=50, key=1 is requested and the value of 42 is returned.
At t=50, count() is called and there is one active key in the cache.
At t=100, key=1 expires.
At t=150, get(1) is called but -1 is returned because the cache is empty.
```

### Example 2

```text
Input:
actions = ["TimeLimitedCache", "set", "set", "get", "get", "get", "count"]
values = [[], [1, 42, 50], [1, 50, 100], [1], [1], [1], []]
timeDelays = [0, 0, 40, 50, 120, 200, 250]
Output: [null, false, true, 50, 50, -1, 0]
Explanation:
At t=0, the cache is constructed.
At t=0, a key-value pair (1: 42) is added with a time limit of 50ms. The value doesn't exist so false is returned.
At t=40, a key-value pair (1: 50) is added with a time limit of 100ms. A non-expired value already existed so true is returned and the old value was overwritten.
At t=50, get(1) is called which returned 50.
At t=120, get(1) is called which returned 50.
At t=140, key=1 expires.
At t=200, get(1) is called but the cache is empty so -1 is returned.
At t=250, count() returns 0 because the cache is empty.
```

---

## Constraints

- `0 <= key, value <= 10^9`

- `0 <= duration <= 1000`

- `1 <= actions.length <= 100`

- `actions.length === values.length`

- `actions.length === timeDelays.length`

- `0 <= timeDelays[i] <= 1450`

- `actions[i]` is one of "TimeLimitedCache", "set", "get" and "count"

- First action is always "TimeLimitedCache" and must be executed immediately, with a 0-millisecond delay

---

## Problem Understanding

Each key stored in the cache is paired with a value and an expiration timestamp ($now + duration$). A key is considered expired as soon as the current wall-clock time (`Date.now()`) strictly exceeds its expiration timestamp. Expired keys must be ignored by `get()` (returning `-1`) and must not be counted by `count()`. `set()` must return whether a non-expired entry previously existed for that key.

---

## Approach

### Brute Force Approach

A naive approach might schedule individual `setTimeout` timers for every key to delete it upon expiration. However, managing and clearing timers for overwritten keys introduces timer handle tracking overhead and potential memory leaks under rapid updates. Alternatively, scanning all keys on every operation without timestamp indexing is sufficient for the small constraints ($N \le 100$).

### Optimized Approach

Use a `Map` storing `key -> [value, expirationTimestamp]`. Define a helper `_isExpired(key)` that checks if the key exists and its expiration timestamp is strictly less than `Date.now()`. In `set(key, value, duration)`: check existence via `this._cache.has(key)`, then update the map with `[value, Date.now() + duration]` and return whether an unexpired key existed. In `get(key)`: check if expired; if not, return the stored value, else return `-1`. In `count()`: filter entries in `this._cache` that are not expired and return the count.

### Step-by-Step Thinking Process

1. Instead of active timer cancellation, store passive expiration timestamps: `expiration = Date.now() + duration`.
2. `_isExpired(key)`: return `true` if key exists and its stored timestamp is $< Date.now()`.
3. In `get(key)`: if `_isExpired(key)` is true or key not present, return `-1`. Else return `value`.
4. In `set(key, value, duration)`: record whether the key currently exists and is unexpired, then update the map with the new value and new timestamp.
5. In `count()`: filter all entries in `_cache` where `!_isExpired(key)` and return the length.

### Algorithm / Intuition

The constructor initializes `this._cache = new Map()`. `_isExpired(key)` checks if `key` is present in `this._cache` and whether its timestamp `this._cache.get(key)?.[1]` is strictly less than `Date.now()`. `set(key, value, duration)` determines if a non-expired entry existed, stores `[value, Date.now() + duration]`, and returns `isExist`. `get(key)` guards with `if (this._isExpired(key)) return -1`, otherwise extracting `this._cache.get(key)?.[0] ?? -1`. `count()` converts the map to an array and counts entries where `!this._isExpired(key)`.

---

## Dry Run

Trace with Example 1: `actions = ["TimeLimitedCache", "set", "get", "count", "get"]`:
- `t = 0`: `TimeLimitedCache` instantiated. `_cache` is empty.
- `t = 0`: `set(1, 42, 100)`. Key 1 is not in cache. Stored `1 -> [42, 100]`. Returns `false`.
- `t = 50`: `get(1)`. `now = 50 < 100`, so key 1 is not expired. Returns `42`.
- `t = 50`: `count()`. Key 1 is valid. Returns `1`.
- `t = 150`: `get(1)`. `now = 150 > 100`, key 1 is expired. Returns `-1`.

---

## Complexity Analysis

- **Time Complexity:** - `set`: `O(1)` — Map lookup and insertion.
- `get`: `O(1)` — Map lookup and timestamp comparison.
- `count`: `O(N)` where `N` is the number of keys stored in `_cache`, since it filters all entries.
- **Space Complexity:** `O(N)` — Where `N` is the total number of unique keys stored in `this._cache`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2622cache-with-time-limit.js](./2622cache-with-time-limit.js) |

---

## Key Learnings

- Passive expiration (comparing against `Date.now()`) is simpler and avoids timer cleanup complexities.
- Optional chaining (`?.`) and nullish coalescing (`??`) safely guard against missing keys or undefined properties in JavaScript objects/maps.
- `Map` preserves key types and allows efficient $O(1)$ insertions and lookups.
