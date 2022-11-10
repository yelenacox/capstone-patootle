import { useState } from "react"
import "./EntryForm.css"

export const EntryEditSamePage = ({ setEdit, entryObj, getAllEntries }) => {
    const [entry, updateEntry] = useState(entryObj)

    const handleSaveButtonClick = (clickEvent) => {
        clickEvent.preventDefault()
        return fetch(`http://localhost:8088/entries/${entryObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
            .then(response => response.json())
            .then((data) => {
                updateEntry(data);
                getAllEntries();
            })
            .then(setEdit(false))
    }


    return <>
        <article className="edit_entries">
            <section>
                <form className="edit_entry_form">
                    <div className="form-group">
                
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
                        onClick={handleSaveButtonClick}
                        className="button_edit">
                        Save Edits
                    </button>

                </form>
            </section>
        </article></>

}