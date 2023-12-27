import React from 'react'
import { useFormik } from 'formik'
import { useUsers } from './UsersContext'
import { useNavigate } from 'react-router-dom'
import validationLogin from './validationsLogin'
import style from "../style.module.css"
function LoginForm() {
  const navigate = useNavigate()
  const {users,setUsers} = useUsers()
  const {handleSubmit , handleChange, values } = useFormik({
      initialValues:{
          nickName:"",
          userPassword:"",
          userCorrectAnswer :0
      },onSubmit:values =>{
        console.log("hey")
        const findUser = users.find(user => user.nickName == values.nickName)
        if(findUser){
          if(findUser.userPassword == values.userPassword){
            console.log(findUser)
            navigate("/question" ,{state : 1})
            sessionStorage.setItem("activeUser", values.nickName)
          }
        }
      },validationSchema: validationLogin
  })

  const navigatePage =  (path) => {
    navigate(path)
  }

return (
  <div className={style.appName}>
    <h2 style={{color:"#fff", fontSize:"40px"}}>Bilgi Yarışması</h2>
    <div className={style.authenticationBtn}>
      <button className={style.buttonStyle}  onClick={() => navigatePage("/")}>Giriş Yap</button>
    </div>
    <div className={style.formContainer}>
      <form className={style.formLogin} onSubmit={handleSubmit}>
        <div className={style.inputContainer}>
          <label htmlFor='nickName'>Kullanıcı Adınız : </label>
            <input name='nickName' value={values.nickName} onChange={handleChange}/>
         
        </div>
        <div className={style.inputContainer}>
          <label htmlFor='userPassword'>Şifreniz:</label>
            <input style={{textIndent:"70px"}} name='userPassword' value={values.userPassword} onChange={handleChange}/>
        </div>
        <button className={style.submitBtn} type='submit' >Yarışmaya Başla</button>
      </form>
      <br/>
      <div className={style.createAccount}>
        Hesabın yok mu ? 
        <a target = "_self" href='/signup'> Hesap oluştur </a>
      </div>
    </div>
  </div>
)
}

export default LoginForm
