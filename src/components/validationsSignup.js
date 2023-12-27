import * as yup from "yup"

const validationSignup = yup.object().shape({
    userName : yup.string().required(),
    userSurname : yup.string().required(),
    nickName : yup.string().required(),
    userPassword : yup.string().min(5).required()
})

export default validationSignup