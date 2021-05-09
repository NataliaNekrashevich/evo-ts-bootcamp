import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Action, compose, createStore, Reducer, Store} from "redux";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
}

interface BalanceUpdate extends Action<'UPDATE_BALANCE'> {
  type: 'UPDATE_BALANCE';
  payload: number;
}

interface Debit extends Action<'DEBIT'> {
  type: 'DEBIT';
  payload: number;
}

interface Credit extends Action<'CREDIT'> {
  type: 'CREDIT';
  payload: number;
}

interface SetTaxedBalance extends Action<'SET_BALANCE_WITH_TAX'> {
  type: 'SET_BALANCE_WITH_TAX';
  payload: number;
}

type Transactions = BalanceUpdate | Credit | Debit | SetTaxedBalance

const reducer: Reducer<number, Transactions> = (state: number = 0, action: Transactions) => {
  switch (action.type) {
    case 'UPDATE_BALANCE':
      return action.payload;

    case 'CREDIT':
      return state + action.payload;

    case 'DEBIT':
      return state - action.payload;

    case 'SET_BALANCE_WITH_TAX':
      return state * (100 - action.payload);

    default:
      return state;
  }
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose

const store: Store<number, Transactions> = createStore(
    reducer,
    undefined,
    composeEnhancers()
);

const actions: Transactions[] = [
  {type: "UPDATE_BALANCE", payload: 1000.0},
  {type: "CREDIT", payload: 200.0},
  {type: "CREDIT", payload: 100.0},
  {type: "SET_BALANCE_WITH_TAX", payload: 14.0},
  {type: "DEBIT", payload: 250.0},
  {type: "UPDATE_BALANCE", payload: 1000.0},
];

actions.forEach((action) => store.dispatch(action));


export default App;
