import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const AdminLogin = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const {dispatch} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4141/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context
            dispatch({type: 'LOGIN', payload: json})
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='email'
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='password'
                />
                <button disabled={isLoading}>go</button>
                {error && <div>{error}</div>}
            </form>
        </div>
    )
}

export default AdminLogin