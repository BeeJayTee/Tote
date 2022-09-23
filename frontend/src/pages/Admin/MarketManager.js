import { useState } from 'react'
import { useAddMarket } from '../../hooks/useAddMarket'
import { Country } from 'country-and-province'

const MarketManager = () => {
    const [adminName, setAdminName] = useState('')
    const [adminEmail, setAdminEmail] = useState('')
    const [marketName, setMarketName] = useState('')

    const [marketStreetAddress, setMarketStreetAddress] = useState('')
    const [marketStreetAddressSec, setMarketStreetAddressSec] = useState('')
    const [marketCity, setMarketCity] = useState('')
    const [marketStateProv, setMarketStateProv] = useState('')
    const [marketPostal, setMarketPostal] = useState('')
    const [marketCountry, setMarketCountry] = useState('')
    const [marketAddress, setMarketAddress] = useState({})

    const [mailingStreetAddress, setMailingStreetAddress] = useState('')
    const [mailingStreetAddressSec, setMailingStreetAddressSec] = useState('')
    const [mailingCity, setMailingCity] = useState('')
    const [mailingStateProv, setMailingStateProv] = useState('')
    const [mailingPostal, setMailingPostal] = useState('')
    const [mailingCountry, setMailingCountry] = useState('')
    const [mailingAddress, setMailingAddress] = useState({})

    const [phone, setPhone] = useState('')
    const [passwordError, setPasswordError] = useState(null)
    const [message, setMessage] = useState(null)

    const {addMarket, isLoading, error} = useAddMarket()

    const canada = new Country('CA')
    const usa = new Country('US')

    const handleSubmit = async (e) => {
        e.preventDefault()
        
    }
    
    const adminAdded = () => {
        setMessage('Market Added')
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const isStateProv = (country) => {
        console.log(canada)
        console.log(usa)
        return (
            <h1>{country}</h1>
        )
    }

// adminName, adminEmail, marketName, marketAddress, mailingAddress, phone
    return (
        <div>
            <h1>Market Manager</h1>
            <h3>Add New Market</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        placeholder="Market Director"
                    />
                    <input
                        type="text"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        placeholder="Market Director Email"
                    />
                    <input
                        type="text"
                        value={marketName}
                        onChange={(e) => setMarketName(e.target.value)}
                        placeholder="Market Name"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={marketStreetAddress}
                        onChange={(e) => setMarketAddress(e.target.value)}
                        placeholder="Market Street Address"
                    />
                    <input
                        type="text"
                        value={marketStreetAddressSec}
                        onChange={(e) => setMarketStreetAddressSec(e.target.value)}
                        placeholder="Market Street Adress Cont'd"
                    />
                    <select
                        onChange={(e) => setMarketCountry(e.target.value)}
                        value={marketCountry}
                    >
                        <option value="">Select The Country</option>
                        <option value="Canada">Canada</option>
                        <option value="United States">United States</option>
                    </select>
                    <input
                        type="text"
                        value={marketCity}
                        onChange={(e) => setMarketCity(e.target.value)}
                        placeholder="Market City"
                    />
                    {isStateProv(marketCountry)}
                </div>
                <button disabled={isLoading}>Add New Market</button>
                {error && <div className='error'>{error}</div>}
                {passwordError && <div className='error'>{passwordError}</div>}
                {message && <div>{message}</div>}
            </form>
        </div>
    );
}
 
export default MarketManager;