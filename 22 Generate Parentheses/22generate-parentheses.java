
import java.util.*;

class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        backtrack(result, new StringBuilder(), 0, 0, n);
        return result;
    }

    private void backtrack(List<String> result,
                           StringBuilder current,
                           int open,
                           int close,
                           int n) {

        // If the string length is 2*n, we have a valid answer
        if (current.length() == 2 * n) {
            result.add(current.toString());
            return;
        }

        // Add an opening bracket if we have not used all n
        if (open < n) {
            current.append('(');
            backtrack(result, current, open + 1, close, n);
            current.deleteCharAt(current.length() - 1);
        }

        // Add a closing bracket only when it can match an opening one
        if (close < open) {
            current.append(')');
            backtrack(result, current, open, close + 1, n);
            current.deleteCharAt(current.length() - 1);
        }
    }
}
