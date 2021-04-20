import React, {Component} from "react";
import {SortingField} from "../components/sorting-field/sorting-field";
import {Menu} from "../components/menu/menu";
import {SortState, sortStep} from "../business-logic/bubble-sort-realization";

type AppSortingContainerState = {
    isPaused: boolean,
    delay: number,
    arrayLength: number,
} & SortState;

export class SortingContainer extends Component<{}, AppSortingContainerState> {
    readonly defaultDelay = 1000;
    readonly defaultArrayLength = 15;
    private interval: NodeJS.Timer | undefined;

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

    private static clearInterval(interval: NodeJS.Timer | undefined): void {
        if (interval) clearInterval(interval);
    }

    private startSorting(delay: number = this.state.delay): void {
        this.interval = setInterval(
            () => {
                const newState = sortStep(this.state);
                this.setState({...newState});
                if (newState.isSorted) {
                    SortingContainer.clearInterval(this.interval);
                }
            }, delay
        )
    }

    private fillArray = (count: number = this.defaultArrayLength): number[] =>
        new Array(count).fill(0).map(() => Math.random());

    changeDelay = (delay: number): void => {
        SortingContainer.clearInterval(this.interval);
        this.setState({delay});
        if (!this.state.isPaused) this.startSorting(delay);
    }

    setPause = (isPaused: boolean): void => {
        isPaused ? SortingContainer.clearInterval(this.interval) : this.startSorting();
        this.setState({isPaused});
    }

    initializeArray = (arrayLength: number = this.defaultArrayLength) => {
        SortingContainer.clearInterval(this.interval);
        this.setState({array: this.fillArray(arrayLength), isSorted: false, i: arrayLength - 1, j: 0, arrayLength});
        this.startSorting();
    }

    componentDidMount(): void {
        this.startSorting();
    }

    componentWillUnmount(): void {
        SortingContainer.clearInterval(this.interval);
    }

    render(): JSX.Element {
        const {isSorted, isPaused, delay, array, i, j} = this.state;
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