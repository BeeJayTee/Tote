import { useState, useEffect } from 'react'

import { useAuthContext } from '../../hooks/useAuthContext'

const MarketSelect = ({marketID, setMarketID}) => {
    const [markets, setMarkets] = useState('')
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchMarkets = async () => {
            const response = await fetch('http://localhost:4141/markets', {
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            const json = await response.json()
            setMarkets(json)
        }
        fetchMarkets()
        
    }, [user.token])

    return (
        <div className="MarketSelect">
            <form>
                <select
                    value={marketID}
                    onChange={(e) => setMarketID(e.target.value)}
                >
                    <option value="">Select A Market</option>
                    {markets && markets.map((market, index) => (
                        <option key={index} value={market.marketID}>{market.marketName}</option>
                    ))}
                </select>
            </form>
        </div>
    );
}
 
export default MarketSelect;