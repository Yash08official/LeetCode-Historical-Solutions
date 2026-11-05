---
comments: true
difficulty: Hard
tags:
  - Array
  - String
  - Simulation
---

# 68. Text Justification

**[View Problem on LeetCode](https://leetcode.com/problems/text-justification/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0068` (`68`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `String`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of words `words` and an integer line width `maxWidth`, format the text so that **every line has exactly `maxWidth` characters**.

Follow these exact layout rules:
1. **Greedy Line Packing:** Pack as many words onto each line as will fit while keeping at least one space `' '` between consecutive words.
2. **Full Justification (Non-Last Lines with `>= 2` Words):** Distribute all padding spaces across the gaps between words as evenly as possible. If total spaces do not divide evenly among gaps, assign `1` extra space to each of the **leftmost** gaps.
3. **Left Justification (Last Line OR Single-Word Lines):** Separate words (if more than one on the last line) by a single space `' '` and pad all remaining characters up to `maxWidth` with trailing spaces on the right.

---

## Examples

### Example 1

```text
Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
```

### Example 2

```text
Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
Output:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
Explanation: Note that the last line is "shall be    " instead of "shall     be", because the last line must be left-justified instead of fully-justified.
Note that the second line is also left-justified because it contains only one word.
```

### Example 3

```text
Input: words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], maxWidth = 20
Output:
[
  "Science  is  what we",
  "understand      well",
  "enough to explain to",
  "a  computer.  Art is",
  "everything  else  we",
  "do                  "
]
```

---

## Constraints

- `1 <= words.length <= 300`

- `1 <= words[i].length <= 20`

- `words[i]` consists of only English letters and symbols.

- `1 <= maxWidth <= 100`

- `words[i].length <= maxWidth`

---

## Problem Understanding

- **Minimum Width Formula:** Adding a candidate `words[i]` to a non-empty current line requires `1 + words[i].length()` additional characters (`1` mandatory separator space plus the word itself).
- **Two Distinct Formatting Modes:**
  - **Left-Justified:** Triggered when `i == n` (we just packed the very last word of `words`) **OR** `t.size() == 1` (only one word fit on the line, so `t.size() - 1 == 0` gaps exist—avoiding division by zero!).
  - **Fully-Justified:** Triggered when `i < n` and `t.size() >= 2` (`g = t.size() - 1 >= 1` gaps).
- **Pigeonhole Space Math:** If `W` is the sum of word lengths on a line (`cnt - t.size() + 1`), then `spaceWidth = maxWidth - W` total spaces must be split across `g = t.size() - 1` gaps: every gap gets `w = spaceWidth / g` spaces, and the first `m = spaceWidth % g` gaps (indices `0 <= j < m`) receive `+ 1` extra space.

---

## Approach

### Brute Force Approach

Instead of calculating gap widths arithmetically with `/` and `%`, a naive simulation repeatedly loops round-robin over the gaps appending one `' '` character at a time until line length reaches `maxWidth`, or mixes last-line / single-word special cases inside the same loop—often causing division-by-zero bugs on single-word lines or misplaced trailing spaces.

### Optimized Approach

Use a **two-phase greedy line simulator**: in each outer iteration, greedily collect maximal words for one line into `List<String> t` while tracking minimal width `cnt`; then branch cleanly between **left justification** (`i == n || t.size() == 1`) and **quotient-remainder full justification** (`w = spaceWidth / gaps`, `m = spaceWidth % gaps`).

### Step-by-Step Thinking Process

1. Maintain cursor `i = 0`. Start each new line `t` with `words[i]`, set `cnt = words[i].length()`, and advance `++i` (guaranteed `<= maxWidth` by constraints).
2. Greedily pack subsequent words while `i < n && cnt + 1 + words[i].length() <= maxWidth`, updating `cnt += 1 + words[i].length()` and `t.add(words[i++])`.
3. Check the left-justification condition first: if `i == n` (last line) or `t.size() == 1` (zero inter-word gaps), join `t` with `" "` and pad the right side with `" ".repeat(maxWidth - left.length())`.
4. Otherwise (`t.size() >= 2` and not last line), recover pure word-character count `cnt - (t.size() - 1) = cnt - t.size() + 1`, so `spaceWidth = maxWidth - (cnt - t.size() + 1)`.
5. Compute base gap width `w = spaceWidth / (t.size() - 1)` and remainder `m = spaceWidth % (t.size() - 1)`. Append each word `j` (`0 <= j < t.size() - 1`) followed by `w + (j < m ? 1 : 0)` spaces, then append the final word `t.get(t.size() - 1)`.

### Algorithm / Intuition

In `fullJustify(String[] words, int maxWidth)`:
- `cnt` tracks the exact length of `String.join(" ", t)`: the sum of word lengths **plus** `(t.size() - 1)` single separator spaces.
- Subtracting `(t.size() - 1)` from `cnt` (`cnt - t.size() + 1`) recovers the raw letter count of all words in `t`, so `spaceWidth = maxWidth - (cnt - t.size() + 1)` is the exact total number of spaces to place across all `t.size() - 1` slots.
- Handling `t.size() == 1` alongside `i == n` before computing `spaceWidth / (t.size() - 1)` simultaneously satisfies the single-word left-justification spec and guarantees `t.size() - 1 >= 1` (preventing `ArithmeticException: / by zero`).
- Java 11+'s `" ".repeat(...)` keeps space padding concise and readable.

---

## Dry Run

**Input:** `words = ["This", "is", "an", "example", "of", "text", "justification."]`, `maxWidth = 16`

1. **Line 1 (`i` starts at `0`):**
   - Packs `"This"` (`cnt = 4`), `"is"` (`4 + 1 + 2 = 7 <= 16`), `"an"` (`7 + 1 + 2 = 10 <= 16`). Next word `"example"` (`10 + 1 + 7 = 18 > 16`) stops loop. Now `t = ["This", "is", "an"]`, `cnt = 10`, `i = 3 < 7`.
   - Full justify: `spaceWidth = 16 - (10 - 3 + 1) = 8`, gaps = `2` -> `w = 8 / 2 = 4`, `m = 8 % 2 = 0`.
   - Builds `"This" + 4 spaces + "is" + 4 spaces + "an"` -> **`"This    is    an"`**.
2. **Line 2 (`i` starts at `3`):**
   - Packs `"example"` (`cnt = 7`), `"of"` (`7 + 1 + 2 = 10 <= 16`), `"text"` (`10 + 1 + 4 = 15 <= 16`). Next word `"justification."` (`15 + 1 + 14 = 30 > 16`) stops loop. Now `t = ["example", "of", "text"]`, `cnt = 15`, `i = 6 < 7`.
   - Full justify: `spaceWidth = 16 - (15 - 3 + 1) = 3`, gaps = `2` -> `w = 3 / 2 = 1`, `m = 3 % 2 = 1`.
   - Gap `j = 0` (`0 < 1`) gets `1 + 1 = 2` spaces; gap `j = 1` (`1 < 1` false) gets `1 + 0 = 1` space.
   - Builds **`"example  of text"`**.
3. **Line 3 (`i` starts at `6`):**
   - Packs `"justification."` (`cnt = 14`), `i` becomes `7 == n`.
   - Hits `if (i == n || t.size() == 1)`: `left = "justification."`, `right = "  "` (`16 - 14 = 2` spaces).
   - Adds **`"justification.  "`**.

**Output:** `["This    is    an", "example  of text", "justification.  "]`

---

## Complexity Analysis

- **Time Complexity:** `O(L)` — Where `L` is the total number of characters across all formatted output lines (`lines * maxWidth`, bounded by `O(n * maxWidth)` where `n = words.length`), since each word is scanned once and each output character is appended once.
- **Space Complexity:** `O(maxWidth)` auxiliary space — Excluding the output list `ans`, the per-line word list `t` and `StringBuilder row` hold at most `maxWidth` characters at a time.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [68text-justification.java](./68text-justification.java) |

---

## Key Learnings

- Whenever distributing `S` indivisible items as evenly as possible across `G` buckets with left-bias, bucket `j` (`0 <= j < G`) receives `S / G + (j < S % G ? 1 : 0)` items—no round-robin simulation loop needed!
- Grouping `i == n` (last line) and `t.size() == 1` (single-word line) into one early branch eliminates `t.size() - 1 == 0` division-by-zero errors cleanly.
- Break string-formatting simulation problems into cleanly decoupled stages: **1) Greedy Token Packing** -> **2) Layout Classification** -> **3) Exact String Assembly**.
