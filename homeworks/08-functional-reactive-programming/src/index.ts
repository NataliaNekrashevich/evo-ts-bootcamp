import { fromEvent, interval } from 'rxjs';
import {
  map, scan, startWith, switchMap, takeWhile, tap,
} from 'rxjs/operators';
import {
  dog, moveDot, setGameOverText, setTimerText, time, updatedScore,
} from './render';
import './style.css';
import '../assets/cursor.svg';
import '../assets/dog.jpg';
import './index.html';
import '../assets/grass.png';

interface State {
    score: number;
    time: number;
}

const gameState: State = { score: -1, time: 500 };

const makeInterval = (val: State) => interval(val.time).pipe(
  map((v) => `${time - v}`),
  tap(setTimerText),
);
const nextState = (acc: State): State => ({
  score: (acc.score += 1),
  time: acc.time,
});
const isNotGameOver = (deltaTime: string): boolean => +deltaTime > 0;

const game$ = fromEvent(dog!, 'click').pipe(
  startWith(null),
  tap(moveDot),
  scan<Event, State>(nextState, gameState),
  tap((state) => updatedScore(`${state.score}`)),
  switchMap(makeInterval),
  takeWhile(isNotGameOver),
);

game$.subscribe(
  () => {
  },
  () => {
  },
  () => setGameOverText('Game over'),
);
