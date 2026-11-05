---
comments: true
difficulty: Hard
tags:
  - String
  - Greedy
  - Heap (Priority Queue)
---

# 420. Strong Password Checker

**[View Problem on LeetCode](https://leetcode.com/problems/strong-password-checker/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0420` (`420`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Greedy`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

A password is **strong** if all three rules hold:
1. Length is between `6` and `20` characters inclusive.
2. It contains at least one lowercase letter, at least one uppercase letter, and at least one digit.
3. It contains **no three identical consecutive characters** (like `"aaa"`).

In a single step, you may **insert**, **delete**, or **replace** any one character. Given `password`, return the minimum number of steps required to make it strong.

---

## Examples

### Example 1

```text
Input: password = "a"
Output: 5
```

### Example 2

```text
Input: password = "aA1"
Output: 3
```

### Example 3

```text
Input: password = "1337C0d3"
Output: 0
```

---

## Constraints

- `1 <= password.length <= 50`

- `password` consists of letters, digits, dot `'.'` or exclamation mark `'!'`.

---

## Problem Understanding

Notice how the three edit types dominate in different length regimes (`n = password.length()`), while `3 - types` measures missing character categories (`0..3`):
- **`n < 6` (Too short):** We *must* insert at least `6 - n` characters. An insertion placed inside a repeating run (e.g., `'a' 'a' [insert 'A'] 'a' 'a' [insert '1'] 'a'`) breaks up to a length-5 run AND supplies a missing character type simultaneously! Thus `max(6 - n, 3 - types)` always suffices.
- **`6 <= n <= 20` (Valid length):** Replacements strictly outperform insertions/deletions: in any run of `cnt` identical characters, replacing every 3rd character (`cnt / 3` replacements) breaks all triples AND supplies missing character types! Thus `max(sum(cnt / 3), 3 - types)` steps suffice.
- **`n > 20` (Too long):** We *must* perform `remove = n - 20` deletions regardless, and smartly spending those deletions on repeating runs reduces `replace = sum(cnt / 3)`!

---

## Approach

### Brute Force Approach

Attempting BFS or general edit-distance DP over strings up to length `50` with arbitrary character insertions, deletions, and replacements creates an astronomically large state space (tracking string content or `(index, lastChar, runLen, curLen, typeMask)`), which is error-prone and far slower than `O(n)` greedy math.

### Optimized Approach

Count present character categories via `countTypes(password)` (`0..3`) and branch into three `O(n)` length cases: `n < 6`, `6 <= n <= 20`, and `n > 20`. For `n > 20`, greedily allocate the `n - 20` required deletions to repeating runs (`cnt >= 3`) prioritized by `cnt % 3 == 0` (1 deletion saves 1 replacement), then `cnt % 3 == 1` (2 deletions save 1 replacement), and finally `cnt % 3 == 2` (3 deletions save 1 replacement).

### Step-by-Step Thinking Process

1. Compute `types = countTypes(password)` (`a + b + c` for lowercase, uppercase, digit) and `n = password.length()`.
2. If `n < 6`, return `Math.max(6 - n, 3 - types)`.
3. If `n <= 20`, scan runs of identical characters, sum `replace += cnt / 3` across all runs, and return `Math.max(replace, 3 - types)`.
4. If `n > 20`, set mandatory deletions `remove = n - 20`. Scan all character runs: for each run with `cnt >= 3` while `remove > 0`, if `cnt % 3 == 0`, immediately spend 1 deletion (`--remove; --replace;`); if `cnt % 3 == 1`, increment bucket counter `++remove2`; and always add `replace += cnt / 3`.
5. Spend remaining deletions in pairs on `cnt % 3 == 1` runs: `use2 = Math.min(Math.min(replace, remove2), remove / 2)`, reducing `replace -= use2` and `remove -= use2 * 2`.
6. Spend any leftover deletions in triples (`use3 = Math.min(replace, remove / 3)`), reducing `replace -= use3`, and return `(n - 20) + Math.max(replace, 3 - types)`.

### Algorithm / Intuition

Why does `cnt % 3` dictate deletion priority when `n > 20`?
Since a run of length `cnt` needs `floor(cnt / 3)` replacements:
- If `cnt = 6` (`6 % 3 == 0`), `6 / 3 = 2` replacements. Deleting **just 1** char drops `cnt` to `5` (`5 / 3 = 1` replacement) — **1 deletion saves 1 replacement**! And now the run has length `5` (`5 % 3 == 2`).
- If `cnt = 7` (`7 % 3 == 1`), `7 / 3 = 2` replacements. Deleting **2** chars drops `cnt` to `5` (`5 / 3 = 1`) — **2 deletions save 1 replacement**! And now the run has length `5` (`5 % 3 == 2`).
- Once all `mod 0` (1-del) and `mod 1` (2-del) bargains are taken, every remaining run needing replacements effectively sits at `mod 2` (like `5, 8, 11...`), where every **3 deletions** (`use3 = Math.min(replace, remove / 3)`) save **1 replacement**!

---

## Dry Run

Tracing **Example 1** (`password = "a"`) and a `n > 20` illustration:

1. **Example 1 (`password = "a"`):**
   - `types = countTypes("a") = 1` (lowercase only), `n = 1`.
   - `n < 6` branch triggers -> `Math.max(6 - 1, 3 - 1) = Math.max(5, 2) = 5`.
2. **Illustration for `n > 20` (`"aaaaaaaaaaaaaaaaaaaaa"`, 21 `'a'`s):**
   - `types = 1`, `n = 21`, `remove = 21 - 20 = 1`.
   - Single run `cnt = 21`: `21 % 3 == 0` -> `--remove` (`0`), `--replace` (`-1`), then `replace += 21 / 3` (`-1 + 7 = 6`).
   - `use2 = 0`, `use3 = 0`.
   - Returns `(21 - 20) + Math.max(6, 3 - 1) = 1 + 6 = 7` (1 deletion -> 20 `'a'`s, then 6 replacements supplying `'A'` and `'1'`).

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — `countTypes` and the single run-length scan each traverse the password of length `n <= 50` at most once.
- **Space Complexity:** `O(n)` — `password.toCharArray()` creates a copy of the `n` characters (`O(1)` bounded since `n <= 50`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [420strong-password-checker.java](./420strong-password-checker.java) |

---

## Key Learnings

- Breaking complex multi-rule optimization problems into non-overlapping regime cases (`n < 6`, `6 <= n <= 20`, `n > 20`) turns messy interactions into clean closed-form formulas.
- Because `floor(cnt / 3)` is a step function of period 3, greedy exchange by `cnt % 3` (`0`, then `1`, then `2`) maximizes replacements saved per deletion.
- Notice the sentinel `char prev = '~'`—since `password` only contains letters, digits, `'.'`, or `'!'`, `'~'` safely never matches `chars[0]`.
