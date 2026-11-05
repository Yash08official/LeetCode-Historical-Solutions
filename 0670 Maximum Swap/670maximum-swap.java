class Solution {
    public int maximumSwap(int num) {
        // Convert the number into a character array to manipulate digits easily
        char[] arr = String.valueOf(num).toCharArray();
        int n = arr.length;
        
        // Array to keep track of the index of the largest digit to the right of each position
        int[] rightMax = new int[n];
        int maxPos = n - 1;  // Initialize with the last position
        
        rightMax[n - 1] = n - 1;  // The last element's max is itself
        
        // Fill the rightMax array by tracking the largest digit from right to left
        for (int i = n - 2; i >= 0; i--) {
            // Update maxPos if the current digit is greater than the max digit to its right
            if (arr[i] > arr[rightMax[i + 1]]) {
                maxPos = i;
            }
            rightMax[i] = maxPos;  // Store the position of the max digit found so far
        }
        
        // Now traverse the digits from left to right and find the first smaller digit to swap
        for (int i = 0; i < n; i++) {
            // If the current digit is smaller than the max digit to its right, swap
            if (arr[i] != arr[rightMax[i]]) {
                // Swap the digits
                char temp = arr[rightMax[i]];
                arr[rightMax[i]] = arr[i];
                arr[i] = temp;
                
                // Return the new number after the swap
                return Integer.valueOf(new String(arr));
            }
        }
        
        // If no swap is made, return the original number
        return num;
    }
}
