import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { createContext } from "react";

const questions = [
  {
    id: Math.random().toString(),
    title: "Question 1",
    answers: [
      { id: 1, title: "Answer 1 1", truthfull: true },
      { id: 2, title: "Answer 2", truthfull: false },
      { id: 3, title: "Answer 3", truthfull: false },
      { id: 4, title: "Answer 4", truthfull: false },
    ],
  },
  {
    id: Math.random().toString(),
    title: "Question 2",
    answers: [
      { id: 1, title: "Answer 1 2", truthfull: false },
      { id: 2, title: "Answer 2", truthfull: false },
      { id: 3, title: "Answer 3", truthfull: true },
      { id: 4, title: "Answer 4", truthfull: false },
    ],
  },
  {
    id: Math.random().toString(),
    title: "Question 3",
    answers: [
      { id: 1, title: "Answer 1 3", truthfull: false },
      { id: 2, title: "Answer 2", truthfull: true },
      { id: 3, title: "Answer 3", truthfull: false },
      { id: 4, title: "Answer 4", truthfull: false },
    ],
  },
  {
    id: Math.random().toString(),
    title: "Question 4",
    answers: [
      { id: 1, title: "Answer 1 4", truthfull: true },
      { id: 2, title: "Answer 2", truthfull: false },
      { id: 3, title: "Answer 3", truthfull: false },
      { id: 4, title: "Answer 4", truthfull: false },
    ],
  },
  {
    id: Math.random().toString(),
    title: "Question 5",
    answers: [
      { id: 1, title: "Answer 1 5", truthfull: false },
      { id: 2, title: "Answer 2", truthfull: false },
      { id: 3, title: "Answer 3", truthfull: false },
      { id: 4, title: "Answer 4", truthfull: true },
    ],
  },
];
export const AppContext = createContext(questions);

const obj = {
  values: Object.keys(questions),
  [Symbol.iterator]() {
    const values = this.values;
    const min = 0;
    const max = values.length - 1;

    let index = -1;

    return {
      next() {
        index = Math.min(index + 1, max);
        return { value: values[index], done: index + 1 > max };
      },
      prev() {
        index = Math.max(index - 1, min);
        return { value: values[index], done: index < min };
      },
    };
  },
};
const it = obj[Symbol.iterator]();

const AppProvider = ({ children }) => {
  const value = {
    questions,
    question: it.next().value || it.previous().value,
    next: it.next,
    prev: it.prev,
    firstQIndex: obj.values[0],
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
