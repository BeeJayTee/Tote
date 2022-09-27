import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'

const MarketSelect = ({user, setMarketID}) => {
    const [sellerMarkets, setSellerMarkets] = useState([])
    const [markets, setMarkets] = useState([])
    const [addMarketID, setAddMarketID] = useState('')
    const [addMarketDisplay, setAddMarketDisplay] = useState(true)
    const [icon, setIcon] = useState(faPlus)

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

    const handleMarketClick = () => {
        setAddMarketDisplay(false)
        setIcon(faXmark)
    }

    return (
        <div className='market-select'>
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
            <div className="add-new-market">
                <div className='add-market-icon-container' onClick={handleMarketClick}>
                    <FontAwesomeIcon icon={faShop} />
                    <FontAwesomeIcon icon={icon} />
                </div>
                <form hidden={addMarketDisplay}>
                        <input 
                        type="text"
                        value={addMarketID}
                        onChange={(e) => setAddMarketID(e.target.value)}
                        />
                        <button>Add Market</button>
                    </form>
            </div>
        </div>
    );
}
 
export default MarketSelect;