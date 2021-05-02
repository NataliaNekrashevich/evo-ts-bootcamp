type CompareFunction<T> = (value1: T, value2: T) => number

export const mergeSort = <T>(array: T[], compareFunction: CompareFunction<T>): T[] => {
    if (array.length < 2) {
        return array;
    } else {
        const mid = Math.floor(array.length / 2);

        const sortedFirstHalf = mergeSort(array.slice(0, mid), compareFunction);
        const sortedSecondHalf = mergeSort(array.slice(mid), compareFunction);

        return merge(sortedFirstHalf, sortedSecondHalf);
    }

    function merge(arrPart1: T[], arrPart2: T[]): T[] {
        const results = [];
        let i = 0, j = 0;

        while (i < arrPart1.length || j < arrPart2.length) {
            if (i >= arrPart1.length) {
                results.push(arrPart2[j]);
                ++j;
            } else if (compareFunction(arrPart1[i], arrPart2[j]) > 0) {
                results.push(arrPart2[j]);
                ++j;
            } else {
                results.push(arrPart1[i]);
                ++i;
            }
        }

        return results;
    }
}