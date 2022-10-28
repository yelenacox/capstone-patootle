import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EntryEdit = () => {
    const [entry, updateEntry] = useState({
        entryType: "",
        description: "",
        dateTime: ""
    })

    const { entryId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/entries/${entryId}`)
            .then(response => response.json())
            .then((data) => {
                updateEntry(data)
            })
    }, [entryId])

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
            .then((newEntryData) => {
                navigate("/entries")
            })
    }

    return <><article className="entries">
        <section>
            <form className="entry_form">
                <h2 className="entry_form_title">Edit Entry</h2>
                <fieldset>
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
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder={entry.description}
                            value={entry.description}
                            onChange={
                                (evt) => {
                                    const copy = { ...entry }
                                    copy.description = evt.target.value
                                    updateEntry(copy)
                                }
                            }
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="date_time">Date & Time</label>
                        <input
                            required autoFocus
                            type="datetime-local"
                            className="form-control"
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
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="button_edit">
                    Save Edits
                </button>
            </form>
        </section>
    </article></>

}