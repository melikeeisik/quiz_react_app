import React, { useEffect, useState } from 'react'
import arrayShuffle from 'array-shuffle'
import { useUsers } from './UsersContext'
import { useNavigate } from 'react-router-dom'
import style from "../style.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion} from "@fortawesome/free-solid-svg-icons"
import { library } from '@fortawesome/fontawesome-svg-core'


function Question({question,setQuestionId}) {
    const navigate = useNavigate()
    const [questionsAnswers, setQuestionsAnswer] = useState([])
    const [correctAnswer , setCorrectAnswer] = useState(1)
    const {users,setUsers} = useUsers();
    const [btnStyle,setBtnStyle] = useState(Array(4).fill("#fff"))
    const [textColor, setTextColor] = useState(Array(4).fill("#0b126e"))
    const [clicked, setClicked] = useState(Array(4).fill(false))
    const [activeUser, setActiveUser] = useState("")
    const answerLetter = ["A", "B","C","D"]
    useEffect(() =>{
      const nick = sessionStorage.getItem("activeUser")
      setActiveUser(nick)
    })
    
    useEffect(() =>{
            const resetButton = () =>{
              setBtnStyle(Array(4).fill("#fff"));
              setClicked(Array(4).fill(false));
              setTextColor(Array(4).fill("#0b126e"))
            } 
            let questions =[...question.questionOtherAnswer, question.questionCorrectAnswer]
            const shuuffledAnswers = arrayShuffle(questions)
            setQuestionsAnswer(shuuffledAnswers)
            resetButton();
    }, [question])



    const controlAnswer = (answer , index) =>{
      if(clicked[index]){
        return
      }

      const updatedStyle = [...btnStyle];
      const updatedClicked = [...clicked]
      const updatedTextColor = [...textColor]


      if(answer == question.questionCorrectAnswer){
          setCorrectAnswer((prev) => prev+1)
          updatedStyle[index] = "#35a24f";
        }else{
          updatedStyle[index] = "#ba0600";
          const correctIndex = questionsAnswers.findIndex((item) => item === question.questionCorrectAnswer);
          updatedStyle[correctIndex] = "#35a24f";
          updatedTextColor[correctIndex] = "#fff"
        }
        updatedClicked[index] = true;
        updatedTextColor[index] = "#fff";
        console.log(updatedTextColor[index])
        setBtnStyle(updatedStyle);
        setClicked(updatedClicked);
        setTextColor(updatedTextColor)

        setTimeout(() =>{
          if(question.questionId == 10){
            const findUser = users.findIndex(user => user.nickName == activeUser)
            users[findUser].userCorrectAnswer = correctAnswer
            localStorage.setItem("users",JSON.stringify(users))
            navigate("/result")
          }else{
            setQuestionId(question.questionId+1)
          }
        },500)
    }

    library.add( faQuestion);


  return (
    <div className={style.questionPage}>
      <div className={style.questionNumber}>
        <div className={style.icon}>
          <FontAwesomeIcon icon="fa-solid fa-question" />
        </div>
        <div className={style.questionBox}>
          Soru {question.questionId}/10
        </div>
      </div>
      <div className={style.questionContainer}>
        <div className={style.questionName}>{question.questionTitle}</div>
      </div> 
        <div className={style.answersContainer}>
          {
            questionsAnswers.map((item, index) =>{
                return(
                    <button 
                    className={style.answerBtn} 
                    style={{backgroundColor: btnStyle[index], color:textColor[index]}} 
                    onClick={() =>controlAnswer(item, index)} 
                    key={index} 
                    disabled={clicked[index]}
                    >
                      <div style={{color:"#0b126e"}} className={style.letter}>
                        {answerLetter[index]}
                      </div>
                      {item}
                    </button>
                )
            })
          }
      </div>
    </div>
  )
}

export default Question
