const size = 5;
export const time = 3;

const elem = (id: string): HTMLElement | null => document.getElementById(id);
const setElementText = (el: HTMLElement | null, text: { toString: () => any; }): void => (el!.innerText = text.toString());

const random = (): { x: number, y: number } => {
  const cellIndex: number = Math.floor(Math.random() * size * size);
  return { x: (cellIndex % size) * 100, y: Math.floor(cellIndex / size) * 100 };
};

const timer = elem('timer');
const scoreEl = elem('score');
const status = elem('status');

export const updatedScore = (score: string) => setElementText(scoreEl, score);
export const setTimerText = (text: string): void => setElementText(timer, text);
export const setGameOverText = (text: string): void => setElementText(status, text);
export const dog = elem('dog');
export const field = elem('field');
field!.innerHTML = [...Array(size * size).keys()].reduce((el, id): string => el += `<div id="${id}" class="cell"></div>`, '');
setTimerText(`${time}`);

export const moveDot = () => {
  const newPos = random();
  dog!!.style.transform = `translate(${newPos.x}px, ${newPos.y}px)`;
};
