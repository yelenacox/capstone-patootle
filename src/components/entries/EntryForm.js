import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const EntryForm = () => {
    const [entry, update] = useState({
        userBabyId: 0,
        entryType: "",
        description: "",
        dateTime: ""
    })

    const navigate = useNavigate()
    const saveButtonClick = (event) => {
        event.preventDefault()

        const productToSendToAPI = {
            name: product.name,
            price: product.price,
            productTypeId: product.productTypeId
        }
        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
        .then(res => res.json())
        .then(() => {
            navigate("/products")
        })
        
    }

    return (
        <form className="productForm">
            <h2 className="productForm__title">New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="product_name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of product"
                        value={product.name}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Product Price</label>
                    <input
                        required autoFocus
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="Price of product"
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.price = Number(evt.target.value)
                                update(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productType">Product Type</label>
                    <input 
                    required autoFocus
                    type="number"
                    min="1"
                    className="form-control"
                    placeholder="Type of product"
                    value={product.productTypeId}
                    onChange={
                        (evt) => {
                            const copy = { ...product }
                            copy.productTypeId = Number(evt.target.value)
                            update(copy)
                        }
                    }
                    />
                </div>
            </fieldset>
            <button 
            onClick = { (clickEvent) => saveButtonClick(clickEvent)}
            className="submitButton">
                Submit New Product
                </button>
        </form>
    )
}