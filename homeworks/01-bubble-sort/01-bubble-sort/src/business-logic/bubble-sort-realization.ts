export interface SortState {
    array: number[],
    isSorted: boolean,
    i: number,
    j: number,
}

export const sortStep: <T extends SortState>(state: T) => T = (state) => {
    let {array, i, j, isSorted} = state;
    if (i <= 0) {
        return {
            ...state,
            isSorted: true
        };
    }
    if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]
    }
    if (++j >= i) {
        i--;
        j = 0;
    }
    return {
        ...state,
        isSorted,
        array,
        i,
        j,
    };
}