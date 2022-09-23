import { useState } from "react";

export const useAddMarket = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const addMarket = async (adminName, adminEmail, marketName, marketAddress, mailingAddress, phone) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4141/markets/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({adminName, adminEmail, marketName, marketAddress, mailingAddress, phone})
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        return json
    }

    return { addMarket, isLoading, error }
}