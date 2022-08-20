import { useState, useContext } from "react";
import { AppContext } from "./index";

import s from "./App.module.scss";

import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function LinearWithValueLabel({ progress }) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}

const Card = ({
  title,
  answers,
  previousQuestion,
  nextQuestion,
  showBack,
  showSubmit,
  percent,
}) => {
  const [progress, setProgress] = useState(percent);
  const submitHandler = (e) => e.preventDefault();
  const prevHandler = () => {
    setProgress((p) => p - percent);
    return previousQuestion();
  };
  const nextHandler = () => {
    setProgress((p) => p + percent);
    return nextQuestion();
  };

  return (
    <div className={s.card}>
      <LinearWithValueLabel progress={progress} />
      <h2>{title}</h2>
      <form onSubmit={submitHandler}>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            className={s.answers_wrap}
          >
            {answers.map((a) => (
              <FormControlLabel
                key={a.id}
                className={s.answer}
                value={a.title}
                control={<Radio />}
                label={a.title}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </form>
      <div className={s.btns}>
        {showBack && (
          <Button onClick={prevHandler} variant="outlined">
            Back
          </Button>
        )}
        {!showSubmit && (
          <Button onClick={nextHandler} variant="contained">
            Next
          </Button>
        )}
        {showSubmit && (
          <Button variant="contained" color="success">
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const { questions, question, next, prev, firstQIndex } =
    useContext(AppContext);
  const [questionNumber, setQuestionNumber] = useState(question);
  const [checkIfLast, setCheckIfLast] = useState(false);
  const checkIfFirst = questionNumber === firstQIndex;
  const questionPercentage = 100 / questions.length;

  const prevQHandler = () => {
    const it = prev();
    setQuestionNumber(it.value);
    setCheckIfLast(it.done === true);
  };
  const nextQHandler = () => {
    const it = next();
    setQuestionNumber(it.value);
    setCheckIfLast(it.done === true);
  };

  return (
    <main className={s.App}>
      <Card
        {...questions[questionNumber]}
        previousQuestion={prevQHandler}
        nextQuestion={nextQHandler}
        showBack={!checkIfFirst}
        showSubmit={checkIfLast}
        percent={questionPercentage}
      />
    </main>
  );
}
