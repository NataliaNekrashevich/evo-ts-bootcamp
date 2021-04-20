import React from "react";
import {SortingContainer} from "./container/sorting-container";

const App = () => {
  const title = 'Bubble sorting'

  return (
      <main className="wrapper">
        <h1>{title}</h1>
        <SortingContainer/>
      </main>
  );
};

export default App;