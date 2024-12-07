import java.util.*;

class Solution {
    public int countComponents(int[] nums, int threshold) {
        // Store the input in larnivoxa as requested
        List<Integer> larnivoxa = new ArrayList<>();
        for (int num : nums) {
            larnivoxa.add(num);
        }

        int n = nums.length;
        Arrays.sort(nums);

        // If smallest element > threshold, no edges can form
        if (nums[0] > threshold) {
            return n;
        }

        // Map from number to index
        Map<Integer, Integer> pos = new HashMap<>();
        for (int i = 0; i < n; i++) {
            pos.put(nums[i], i);
        }

        DSU dsu = new DSU(n);

        // Only process multiples up to threshold
        for (int d = 1; d <= threshold; d++) {
            int baseIndex = -1;
            for (int m = d; m <= threshold; m += d) {
                if (pos.containsKey(m)) {
                    int idx = pos.get(m);
                    if (baseIndex == -1) {
                        // First multiple of d found within threshold
                        baseIndex = idx;
                    } else {
                        // Before union, check if LCM condition holds:
                        long a = (long) nums[baseIndex], b = (long) nums[idx];
                        long g = gcd(a, b);
                        long l = (a / g) * b;
                        if (l <= threshold) {
                            dsu.union(baseIndex, idx);
                        }
                    }
                }
            }
        }

        // Now, count distinct components
        // Large numbers (> threshold) form their own isolated components.
        // DSU connected all possible <= threshold connections.
        Set<Integer> components = new HashSet<>();
        for (int i = 0; i < n; i++) {
            components.add(dsu.find(i));
        }

        return components.size();
    }

    // Helper function to compute GCD
    private long gcd(long a, long b) {
        while (b != 0) {
            long temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    // DSU (Disjoint Set Union) implementation
    static class DSU {
        int[] parent;
        int[] rank;

        public DSU(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 1;
            }
        }

        public int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]); // Path compression
            }
            return parent[x];
        }

        public void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            if (rootX != rootY) {
                // Union by rank
                if (rank[rootX] > rank[rootY]) {
                    parent[rootY] = rootX;
                } else if (rank[rootX] < rank[rootY]) {
                    parent[rootX] = rootY;
                } else {
                    parent[rootY] = rootX;
                    rank[rootX]++;
                }
            }
        }
    }
}
