import { useState } from 'react'
import { useAddMarket } from '../../hooks/useAddMarket'
import { Countries } from 'country-and-province'
import '../styles/market-manager.css'

const MarketManager = () => {
    const [adminName, setAdminName] = useState('')
    const [adminEmail, setAdminEmail] = useState('')
    const [marketName, setMarketName] = useState('')

    const [marketStreetAddress, setMarketStreetAddress] = useState('')
    const [marketStreetAddressSec, setMarketStreetAddressSec] = useState('')
    const [marketCity, setMarketCity] = useState('')
    const [marketProv, setMarketProv] = useState('')
    const [marketDisplayProv, setMarketDisplayProv] = useState([])
    const [marketPostal, setMarketPostal] = useState('')
    const [marketCountry, setMarketCountry] = useState('')
    const [marketProvDisabled, setMarketProvDisabled] = useState(true)

    const [mailingHidden, setMailingHidden] = useState('')
    const [mailingStreetAddress, setMailingStreetAddress] = useState('')
    const [mailingStreetAddressSec, setMailingStreetAddressSec] = useState('')
    const [mailingCity, setMailingCity] = useState('')
    const [mailingProv, setMailingProv] = useState('')
    const [mailingDisplayProv, setMailingDisplayProv] = useState([])
    const [mailingPostal, setMailingPostal] = useState('')
    const [mailingCountry, setMailingCountry] = useState('')
    const [mailingProvDisabled, setMailingProvDisabled] = useState(true)

    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState(null)

    const {addMarket, isLoading, error} = useAddMarket()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const marketAddressObj = {
            street: marketStreetAddress,
            streetSec: marketStreetAddressSec,
            city: marketCity,
            province: marketProv,
            country: marketCountry,
            postalCode: marketPostal
        }
        if (mailingHidden.length > 0) {
            const data = await addMarket(adminName, adminEmail, marketName, marketAddressObj, marketAddressObj, phone)
            if (data.adminName) {
                marketAdded()
            }
        } else {
            const mailingAddressObj = {
                street: marketStreetAddress,
                streetSec: marketStreetAddressSec,
                city: marketCity,
                province: marketProv,
                country: marketCountry,
                postalCode: marketPostal
            }
            const data = await addMarket(adminName, adminEmail, marketName, marketAddressObj, mailingAddressObj, phone)
            if (data.adminName) {
                marketAdded()
            }
        }
    }
    
    const marketAdded = () => {
        setMessage('Market Added')
        setTimeout(() => {
            setMessage(null)
        }, 5000)
        setAdminName('')
        setAdminEmail('')
        setMarketName('')
        setPhone('')

        setMarketProv('')
        setMarketCity('')
        setMarketCountry('')
        setMarketDisplayProv([])
        setMarketStreetAddress('')
        setMarketStreetAddressSec('')
        setMarketPostal('')

        setMailingProv('')
        setMailingCity('')
        setMailingCountry('')
        setMailingDisplayProv([])
        setMailingStreetAddress('')
        setMailingStreetAddressSec('')
        setMailingPostal('')
    }

    const handleMarketCountryChange = (e) => {
        setMarketCountry(e.target.value)
        if (!e.target.value.length) {
            setMarketProvDisabled(true)
            setMarketDisplayProv([])
            return
        }
        setMarketProvDisabled(false)
        const provObjs = Countries.byName(e.target.value).provinces.data
        const arr = []
        for (let i=0; i<provObjs.length; i++) {
            arr.push(provObjs[i].name)
        }
        const finalArr = arr.map((prov, index) => (
            <option key={index} value={prov}>{prov}</option>
        ))
        setMarketDisplayProv(finalArr)
    }

    const handleMailingCountryChange = (e) => {
        setMailingCountry(e.target.value)
        if (!e.target.value.length) {
            setMailingProvDisabled(true)
            setMailingDisplayProv([])
            return
        }
        setMailingProvDisabled(false)
        const provObjs = Countries.byName(e.target.value).provinces.data
        const arr = []
        for (let i=0; i<provObjs.length; i++) {
            arr.push(provObjs[i].name)
        }
        const finalArr = arr.map((prov, index) => (
            <option key={index} value={prov}>{prov}</option>
        ))
        setMailingDisplayProv(finalArr)
    }

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setMailingHidden('hidden')
        } else if (!e.target.checked) {
            setMailingHidden('')
        }
    }

    return (
        <div>
            <h1>Market Manager</h1>
            <h3>Add New Market</h3>
            <form onSubmit={handleSubmit} className="add-market-form">
                <div className="form-container">
                    <div>
                        <legend>Contact Info</legend>
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
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone Number"
                        />
                    </div>

                    <div>
                        <legend>Market Address</legend>
                        <input
                            type="text"
                            value={marketStreetAddress}
                            onChange={(e) => setMarketStreetAddress(e.target.value)}
                            placeholder="Market Street Address"
                        />
                        <input
                            type="text"
                            value={marketStreetAddressSec}
                            onChange={(e) => setMarketStreetAddressSec(e.target.value)}
                            placeholder="Market Street Adress Cont'd"
                        />
                        <select
                            onChange={handleMarketCountryChange}
                            value={marketCountry}
                        >
                            <option value="">Select The Country</option>
                            <option value="canada">Canada</option>
                            <option value="united states">United States</option>
                        </select>
                        <input
                            type="text"
                            value={marketCity}
                            onChange={(e) => setMarketCity(e.target.value)}
                            placeholder="Market City"
                        />
                        <select
                            disabled={marketProvDisabled}
                            onChange={(e) => setMarketProv(e.target.value)}
                            value={marketProv}
                        >
                            <option value="">Select State / Province</option>
                            {marketDisplayProv}
                        </select>
                        <input
                            type="text"
                            value={marketPostal}
                            onChange={(e) => setMarketPostal(e.target.value)}
                            placeholder="Market Postal Code"
                        />
                        <div id='same-address-container'>
                            <input
                                type="checkbox"
                                name='same-address'
                                id='same-address'
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor='same-address'>Mailing addess is same as market address?</label>
                        </div>
                    </div>

                    <div className={mailingHidden}>
                        <legend>Mailing Address</legend>
                        <input
                            type="text"
                            value={mailingStreetAddress}
                            onChange={(e) => setMailingStreetAddress(e.target.value)}
                            placeholder="Mailing Street Address"
                        />
                        <input
                            type="text"
                            value={mailingStreetAddressSec}
                            onChange={(e) => setMailingStreetAddressSec(e.target.value)}
                            placeholder="Mailing Street Adress Cont'd"
                        />
                        <select
                            onChange={handleMailingCountryChange}
                            value={mailingCountry}
                        >
                            <option value="">Select The Country</option>
                            <option value="canada">Canada</option>
                            <option value="united states">United States</option>
                        </select>
                        <input
                            type="text"
                            value={mailingCity}
                            onChange={(e) => setMailingCity(e.target.value)}
                            placeholder="Mailing City"
                        />
                        <select
                            disabled={mailingProvDisabled}
                            onChange={(e) => setMailingProv(e.target.value)}
                            value={mailingProv}
                        >
                            <option value="">Select State / Province</option>
                            {mailingDisplayProv}
                        </select>
                        <input
                            type="text"
                            value={mailingPostal}
                            onChange={(e) => setMailingPostal(e.target.value)}
                            placeholder="Mailing Postal Code"
                        />
                    </div>
                </div>

                <button disabled={isLoading}>Add New Market</button>
                {error && <div className='error'>{error}</div>}
                {message && <div>{message}</div>}
            </form>
        </div>
    );
}
 
export default MarketManager;