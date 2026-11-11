---
comments: true
difficulty: Hard
tags:
  - Hash Table
  - String
  - Stack
  - Recursion
---

# 736. Parse Lisp Expression

**[View Problem on LeetCode](https://leetcode.com/problems/parse-lisp-expression/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0736` (`736`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Hash Table`, `String`, `Stack`, `Recursion` |
| **Solution Language** | Java |

---

## Problem Description

You are given a string expression representing a Lisp-like expression to return the integer value of.

The syntax for these expressions is given as follows.


	An expression is either an integer, let expression, add expression, mult expression, or an assigned variable. Expressions always evaluate to a single integer.
	(An integer could be positive or negative.)
	A let expression takes the form "(let v1 e1 v2 e2 ... vn en expr)", where let is always the string "let", then there are one or more pairs of alternating variables and expressions, meaning that the first variable v1 is assigned the value of the expression e1, the second variable v2 is assigned the value of the expression e2, and so on sequentially; and then the value of this let expression is the value of the expression expr.
	An add expression takes the form "(add e1 e2)" where add is always the string "add", there are always two expressions e1, e2 and the result is the addition of the evaluation of e1 and the evaluation of e2.
	A mult expression takes the form "(mult e1 e2)" where mult is always the string "mult", there are always two expressions e1, e2 and the result is the multiplication of the evaluation of e1 and the evaluation of e2.
	For this question, we will use a smaller subset of variable names. A variable starts with a lowercase letter, then zero or more lowercase letters or digits. Additionally, for your convenience, the names "add", "let", and "mult" are protected and will never be used as variable names.
	Finally, there is the concept of scope. When an expression of a variable name is evaluated, within the context of that evaluation, the innermost scope (in terms of parentheses) is checked first for the value of that variable, and then outer scopes are checked sequentially. It is guaranteed that every expression is legal. Please see the examples for more details on the scope.


 
Example 1:


Input: expression = "(let x 2 (mult x (let x 3 y 4 (add x y))))"
Output: 14
Explanation: In the expression (add x y), when checking for the value of the variable x,
we check from the innermost scope to the outermost in the context of the variable we are trying to evaluate.
Since x = 3 is found first, the value of x is 3.


Example 2:


Input: expression = "(let x 3 x 2 x)"
Output: 2
Explanation: Assignment in let statements is processed sequentially.


Example 3:


Input: expression = "(let x 1 y 2 x (add x y) (add x y))"
Output: 5
Explanation: The first (add x y) evaluates as 3, and is assigned to x.
The second (add x y) evaluates as 3+2 = 5.


 
Constraints:


	1 <= expression.length <= 2000
	There are no leading or trailing spaces in expression.
	All tokens are separated by a single space in expression.
	The answer and all intermediate calculations of that answer are guaranteed to fit in a 32-bit integer.
	The expression is guaranteed to be legal and evaluate to an integer.

---

## Problem Understanding

- We parse and evaluate a Lisp-like prefix expression supporting `let`, `add`, `mult`, scoped variable assignments, and integer literals.
- `let` introduces lexical scoping: variables defined within a `let` expression shadow outer definitions and expire when that `let` expression completes.
- Expressions can be nested arbitrarily.

---

## Approach

### Optimized Approach (Recursive Descent Parser with Scoped Deque Environment)

1. Maintain global parse index `i` and scoped variable lookup `Map<String, Deque<Integer>> scope`.
2. In `eval()`:
   - If current token is not `'('`: return integer literal or `scope.get(var).peekLast()`.
   - Skip `'('` and check operator:
     - **`add` / `mult`**: evaluate operand $a$, skip space, evaluate operand $b$, compute sum or product.
     - **`let`**: iteratively parse variable names and evaluate assigned expressions, pushing to `scope[var]`. When encountering a non-variable (or closing token), evaluate final expression and pop all local variables before exiting scope.
3. Skip closing `')'` and return evaluated integer.

---

## Dry Run

For `"(let x 2 (mult x (let x 3 y 4 (add x y))))"`:
- Outer `let`: `x` assigned `2`.
- `mult` first operand: `x = 2`.
- Inner `let`: `x` shadowed to `3`, `y` assigned `4`.
  - Inner `add`: $3 + 4 = 7$.
  - Scope pop restores `x = 2`.
- Outer `mult`: $2 \times 7 = 14$.

---

## Complexity Analysis

- **Time Complexity:** $O(L)$ where $L$ is the length of expression.
- **Space Complexity:** $O(L)$ for the recursion call stack and lexical variable deques.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [736parse-lisp-expression.java](./736parse-lisp-expression.java) |

---

## Key Learnings

- Using a `Map<String, Deque<Integer>>` implements nested lexical scoping cleanly with $O(1)$ push and pop operations upon entering and exiting scopes.
- Recursive descent parsing naturally handles arbitrary nesting without separate AST construction.
