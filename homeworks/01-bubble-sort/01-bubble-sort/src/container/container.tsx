import React, {Component} from "react";
import SortingField from "../components/sorting-field/sorting-field";
import Menu from "../components/menu/menu";

type AppContainerState = {
    isSorted: boolean,
    isPaused: boolean,
    delay: number,
    array: number[],
    arrayLength: number,
    i: number,
    j: number,
};

class Container extends Component<{}, AppContainerState> {
    readonly defaultDelay = 1000;
    readonly defaultArrayLength = 15;
    private interval: any;

    constructor(props: {}) {
        super(props);
        this.state = {
            isSorted: false,
            isPaused: false,
            delay: this.defaultDelay,
            array: this.fillArray(),
            arrayLength: this.defaultArrayLength,
            i: this.defaultArrayLength - 1,
            j: 0,
        };
    }

    startSorting(delay: number = this.state.delay): void {
        this.interval = setInterval(
            () => {
                const newState = sortStep(this.state);
                this.setState({...newState});
                if (newState.isSorted) {
                    this.componentWillUnmount();
                }
            }, delay
        )
    }

    changeDelay = (delay: number): void => {
        this.componentWillUnmount();
        this.setState({delay});
        if (!this.state.isPaused) this.startSorting(delay);
    }

    setPause = (isPaused: boolean): void => {
        isPaused ? this.componentWillUnmount() : this.componentDidMount();
        this.setState({isPaused});
    }

    initializeArray = (arrayLength: number = this.defaultArrayLength) => {
        this.componentWillUnmount();
        this.setState({array: this.fillArray(arrayLength), isSorted: false, i: arrayLength - 1, j: 0, arrayLength});
        this.startSorting();
    }

    fillArray = (count: number = this.defaultArrayLength): number[] =>
        new Array(count).fill(0).map(() => Math.random());

    componentDidMount(): void {
        this.startSorting();
    }

    componentWillUnmount(): void {
        clearInterval(this.interval)
    }

    render(): JSX.Element {
        const {isSorted, isPaused, delay, array, i, j} = this.state
        return (
            <>
                <SortingField array={array}
                              i={i}
                              j={j}
                              isSorted={isSorted}
                />
                <Menu
                    isSorted={isSorted}
                    isPaused={isPaused}
                    delay={delay}
                    onDelayChange={this.changeDelay}
                    onPauseStatusChange={this.setPause}
                    onArrayInitialization={this.initializeArray}
                />
            </>
        )
    }
}

export default Container


export const sortStep = (state: AppContainerState): AppContainerState => {
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