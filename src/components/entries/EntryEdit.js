import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EntryEdit = () => {
    const [entry, updateEntry] = useState({
        entryType: "",
        description: "",
        dateTime: ""
    })
    
    const { entryId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8088/entries/${entryId}`)
            .then(response => response.json())
            .then((data) => {
                updateEntry(data)
            })
    }, [entryId])

    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/entries/${entry.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
            .then(response => response.json())
            .then(() => {
                // navigate(`/customers/${customer.id}`)
            })
    }

    // return <form className="entry_edit">
    //     <header className="customer__header">{customer?.user?.name}</header>
    //     <div>Email: {customer?.user?.email}</div>
    //     <fieldset>
    //         <div className="form-group">
    //             <label htmlFor="loyalty_number">Loyalty Number:</label>
    //             <textarea
    //                 required autoFocus
    //                     type="number"
    //                     className="form-control"
    //                 value={customer.loyaltyNumber}
    //                 onChange={
    //                     (evt) => {
    //                         const copy = { ...customer }
    //                         copy.loyaltyNumber = parseInt(evt.target.value)
    //                         updateCustomer(copy)
    //                         // TODO: Update state with a mod ified copy
    //                     }
    //                 }>{customer.loyaltyNumber}</textarea>
    //         </div>
    //     </fieldset>
    //     <button
    //         onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
    //         className="button_edit">
    //         Save Edits
    //     </button>
    // </form>

}