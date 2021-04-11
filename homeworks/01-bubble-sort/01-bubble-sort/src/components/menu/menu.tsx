import {ChangeEvent, Component} from "react";
import "./menu.scss"

type MenuProps = {
    isSorted: boolean,
    isPaused: boolean,
    delay: number,
    onDelayChange: (delay: number) => void,
    onPauseStatusChange: (isPaused: boolean) => void,
    onArrayInitialization: () => void
};

class Menu extends Component<MenuProps, {}> {
    readonly SORTED_SUCCESS = 'sorted success';
    readonly NOT_SORTED = 'not sorted yet';
    readonly START = 'Start';
    readonly PAUSE = 'Pause';
    readonly SET_DELAY = 'Set sorting delay';
    readonly NEW_SET = 'New set';

    render() {
        const {isSorted, isPaused, delay} = this.props
        return (
            <div className='menu-wrapper'>
                <h4>Sorting status: {isSorted ? this.SORTED_SUCCESS : this.NOT_SORTED}</h4>
                <div className="menu-controls">
                    <div>{this.SET_DELAY}
                        <input type="number" className='delay-input' value={delay} onChange={this.updateDelay}/>
                    </div>
                    <div>
                        <button className="btn" onClick={this.initArray}>{this.NEW_SET}</button>
                        <button className="btn" onClick={this.setPause}>{isPaused ? this.START : this.PAUSE}</button>
                    </div>
                </div>

            </div>
        );
    }

    updateDelay = (delay: ChangeEvent<HTMLInputElement>): void => {
        this.props.onDelayChange(+delay.target.value)
    }

    setPause = (): void => {
        this.props.onPauseStatusChange(!this.props.isPaused)
    }

    initArray = (): void => {
        this.props.onArrayInitialization()
    }
}

export default Menu