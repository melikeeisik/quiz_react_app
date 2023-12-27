import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuestions } from './QuestionsContext'
import Question from './Question'
function QuestionPage() {
    const location = useLocation()
    const id = location.state
    const [questionId,setQuestionId] = useState(id)
    const [question,setQuestion] = useState(undefined)
    const {questions} = useQuestions()
    
    useEffect(() =>{
        const findQuestion =  questions.find(item => item.questionId == questionId)
        setQuestion(findQuestion)
    }, [questionId])


  return (
    <div>
        <div>
            {
                question && <Question question={question} setQuestionId={setQuestionId}/>
            }
        </div>
        <br/>
    


    </div>

  )
}

export default QuestionPage
