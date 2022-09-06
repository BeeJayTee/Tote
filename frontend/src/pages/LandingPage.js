import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/login')
    }

    return (
        <h1>Wlcome to the Farm to Chef</h1>
    )
}

export default LandingPage