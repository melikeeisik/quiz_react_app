import * as yup from "yup"

const validationLogin = yup.object().shape({
    nickName : yup.string().required(),
    userPassword : yup.string().min(5).required()
})

export default validationLogin