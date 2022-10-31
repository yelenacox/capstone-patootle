import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./EntryForm.css"

export const EntryEditSamePage = ({entryObj}) => {
    const [entry, updateEntry] = useState({
        entryType: "",
        description: "",
        dateTime: ""
    })

    const [saveButton, setSave] = useState(false)

    useEffect(
        () => {},
        [saveButton]
    )


    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/entries/${entryObj.id}`)
            .then(response => response.json())
            .then((data) => {
                updateEntry(data)
            })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/entries/${entryObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
            .then(response => response.json())
            .then((data) => {updateEntry(data)})
            .then(() => {
                navigate("/entries")
            })
    }

    return <><article className="edit_entries">
        <section>
            <form className="edit_entry_form">
                
                    <div className="form-group">
                        <label htmlFor="entry_type">Entry Type</label>
                        <select className="entry_type"
                            value={entry.entryType}
                            onChange={
                                (evt) => {
                                    const copy = { ...entry }
                                    copy.entryType = evt.target.value
                                    updateEntry(copy)
                                }}
                        >
                            <option value="0">Select Entry Type</option>
                            <option value="Nap">Nap</option>
                            <option value="Diaper">Diaper</option>
                            <option value="Solid Food">Solid Food</option>
                            <option value="Liquids">Liquids</option>
                        </select>
                    </div>
                
                    <div className="form-group">
                        <label htmlFor="date_time">Date & Time</label>
                        <input
                            required autoFocus
                            type="datetime-local"
                            className="form-control input_date_time"
                            value={entry.dateTime}
                            onChange={
                                (evt) => {
                                    const copy = { ...entry }
                                    copy.dateTime = evt.target.value
                                    updateEntry(copy)
                                }
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            required autoFocus
                            type="text"
                            className="form-control input_field"
                            placeholder={entry.description}
                            value={entry.description}
                            onChange={
                                (evt) => {
                                    const copy = { ...entry }
                                    copy.description = evt.target.value
                                    updateEntry(copy)
                                }
                            }
                        >{entry.description}</textarea>
                    </div>                
                <button
                    onClick={(clickEvent) => handleSaveButtonClick (clickEvent)}
                    className="button_edit">
                    Save Edits
                </button>
            </form>
        </section>
    </article></>

}