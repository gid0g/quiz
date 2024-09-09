import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import "./bootstrap-5.3.3-dist/css/bootstrap.min.css";

function Question(props) {
  const option = [...props.options, props.correct];
  const [pickedOptions, setPickedOptions] = useState([]);

  function handleClick(event, number) {
    const pickedOption = event.target.value;
    const updatedPickedOptions = [...pickedOptions];

    if (updatedPickedOptions.includes(pickedOption)) {
      updatedPickedOptions.splice(updatedPickedOptions.indexOf(pickedOption), 1);
    } else {
      updatedPickedOptions.push(pickedOption);
    }

    setPickedOptions(updatedPickedOptions);
    props.handleOptionClick(pickedOption,number);
  }

  const [randomizedOptions, setRandomizedOptions] = useState([]);

  useEffect(() => {
    const Options = [...option].sort(() => Math.random() - 0.5);
    setRandomizedOptions(Options);
    setPickedOptions([]);
  }, [props.options]);

  return (
    <>
      <div className="quest w-75 p-3">
        <h3>{props.number + 1}. {props.question}</h3>
        {randomizedOptions.map((option, index) => {
          const isPicked = pickedOptions.includes(option);
          const isCorrect = option === props.correct;

          if (props.submit && isCorrect) {
            return (
              <button
                key={nanoid()}
                value={option}
                className="col mx-2 btn btn-md btn-success"
                disabled
              >
                {option}
              </button>
            );
          } else if (props.submit) {
            return (
              <button
                key={nanoid()}
                value={option}
                className={`col mx-2 btn btn-md ${
                  !isCorrect ? "btn-danger" : ""
                }`}
                disabled
              >
                {option}
              </button>
            );
          } else {
            return (
              <button
            key={nanoid()}
            value={option}
           className={`col mx-2 btn btn-md ${
            isPicked ? "btn-dark text-white" : "btn-outline-dark"
          }`}
  onClick={(event) => handleClick(event, props.number)}
>
  {option}
</button>
            );
          }
        })}
      </div>
      <hr />
    </>
  );
}

export default Question;
