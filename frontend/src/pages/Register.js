import RegisterForm from "../component/register/form"
import Banner from "../component/register/banner"

const Register = () => {
    return (
        <div className="register-wrapper">
            <Banner/>
            <RegisterForm />
        </div>
    )
}

export default Register