import { useState, useEffect } from 'react'

const MarketSelect = ({user, setMarketID}) => {
    const [sellerMarkets, setSellerMarkets] = useState([])
    const [markets, setMarkets] = useState([])

    useEffect(() => {
        const fetchSellerMarkets = async () => {
            const response = await fetch('http://localhost:4141/user/markets', {
                headers: { 'Authorization': `Bearer ${user.token}`  }
            })
            const json = await response.json()
            setSellerMarkets(json.markets)
        }
        const fetchAllMarkets = async () => {
            const response = await fetch('http://localhost:4141/markets/', {
                headers: { 'Authorization': `Bearer ${user.token}`  }
            })
            const json = await response.json()
            setMarkets(json)
            setMarketID(json[0].marketID)
        }
        fetchSellerMarkets()
        fetchAllMarkets()
    }, [user.token, setMarketID])
    
    const handleChange = (e) => {
        setMarketID(e.target.value)
    }

    return (
        <form className='select-market-form'>
            <label>
                Select Market: 
                <select
                onChange={handleChange}
                >
                    {markets.map((market, index) => {
                        if (sellerMarkets.includes(market.marketID)) {
                            return <option key={index} value={market.marketID}>{market.marketName}</option>
                        } else return ''
                    })}
                </select>
            </label>
        </form>
    );
}
 
export default MarketSelect;