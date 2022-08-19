

const ProducerProduct = ({products}) => {
    return (
        <div className="producer-products">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Minimum</th>
                    <th>&nbsp;</th>
                </tr>
                {products.map(product => (
                    <tr>
                        <td>{product.name}</td>
                        <td>{product.type}</td>
                        <td>{product.amount} {product.unit}</td>
                        <td>{product.minPurchase}</td>
                        <td>edit | delete</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default ProducerProduct