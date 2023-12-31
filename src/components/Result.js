import React, { useEffect, useState } from 'react'
import { useUsers } from './UsersContext'
import style from "../style.module.css"
import { useNavigate } from 'react-router-dom'

function Result() {
    const navigate = useNavigate()
    const [allUsers,setAllUsers] = useState([])
   
    useEffect(() =>{
        const localUsers = JSON.parse(localStorage.getItem("users"))
        localUsers.sort((a,b) =>{
            return b.userCorrectAnswer - a.userCorrectAnswer
        })
        setAllUsers(localUsers)
    }, [])

    const logOut = () =>{
        sessionStorage.removeItem('activeUser');
        navigate("/")
    }

  return (
    <div className={style.result}>
        <h2 style={{color:"#fff", fontSize:"40px"}}>Sonuçlar</h2>
        <ul className={style.correctList}>
            {
                allUsers.map((item, index)=>{
                    return(
                        <li className={style.userContainer} key={index}>
                            <div style={{  width: '65px', height: '65px' , display:"flex", alignItems:"center"}}>
                                <img style={{width:"100%", objectFit:"contain"}}  src={`https://api.multiavatar.com/${item.userName}.png`}/>
                            </div>
                            <div className={style.userNameContainer}>
                                <div >{item.userName} {item.userSurname} </div>
                                <div>{item.userCorrectAnswer * 10} Puan</div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button onClick={logOut} className={style.logOut}>Çıkış Yap</button>
        </div>
    </div>
  )
}

export default Result
