class Solution {
    public int maximumSaleItems(int[][] items, int budget) {
        int n = items.length;

        // Step 1: Count how many items have each factor.
        int[] freq = new int[n + 1];

        int minPrice = Integer.MAX_VALUE;

        for (int[] item : items) {
            freq[item[0]]++;
            minPrice = Math.min(minPrice, item[1]);
        }

        // Step 2: Calculate the number of free-copy opportunities.
        int[] gain = new int[n + 1];

        for (int factor = 1; factor <= n; factor++) {
            int count = 0;

            for (int multiple = factor; multiple <= n; multiple += factor) {
                count += freq[multiple];
            }

            gain[factor] = count - 1;
        }

        // Step 3: Sort items by increasing price.
        Arrays.sort(items, (a, b) -> Integer.compare(a[1], b[1]));

        long remainingBudget = budget;
        long total = 0;

        // Step 4: Buy useful boosted copies first.
        for (int[] item : items) {
            int factor = item[0];
            int price = item[1];

            // A boosted copy is not useful if it costs
            // more than two copies of the cheapest item.
            if (price > 2L * minPrice) {
                break;
            }

            int available = gain[factor];

            long canBuy = remainingBudget / price;
            long take = Math.min((long) available, canBuy);

            total += take * 2;
            remainingBudget -= take * price;
        }

        // Step 5: Spend the remaining budget on the cheapest item.
        total += remainingBudget / minPrice;

        return (int) total;
    }
}