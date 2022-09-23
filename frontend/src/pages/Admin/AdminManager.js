import { useState } from 'react'
import { useAdminSignup } from '../../hooks/useAdminSignup'

const AdminManager = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')
    const [passwordError, setPasswordError] = useState(null)
    const [message, setMessage] = useState(null)

    const {adminSignup, isLoading, error} = useAdminSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password === retypePassword) {
            const data = await adminSignup(email, password)
            if (data.email) {
                setPasswordError(null)
                setEmail('')
                setPassword('')
                setRetypePassword('')
                adminAdded()
            }
        } else {
            setPasswordError('passwords do not match')
            setPassword('')
            setRetypePassword('')
        }
    }
    
    const adminAdded = () => {
        setMessage('Admin Added')
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    return (
        <div>
            <h1>Admin Manager</h1>
            <h3>Add New Admin</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='password'
                />
                <input
                    type="password"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    placeholder='retype password'
                />
                <button disabled={isLoading}>Add New Admin</button>
                {error && <div className='error'>{error}</div>}
                {passwordError && <div className='error'>{passwordError}</div>}
                {message && <div>{message}</div>}
            </form>
        </div>
    );
}
 
export default AdminManager;