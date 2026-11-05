---
comments: true
difficulty: Medium
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2694. Event Emitter

**[View Problem on LeetCode](https://leetcode.com/problems/event-emitter/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2694` (`2694`) |
| **Difficulty** | Medium |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Design an `EventEmitter` class in JavaScript that allows subscribing to named events and emitting them with arbitrary arguments.

The class must support two methods:
- `subscribe(eventName, callback)`: registers a callback function for the specified event name and returns a subscription object with an `unsubscribe()` method. When `unsubscribe()` is called, the registered callback is removed so it will not be executed on future emits.
- `emit(eventName, args = [])`: calls all callbacks currently subscribed to `eventName` in the order they were registered, passing the elements of `args` as parameters. It returns an array containing the results of all callback executions. If no callbacks are registered for `eventName`, it returns an empty array `[]`.

---

## Examples

### Example 1

```text
Input:
actions = ["EventEmitter", "emit", "subscribe", "subscribe", "emit"],
values = [[], ["firstEvent"], ["firstEvent", "function cb1() { return 5; }"],  ["firstEvent", "function cb1() { return 6; }"], ["firstEvent"]]
Output: [[],["emitted",[]],["subscribed"],["subscribed"],["emitted",[5,6]]]
Explanation:
const emitter = new EventEmitter();
emitter.emit("firstEvent"); // [], no callback are subscribed yet
emitter.subscribe("firstEvent", function cb1() { return 5; });
emitter.subscribe("firstEvent", function cb2() { return 6; });
emitter.emit("firstEvent"); // [5, 6], returns the output of cb1 and cb2
```

### Example 2

```text
Input:
actions = ["EventEmitter", "subscribe", "emit", "emit"],
values = [[], ["firstEvent", "function cb1(...args) { return args.join(','); }"], ["firstEvent", [1,2,3]], ["firstEvent", [3,4,6]]]
Output: [[],["subscribed"],["emitted",["1,2,3"]],["emitted",["3,4,6"]]]
Explanation: Note that the emit method should be able to accept an OPTIONAL array of arguments.

const emitter = new EventEmitter();
emitter.subscribe("firstEvent, function cb1(...args) { return args.join(','); });
emitter.emit("firstEvent", [1, 2, 3]); // ["1,2,3"]
emitter.emit("firstEvent", [3, 4, 6]); // ["3,4,6"]
```

### Example 3

```text
Input:
actions = ["EventEmitter", "subscribe", "emit", "unsubscribe", "emit"],
values = [[], ["firstEvent", "(...args) => args.join(',')"], ["firstEvent", [1,2,3]], [0], ["firstEvent", [4,5,6]]]
Output: [[],["subscribed"],["emitted",["1,2,3"]],["unsubscribed",0],["emitted",[]]]
Explanation:
const emitter = new EventEmitter();
const sub = emitter.subscribe("firstEvent", (...args) => args.join(','));
emitter.emit("firstEvent", [1, 2, 3]); // ["1,2,3"]
sub.unsubscribe(); // undefined
emitter.emit("firstEvent", [4, 5, 6]); // [], there are no subscriptions
```

### Example 4

```text
Input:
actions = ["EventEmitter", "subscribe", "subscribe", "unsubscribe", "emit"],
values = [[], ["firstEvent", "x => x + 1"], ["firstEvent", "x => x + 2"], [0], ["firstEvent", [5]]]
Output: [[],["subscribed"],["subscribed"],["unsubscribed",0],["emitted",[7]]]
Explanation:
const emitter = new EventEmitter();
const sub1 = emitter.subscribe("firstEvent", x => x + 1);
const sub2 = emitter.subscribe("firstEvent", x => x + 2);
sub1.unsubscribe(); // undefined
emitter.emit("firstEvent", [5]); // [7]
```

---

## Constraints

- `1 <= actions.length <= 10`

- `values.length === actions.length`

- All test cases are valid, e.g. you don't need to handle scenarios when unsubscribing from a non-existing subscription.

- There are only 4 different actions: `EventEmitter`, `emit`, `subscribe`, and `unsubscribe`.

- The `EventEmitter` action doesn't take any arguments.

- The `emit` action takes between either 1 or 2 arguments. The first argument is the name of the event we want to emit, and the 2nd argument is passed to the callback functions.

- The `subscribe` action takes 2 arguments, where the first one is the event name and the second is the callback function.

- The `unsubscribe` action takes one argument, which is the 0-indexed order of the subscription made before.

---

## Problem Understanding

This problem models the classic Observer / Pub-Sub architectural pattern.

Key requirements:
- Multiple callbacks can be subscribed to the same event name.
- `subscribe` must return `{ unsubscribe: () => ... }` that cleans up only the specific callback subscribed in that call.
- `emit` passes `args` to each callback and returns an array of results.
- If an event has no listeners, `emit` returns `[]`.
- A map data structure `eventName -> callbacks` efficiently isolates events.

---

## Approach

### Brute Force Approach

Storing all callbacks across all events in a single flat array of objects `[{ eventName, callback }]` would require filtering through the entire list on every `emit` and `unsubscribe` call.

This leads to `O(N)` scan time per event emit, where `N` is the total number of subscriptions across all event types. Using a `Map` keyed by `eventName` provides direct `O(1)` access to the relevant callback list.

### Optimized Approach

The implemented solution uses a private `Map` field `d` where keys are event names and values are `Set` instances of callbacks:

1. In `subscribe(eventName, callback)`:
   - If `!this.d.has(eventName)`, initialize `this.d.set(eventName, new Set())`.
   - Add `callback` to the set: `this.d.get(eventName).add(callback)`.
   - Return `{ unsubscribe: () => { this.d.get(eventName)?.delete(callback); } }`.
2. In `emit(eventName, args = [])`:
   - Retrieve `const callbacks = this.d.get(eventName)`.
   - If `!callbacks`, return `[]`.
   - Return `[...callbacks].map(callback => callback(...args))`.

### Step-by-Step Thinking Process

1. We need an event emitter supporting subscription, unsubscription, and event emission with argument spreading.
2. Use a `Map` `this.d` mapping `eventName` to a collection of callbacks.
3. Using a `Set` allows `O(1)` addition and `O(1)` deletion when unsubscribing.
4. In `subscribe`, add the callback to the event's `Set` and return an object with an `unsubscribe` method that deletes the callback from the set.
5. In `emit`, retrieve the set for `eventName`. If missing or empty, return `[]`. Otherwise, spread the set into an array and map each callback to `callback(...args)`.

### Algorithm / Intuition

The class implements the Pub-Sub pattern using `Map` and `Set`:

1. `d = new Map()` maps each `eventName` string to a `Set` of function references.
2. When `subscribe(eventName, callback)` is called, the callback is added to `d.get(eventName)`.
3. The returned closure `{ unsubscribe: () => { this.d.get(eventName)?.delete(callback); } }` directly deletes the specific callback from the set in `O(1)` time.
4. `emit(eventName, args)` fetches the set. Spreading `[...callbacks]` freezes the list of listeners before execution, safely iterating even if callbacks unsubscribe during invocation.
5. Array `.map(callback => callback(...args))` invokes each function with spread arguments and gathers returned values into the final output array.

---

## Dry Run

Trace for actions:
1. `emitter = new EventEmitter()` -> `d = Map {}`.
2. `emitter.emit('firstEvent')` -> `d.get('firstEvent')` is undefined -> returns `[]`.
3. `sub1 = emitter.subscribe('firstEvent', () => 5)` -> adds `cb1` to set. Returns `{ unsubscribe }`.
4. `sub2 = emitter.subscribe('firstEvent', () => 6)` -> adds `cb2` to set.
5. `emitter.emit('firstEvent')` -> callbacks `[cb1, cb2]` are invoked:
   - `cb1()` returns `5`.
   - `cb2()` returns `6`.
   - Returns `[5, 6]`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` for `subscribe` and `unsubscribe` (hash map lookup and set insertion/deletion). For `emit`, `O(k)` where `k` is the number of callbacks subscribed to `eventName` (plus callback execution time).
- **Space Complexity:** `O(N)` — Where `N` is the total number of active subscriptions stored in the `Map` across all event names.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2694event-emitter.js](./2694event-emitter.js) |

---

## Key Learnings

- Using `Set` within a `Map` provides `O(1)` addition and removal for event listener registries.
- Returning a closure containing `unsubscribe` encapsulates cleanup without requiring the caller to pass the callback function again.
- Spreading a `Set` to an array `[...callbacks]` prevents mutation bugs if an invoked callback unregisters itself during an `emit`.
