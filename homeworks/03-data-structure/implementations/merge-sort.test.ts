import {mergeSort} from "./merge-sort"

describe('sort by custom merge sort', () => {
    const compareFn = (a, b) => a - b

    test('should sort random array', () => {
        const randomArray = Array(1000).fill(0).map(() => {
            const rndNumber = Math.random();
            return rndNumber * (rndNumber > 0.5 ? -1 : 1)
        })
        const expected = [...randomArray].sort(compareFn)
        const actual = mergeSort([...randomArray], compareFn)

        expect(expected).toEqual(actual)
    })

    test('should sort empty array', () => {
        const emptyArr = [];
        const expected = [...emptyArr].sort(compareFn)
        const actual = mergeSort([...emptyArr], compareFn)

        expect(expected).toEqual(actual)
    })
})