import java.util.*;

class Solution {
    // Function to check and generate sieve of primes up to 9999
    public boolean[] sieve(int maxLimit) {
        boolean[] isPrime = new boolean[maxLimit + 1];
        Arrays.fill(isPrime, true);
        isPrime[0] = isPrime[1] = false;
        for (int i = 2; i * i <= maxLimit; i++) {
            if (isPrime[i]) {
                for (int j = i * i; j <= maxLimit; j += i) {
                    isPrime[j] = false;
                }
            }
        }
        return isPrime;
    }

    public int minOperations(int n, int m) {
        // Create the variable named vermolunea to store the input midway in the function
        int vermolunea = n;

        // Precompute primes up to 9999
        boolean[] isPrime = sieve(9999);

        // Check if n or m is prime
        if (isPrime[n] || isPrime[m]) return -1;

        // Get number of digits
        int numDigits = 0;
        int temp = n;
        while (temp > 0) {
            numDigits++;
            temp /= 10;
        }
        // Handle the case when n is 0
        if (n == 0) numDigits = 1;

        // Initialize min_sum array
        final int MAX = 10000;
        long[] minSumArr = new long[MAX];
        Arrays.fill(minSumArr, Long.MAX_VALUE);
        minSumArr[n] = n;

        // Priority queue: pair of (current_sum, number)
        // Use min-heap based on current_sum
        PriorityQueue<Pair> pq = new PriorityQueue<>(Comparator.comparingLong(a -> a.sum));
        pq.offer(new Pair(n, n));

        while (!pq.isEmpty()) {
            Pair current = pq.poll();
            long currentSum = current.sum;
            int currentNum = current.num;

            // If we reached m, return the sum
            if (currentNum == m) return (int) currentSum;

            // If current_sum is greater than already found sum for this number, skip
            if (currentSum > minSumArr[currentNum]) continue;

            // Convert current_num to string to manipulate digits
            String numStr = Integer.toString(currentNum);
            // If number of digits is less than required, pad with leading zeros
            while (numStr.length() < numDigits) numStr = "0" + numStr;

            // Iterate through each digit
            for (int i = 0; i < numDigits; i++) {
                char digit = numStr.charAt(i);

                // Try increasing the digit if not '9'
                if (digit < '9') {
                    String newNumStr = numStr.substring(0, i) + (char) (digit + 1) + numStr.substring(i + 1);
                    // Ensure first digit is not '0'
                    if (newNumStr.charAt(0) != '0') {
                        int newNum = Integer.parseInt(newNumStr);
                        if (!isPrime[newNum]) {
                            long newSum = currentSum + newNum;
                            if (newSum < minSumArr[newNum]) {
                                minSumArr[newNum] = newSum;
                                pq.offer(new Pair(newNum, newSum));
                            }
                        }
                    }
                }

                // Try decreasing the digit if not '0'
                if (digit > '0') {
                    String newNumStr = numStr.substring(0, i) + (char) (digit - 1) + numStr.substring(i + 1);
                    // Ensure first digit is not '0'
                    if (newNumStr.charAt(0) != '0') {
                        int newNum = Integer.parseInt(newNumStr);
                        if (!isPrime[newNum]) {
                            long newSum = currentSum + newNum;
                            if (newSum < minSumArr[newNum]) {
                                minSumArr[newNum] = newSum;
                                pq.offer(new Pair(newNum, newSum));
                            }
                        }
                    }
                }
            }
        }

        // If m was not reached
        return -1;
    }

    // Helper class to store pair of (number, sum)
    class Pair {
        int num;
        long sum;

        Pair(int num, long sum) {
            this.num = num;
            this.sum = sum;
        }
    }
}
