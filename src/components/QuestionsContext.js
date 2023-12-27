import { createContext, useContext, useEffect, useState } from "react";
import jsonQuestions from "./questions.json"
const QuestionsContext = createContext()

export const QuestionsProvider = ({children}) =>{
    const [questions, setQuestions] = useState([])

    useEffect(() =>{
        setQuestions(jsonQuestions)
    },[questions])

    const values = {
        questions
    }
    
    return(
        <QuestionsContext.Provider value={values}>
            {children}
        </QuestionsContext.Provider>
    )

}
export const useQuestions = ()=>useContext(QuestionsContext)