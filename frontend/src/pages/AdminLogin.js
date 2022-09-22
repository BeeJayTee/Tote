import { useState } from 'react'

const AdminLogin = () => {
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(password)
        const response = await fetch('http://localhost:4141/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({password})
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>go</button>
            </form>
        </div>
    )
}

export default AdminLogin