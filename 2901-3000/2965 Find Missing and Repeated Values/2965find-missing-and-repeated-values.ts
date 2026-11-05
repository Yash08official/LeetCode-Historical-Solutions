class ArrayWrapper {
    private nums: number[];
    private s: number;

    constructor(nums: number[]) {
        this.nums = nums;
        this.s = nums.reduce((a, b) => a + b, 0);
    }

    valueOf() {
        return this.s;
    }

    toString() {
        return `[${this.nums}]`;
    }
}

function findMissingAndRepeatedValues(grid: number[][]): number[] {
    const n = grid.length;
    const nums: number[] = grid.flat(); // Flatten the 2D grid into a 1D array
    const wrapper = new ArrayWrapper(nums);
    
    const expectedSum = (n * n * (n * n + 1)) / 2; // Sum of first n*n natural numbers
    const actualSum = wrapper.valueOf();
    
    const numSet = new Set<number>();
    let repeated = -1;
    let missing = expectedSum - actualSum; // Initial assumption for missing number

    for (const num of nums) {
        if (numSet.has(num)) {
            repeated = num;
            missing += num; // Adjust the missing number
        }
        numSet.add(num);
    }

    return [repeated, missing];
}
