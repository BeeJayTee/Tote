import { useState } from 'react'

const Signup = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [retypePassword, setRetypePassword] = useState()
    const [passwordMatchError, setPasswordMatchError] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password)
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}    
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}    
            />
            <label>Retype Password:</label>
            <input
                type="password"
                onChange={(e) => setRetypePassword(e.target.value)}
                value={retypePassword}    
            />
            {passwordMatchError && <p>{passwordMatchError}</p>}
            <button>Submit</button>
        </form>
    )
}

export default Signup