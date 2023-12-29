import React, { useEffect, useState } from 'react'
import arrayShuffle from 'array-shuffle'
import { useUsers } from './UsersContext'
import { useNavigate } from 'react-router-dom'
import style from "../style.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faX, faCheck, faShareFromSquare, faCircleHalfStroke, faCircleCheck} from "@fortawesome/free-solid-svg-icons"
import { library } from '@fortawesome/fontawesome-svg-core'


function Question({question,setQuestionId}) {
    const navigate = useNavigate()
    const [questionsAnswers, setQuestionsAnswer] = useState([])
    const [correctAnswer , setCorrectAnswer] = useState(1)
    const [wrongAnswer, setWrongAnswer] = useState(0)
    const {users,setUsers} = useUsers();
    const [btnStyle,setBtnStyle] = useState(Array(4).fill("#fff"))
    const [textColor, setTextColor] = useState(Array(4).fill("#0b126e"))
    const [clicked, setClicked] = useState(Array(4).fill(false))
    const [activeUser, setActiveUser] = useState("")
    const [barWidth, setBarWidth] = useState(100)
    const [btnDisabled, setBtnDisabled] = useState({pass:false, fifty : false, passKnow : false})
  
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

      let time = setInterval(frame, 250)
      function frame() {
        setBarWidth((prevBar) =>{
          if(prevBar <= 0){
            clearInterval(time)
            setQuestionId(prevQuestion =>{
              if(prevQuestion == 10){
                const findUser = users.findIndex(user => user.nickName == activeUser)
                users[findUser].userCorrectAnswer = correctAnswer
                localStorage.setItem("users",JSON.stringify(users))
                navigate("/result")
              }else{
                return prevQuestion +1
              }
            })
            return 100
          }else{
            return prevBar - 1 
          }
        }) 
      }
      return () => clearInterval(time)
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
          setWrongAnswer(prev => prev + 1 )
          updatedStyle[index] = "#ba0600";
          const correctIndex = questionsAnswers.findIndex((item) => item === question.questionCorrectAnswer);
          updatedStyle[correctIndex] = "#35a24f";
          updatedTextColor[correctIndex] = "#fff"
        }
        updatedClicked[index] = true;
        updatedTextColor[index] = "#fff";
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


    const handleClick = (e) =>{
      let jokerId = e.target.id

      console.log(jokerId)
      setBtnDisabled(prev =>( {...prev, [jokerId] : true}))
      if(jokerId== "pass"){
        setTimeout(() =>{
          setQuestionId(prev => {
            if(question.questionId == 10){
              const findUser = users.findIndex(user => user.nickName == activeUser)
              users[findUser].userCorrectAnswer = correctAnswer
              localStorage.setItem("users",JSON.stringify(users))
              navigate("/result")
            }else{
              return prev + 1
            }
          })},500)
      }else if (jokerId == "fifty"){
        let removeAnswers = questionsAnswers.filter(item => item != question.questionCorrectAnswer).slice(0,1)
        let newAnswers = [removeAnswers,question.questionCorrectAnswer, null,null]
        setQuestionsAnswer(newAnswers)
      }else if(jokerId =="passKnow" ){
        const correctIndex = questionsAnswers.findIndex((item) => item === question.questionCorrectAnswer);
        const updatedStyle = [...btnStyle];
        const updatedTextColor = [...textColor]
        updatedStyle[correctIndex] = "#35a24f";
        updatedTextColor[correctIndex] = "#fff"
        setCorrectAnswer(prev=> prev + 1)
        setBtnStyle(updatedStyle);
        setTextColor(updatedTextColor)
        setTimeout(() =>{
          setQuestionId(prev => {
            if(question.questionId == 10){
              const findUser = users.findIndex(user => user.nickName == activeUser)
              users[findUser].userCorrectAnswer = correctAnswer
              localStorage.setItem("users",JSON.stringify(users))
              navigate("/result")
            }else{
              return prev + 1
            }
          })
        }, 500)
      }else{
        return
      }
    }



    library.add( faQuestion, faX, faCheck , faShareFromSquare, faCircleHalfStroke, faCircleCheck);

  return (
    <div className={style.questionPage}>
      <div className={style.boxContainer}>
        <div className={style.questionNumber}>
          <div className={style.icon}>
            <FontAwesomeIcon icon="fa-solid fa-question" />
          </div>
          <div className={style.questionBox}>
            Soru {question.questionId}/10
          </div>
        </div>
        <div className={style.box}>
          <div className={style.questionNumber}>
            <div style={{backgroundColor:"#ba0600"}} className={style.icon}>
              <FontAwesomeIcon icon="fa-solid fa-x" />
            </div>
            <div className={style.questionBox}>
              Yanlış : {wrongAnswer}
            </div>
          </div>
          <div className={style.questionNumber}>
            <div style={{backgroundColor:"#35a24f"}} className={style.icon}>
              <FontAwesomeIcon icon="fa-solid fa-check" />
            </div>
            <div className={style.questionBox}>
              Doğru : {correctAnswer - 1}
            </div>
          </div>
        </div>
      </div>
      <div>
      <div className={style.progress}>
        <div  style={{width: `${barWidth}%`}} className={style.bar}>
        </div>
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
                    onClick={() =>{controlAnswer(item, index);setBarWidth(100)}} 
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
      <div className={style.jokersContainer}>
          <button id="pass" className={ btnDisabled.pass ? style.jokerDisabled:  style.joker  } onClick={handleClick} disabled={btnDisabled.pass}>
            <FontAwesomeIcon style={{color:"#4eb2d3", fontSize:"20px"}} icon="fa-solid fa-share-from-square" />
            <span>
              Pas Geç 
            </span>
          </button>
          <button id="fifty" className={ btnDisabled.fifty ? style.jokerDisabled:  style.joker  } onClick={handleClick} disabled={btnDisabled.fifty}>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center", backgroundColor:"#4eb2d3", width:"35px", height:"35px", borderRadius:"999px", fontSize:"13px"}}>
             2 / 2 
            </div>
            <span>Yarı Yarıya</span>
          </button>
          <button id="passKnow" className={ btnDisabled.passKnow ? style.jokerDisabled:  style.joker  }  onClick={handleClick} disabled={btnDisabled.passKnow}>
            <FontAwesomeIcon style={{fontSize:"30px", color:"#4eb2d3"}}  icon="fa-solid fa-circle-check" />
            <span>Bil Geç</span>
          </button>
      </div>
    </div>
  )
}

export default Question
