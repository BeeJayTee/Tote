import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'

const MarketSelect = ({user, setMarketID}) => {
    const [sellerMarkets, setSellerMarkets] = useState([])
    const [markets, setMarkets] = useState([])
    const [addMarketID, setAddMarketID] = useState('')
    const [addMarketDisplayClass, setAddMarketDisplayClass] = useState('hidden')
    const [icon, setIcon] = useState(faPlus)
    const [addMarketError, setAddMarketError] = useState(null)

    const inputEl = useRef(null)

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

    const handleMarketClick = () => {
        setAddMarketError(null)
        setAddMarketID('')
        if (icon === faPlus) {
            setAddMarketDisplayClass('')
            setIcon(faXmark)
            setTimeout(() => {
                inputEl.current.focus()
            }, 0);
            return
        }
        setAddMarketDisplayClass('hidden')
        setIcon(faPlus)
    }

    const handleMarketSubmit = (e) => {
        e.preventDefault()
        const addUserMarket = async () => {
            const response = await fetch('http://localhost:4141/user/markets', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ marketID: addMarketID })
            })
            const json = await response.json()
            if (!response.ok) {
                setAddMarketError(json.error)
            }
            if (response.ok) {
                setAddMarketError(null)
                setSellerMarkets([ ...sellerMarkets, addMarketID ])
                setAddMarketID('')
            }
        }
        addUserMarket()
    }

    return (
        <div className='marketSelect'>
            <form className='select-market-form'>
                <label>
                    Select Market: 
                    <select
                    onChange={(e) => setMarketID(e.target.value)}
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
                    <span> add market</span>
                </div>
                <form className={addMarketDisplayClass} onSubmit={handleMarketSubmit}>
                        <input 
                        type="text"
                        value={addMarketID}
                        onChange={(e) => setAddMarketID(e.target.value)}
                        ref={inputEl}
                        />
                        <button>Add Market</button>
                        {addMarketError && <div className='error'>{addMarketError}</div>}
                    </form>
            </div>
        </div>
    );
}
 
export default MarketSelect;