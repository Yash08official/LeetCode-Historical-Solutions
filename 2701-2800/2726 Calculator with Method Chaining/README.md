---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2726. Calculator with Method Chaining

**[View Problem on LeetCode](https://leetcode.com/problems/calculator-with-method-chaining/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2726` (`2726`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

We need to design a `Calculator` class in JavaScript that supports standard arithmetic operations (addition, subtraction, multiplication, division, and exponentiation) with **method chaining**.

The constructor accepts an initial numeric value that initializes the internal calculation result. Each mathematical method performs its operation on the current result and returns the `Calculator` instance itself (`this`) to allow fluent chaining.

Division by zero is disallowed and must throw an `Error` with the message `'Division by zero is not allowed'`. Finally, the `getResult()` method returns the accumulated numeric result.

---

## Examples

### Example 1

```text
Input:
actions = ["Calculator", "add", "subtract", "getResult"],
values = [10, 5, 7]
Output: 8
Explanation:
new Calculator(10).add(5).subtract(7).getResult() // 10 + 5 - 7 = 8
```

### Example 2

```text
Input:
actions = ["Calculator", "multiply", "power", "getResult"],
values = [2, 5, 2]
Output: 100
Explanation:
new Calculator(2).multiply(5).power(2).getResult() // (2 * 5) ^ 2 = 100
```

### Example 3

```text
Input:
actions = ["Calculator", "divide", "getResult"],
values = [20, 0]
Output: "Division by zero is not allowed"
Explanation:
new Calculator(20).divide(0).getResult() // 20 / 0

The error should be thrown because we cannot divide by zero.
```

---

## Constraints

- `actions` is a valid JSON array of strings

- `values` is a valid JSON array of numbers

- `2 <= actions.length <= 2 * 10^4`

- `1 <= values.length <= 2 * 10^4 - 1`

- `actions[i]` is one of "Calculator", "add", "subtract", "multiply", "divide", "power", and "getResult"

- First action is always "Calculator"

- Last action is always "getResult"

---

## Problem Understanding

Key specifications:
- Constructor: `constructor(value)` sets the initial state.
- Fluent interface / method chaining: every mutating method (`add`, `subtract`, `multiply`, `divide`, `power`) must return `this`.
- Division edge case: if `value === 0` in `divide(value)`, throw `new Error('Division by zero is not allowed')` immediately without updating result.
- Exponentiation: `power(value)` raises the accumulated value to the power of `value` (using `**=`).
- `getResult()` returns the accumulated numeric value.

---

## Approach

### Brute Force Approach

Without method chaining, a caller would have to store intermediate results in local variables or pass values into pure helper functions. The design pattern tested here is the Fluent Builder pattern. Omitting `return this` breaks method chaining.

### Optimized Approach

The solution defines a class `Calculator` with a private/instance property `x`:
- `constructor(value)` initializes `this.x = value`.
- `add(value)`: `this.x += value; return this;`
- `subtract(value)`: `this.x -= value; return this;`
- `multiply(value)`: `this.x *= value; return this;`
- `divide(value)`: checks `if (value === 0) throw new Error('Division by zero is not allowed');` then `this.x /= value; return this;`
- `power(value)`: `this.x **= value; return this;`
- `getResult()`: returns `this.x`.

### Step-by-Step Thinking Process

1. Use ES6 class syntax to structure `Calculator`.
2. Store internal calculation state in property `this.x`.
3. For each mathematical operation, update `this.x` in place and return `this` to support method chaining.
4. In `divide(value)`, guard with `if (value === 0)` and throw an `Error('Division by zero is not allowed')`.
5. In `power(value)`, use the exponentiation operator `**=`.
6. In `getResult()`, return `this.x` directly.

### Algorithm / Intuition

Method chaining works by having each method return the current class instance reference, `this`. When `calc.add(5).subtract(7)` is evaluated, `calc.add(5)` increments internal state `this.x` and evaluates to `calc`, allowing `.subtract(7)` to be called on the exact same object immediately. In `divide`, checking `value === 0` prevents arithmetic errors and throws the required error message.

---

## Dry Run

We trace Example 1 with `new Calculator(10).add(5).subtract(7).getResult()`:

- `new Calculator(10)`: constructor sets `this.x = 10`.
- `.add(5)`: `this.x += 5` -> `this.x = 15`. Returns `this`.
- `.subtract(7)`: `this.x -= 7` -> `this.x = 8`. Returns `this`.
- `.getResult()`: returns `this.x` which is `8`.
- Final output: `8`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` per method call — Each arithmetic operation runs in constant time.
- **Space Complexity:** `O(1)` — Allocates only a single object instance with one numeric field.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2726calculator-with-method-chaining.js](./2726calculator-with-method-chaining.js) |

---

## Key Learnings

- Returning `this` from instance methods enables fluent method chaining in JavaScript.
- Defensive programming with input validation (`value === 0`) prevents undefined math behaviors and enforces API contracts.
- Modern JavaScript class syntax natively supports field declarations and concise operator assignments like `**=`.
