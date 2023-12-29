import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useUsers } from './UsersContext'
import { useNavigate } from 'react-router-dom'
import validationSignup from './validationsSignup'
import style from "../style.module.css"
function Signup() {
  const navigate = useNavigate()
    const {users,setUsers} = useUsers()
    const [warningBox, setWarningBox] = useState(false)
    const {handleSubmit , handleChange, values } = useFormik({
        initialValues:{
            userName:"",
            userSurname:"",
            nickName:"",
            userPassword:"",
            userCorrectAnswer :0
        },onSubmit:values =>{
          const findNick = users.find(user => user.nickName == values.nickName)
          if(findNick){
            setWarningBox(true)
          }else{
            setWarningBox(false)
            setUsers([...users,values])
            sessionStorage.setItem("activeUser", values.nickName)
            navigate("/question",{state: 1})
          }
         
        },validationSchema:validationSignup
    })


    const navigatePage =  (path) => {
      navigate(path)
    }

  return (
    <div className={style.appName}>
      <h2 style={{color:"#fff", fontSize:"40px"}}>Bilgi Yarışması</h2>
      <div className={style.authenticationBtn} >
        <button className={style.buttonStyle} onClick={() => navigatePage("/")}>Üye Ol</button>
      </div>
      <div className={ style.formContainer}>
        <form className={warningBox ?  style.formSignupWarning : style.formSignup} onSubmit={handleSubmit}>
          {
            warningBox && <div className={style.warningBox}>Bu kullanıcı adı bulunmaktadır. Başka bir kullanıcı adı deneyiniz.</div>
          }
          <div className={style.inputContainer}>
            <label htmlFor='userName'>Adınız : </label>
            <input style={{textIndent:"70px"}} name='userName' value={values.userName} onChange={handleChange} />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor='userSurname'>Soyadınız : </label>
            <input style={{textIndent:"90px"}} name='userSurname' value={values.userSurname} onChange={handleChange}/>
          </div>
          <div className={style.inputContainer}>
            <label htmlFor='nickName'>Kullanıcı Adınız : </label>
            <input name='nickName' value={values.nickName} onChange={handleChange}/>
          </div>
          <div className={style.inputContainer}> 
            <label htmlFor='userPassword'>Şifreniz : </label>
            <input style={{textIndent:"75px"}} name='userPassword' value={values.userPassword} onChange={handleChange}/>
          </div>
          <button className={style.submitBtn} type='submit' >Yarışmaya Başla</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
