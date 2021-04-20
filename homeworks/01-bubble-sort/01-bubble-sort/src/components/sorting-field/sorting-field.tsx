import {Component} from "react";
import {SortState} from "../../business-logic/bubble-sort-realization";
import "./sorting-field.scss"

type SortingFieldProps = SortState;

export class SortingField extends Component<SortingFieldProps, {}> {
    readonly valueTransformScale = 1000;
    readonly cellTransformationScale = 5;

    getCellClass = ({index}: { index: number }): string => {
        const {i, j, isSorted} = this.props
        return `rectangle ${!isSorted && (index === j || index === j + 1) ? 'opacity' : ''} ${index > i || isSorted ? 'sorted' : ''}`
    }

    transformValue = (value: number): number => Math.floor(value * this.valueTransformScale);

    transformCellHeight = (value: number): number => value * this.valueTransformScale / this.cellTransformationScale;

    cell = (value: number, index: number): JSX.Element => {
        return (
            <div className='cell' key={value}>
                <div className={this.getCellClass({index})} style={{height: this.transformCellHeight(value)}}/>
                <div className="cell-value">{this.transformValue(value)}</div>
            </div>
        )
    }

    render() {
        return (
            <div className={'cell-wrapper'}>
                {this.props.array.map((value: number, index: number): JSX.Element => this.cell(value, index))}
            </div>
        )
    }
}