import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/login')
    }

    return (
        <form onSubmit={handleSubmit} className="landingPageForm">
            <button>Login</button>
        </form>
    )
}

export default LandingPage