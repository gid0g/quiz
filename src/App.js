import { useState, useEffect } from "react";
import "./App.css";
import Question from "./questions.js";
import {nanoid} from "nanoid"
import 'bootstrap/dist/css/bootstrap.css';
import {TypeObjects,DifficultyObjects,categoryObjects} from "./setting.js"
function App() {
  const [valid, setValid] = useState([]);
  const [started, Start] = useState(false);
  const [selected, setSelected]= useState([])

  const Styles = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    "justifyContent": "center",
    "alignItems": "center",
  };
  const handleOptionClick = (optionValue,index) => {
    setSelected((e)=>{
      const newSet=[...e]
      newSet[index]={
        index:index,
        value:optionValue
      }
      return newSet
    })
  };

  const [settings, setSetting]= useState({})
  const[submitted,setSubmit]= useState(false)

  function handleChange(event){
    console.log(event.target.name,event.target.value)
    setSetting((e)=>{
      const newObject = { ...e };
        newObject[event.target.name] = event.target.value;
      
      return newObject;
    })
  }

  const api =
    `https://opentdb.com/api.php?amount=${settings.number?settings.number:"10"}${settings.category?`&category=${settings.category}`:''}${settings.difficulty?`&difficulty=${settings.difficulty}`:''}${settings.type?`&type=${settings.type}`:''}`;
  const [quest, setQuest] = useState([]);
  const[test,setTest]=useState([])
  useEffect(()=>{

    setTest(quest.map((question, index) => {   
        return  <Question number={index} question={question.question} submit={submitted} valid={valid} handleOptionClick={handleOptionClick} options={question.incorrect_answers} correct={question.correct_answer} key={nanoid()}/>;;
      }))
  },[quest,submitted])  

    useEffect(()=>{
     quest.map((json)=>{
      setValid((e)=>{
        const newValid=[...e]
        newValid.push(json.correct_answer)
        return newValid
      })
      // setValid(json.correct_answer)
     })
    },[quest])

  async function getData() {
    try {
      const response = await fetch(api);
      const json = await response.json();
      if (json.response_code === 0) {
        setQuest((e)=>{
      return  json.results
      });
        console.log("Questions Updated");
      } else {
        alert("Failed to fetch question. Please try again")
        window.location.reload()
        // getData()
        console.log("Questions failed to update");
      }
      console.log("Questions:", json);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }
  function Submit(){
    setSubmit(!submitted)
    alert("Is this your final choice of answers? ")
    const newArray = selected.map((obj, index) => {
      if (valid.includes(obj.value) && index === valid.indexOf(obj.value)) {
        return obj;
      }
      return null;
    }).filter(Boolean);
  const commonCount = newArray.length;
  console.log(commonCount, newArray)
    console.log("selected", selected)
    console.log("correct", valid)
    alert(`You got ${commonCount} out of ${valid.length}`)
  }

  function startGame() {
    getData();
    Start(true);
  }

var catSet=categoryObjects.map((e)=>{
 return <option  value={e.value}>{e.name}</option>
})
var typeSet=TypeObjects.map((e)=>{
 return <option  value={e.value}>{e.name}</option>
})
var difSet=DifficultyObjects.map((e)=>{
 return <option  value={e.value}>{e.name}</option>
})
function tryAgain(){
  setSubmit(false)
  getData()
  setValid([])

}
  return (
    <>
      {!started && (
        <div style={Styles}>
          <div className="text-center">
            <h1 className="h1">Quizzical</h1>
            <div className="d-flex gx-2">
              <input type="number" name="number"  value={settings.number? settings.number:10} className="form-control" min="1" max="50" onChange={handleChange}  required/>
            <select className="form-select" required name="category" aria-label="Select Category" onChange={handleChange}>
  <option>Any Category</option>
{catSet}
</select>
            <select className="form-select" required name="difficulty" aria-label="Select Difficulty" onChange={handleChange}>
  <option >Any Difficulty</option>
  {difSet}

</select>
            <select className="form-select" required name="type" aria-label="Select Type" onChange={handleChange}>
  <option >Any Type</option>
{typeSet}
</select>
</div>
            <h4>
              {" "}
              <a
                href="https://www.figma.com/file/E9S5iPcm10f0RIHK8mCqKL/Quizzical-App?type=design&node-id=0-1&mode=design"
                target="_blank"
              >
                {" "}
                Some descriptions if needed{" "}
              </a>
            </h4>
     <button className="btn btn-lg btn-success" onClick={startGame}>
              {" "}
              Start Game{" "}
            </button>
          </div>
        </div>
      )}
      {started &&
       <>
       {test}
       <div className="d-flex justify-content-center">    
       {
        submitted?        <button className="btn btn-lg btn-success" onClick={tryAgain}>Try Again</button>:

        <button className="btn btn-lg btn-success" onClick={Submit}>Submit</button>
       }    
       </div>
       </>
       
       }
    </>
  );
}

export default App;
