import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/dashboard')
    }

    return (
        <form onSubmit={handleSubmit} className="loginForm">
            <button>Login</button>
        </form>
    )
}

export default Login