import java.util.*;

class Solution {
    public int[][] validArrangement(int[][] pairs) {
        // Step 1: Build the graph and track in-degrees and out-degrees
        Map<Integer, Stack<Integer>> graph = new HashMap<>();
        Map<Integer, Integer> inDegree = new HashMap<>();
        Map<Integer, Integer> outDegree = new HashMap<>();
        
        for (int[] pair : pairs) {
            int from = pair[0];
            int to = pair[1];
            
            graph.putIfAbsent(from, new Stack<>());
            graph.get(from).push(to);
            
            outDegree.put(from, outDegree.getOrDefault(from, 0) + 1);
            inDegree.put(to, inDegree.getOrDefault(to, 0) + 1);
        }
        
        // Step 2: Find the start node
        int startNode = pairs[0][0];
        for (int node : graph.keySet()) {
            if (outDegree.getOrDefault(node, 0) - inDegree.getOrDefault(node, 0) == 1) {
                startNode = node;
                break;
            }
        }
        
        // Step 3: Perform Hierholzer's Algorithm for Eulerian Path
        List<Integer> path = new ArrayList<>();
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(startNode);
        
        while (!stack.isEmpty()) {
            int node = stack.peek();
            if (graph.containsKey(node) && !graph.get(node).isEmpty()) {
                int nextNode = graph.get(node).pop();
                stack.push(nextNode);
            } else {
                path.add(stack.pop());
            }
        }
        
        // Step 4: Construct the result in reverse order of the path
        Collections.reverse(path);
        int[][] result = new int[pairs.length][2];
        for (int i = 0; i < pairs.length; i++) {
            result[i][0] = path.get(i);
            result[i][1] = path.get(i + 1);
        }
        
        return result;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Example 1
        int[][] pairs1 = {{5, 1}, {4, 5}, {11, 9}, {9, 4}};
        int[][] result1 = solution.validArrangement(pairs1);
        System.out.println(Arrays.deepToString(result1));
        
        // Example 2
        int[][] pairs2 = {{1, 3}, {3, 2}, {2, 1}};
        int[][] result2 = solution.validArrangement(pairs2);
        System.out.println(Arrays.deepToString(result2));
    }
}
