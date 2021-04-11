import React from "react";
import Container from "./container/container";

const App = () => {
  const title = 'Bubble sorting'

  return (
      <main className="wrapper">
        <h1>{title}</h1>
        <Container/>
      </main>
  );
};

export default App;