import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Login from "./Login";
import { QuestionsProvider } from "./QuestionsContext";
import { UsersProvider } from "./UsersContext";
import Signup from "./Signup";
import QuestionPage from "./QuestionPage";
import Result from "./Result";
function Routerr() {
  return (
    <Router>
        <UsersProvider> 
            <QuestionsProvider>       
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/question" element={<QuestionPage/>}/>
                    <Route path="/result" element={<Result/>}/>
                </Routes>
            </QuestionsProvider>
        </UsersProvider>

     </Router>
  )
}

export default Routerr
