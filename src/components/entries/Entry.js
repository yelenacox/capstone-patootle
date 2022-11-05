import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { EntryEditSamePage } from "./EntryEditSamePage"

export const Entry = ({ filteredBabyEntries, currentUser, entry, setEntries, getAllEntries }) => {
    const [editButton, setEdit] = useState(false)
    const [toggle, setToggle] = useState(false)

    useEffect(
        () => {
            setToggle(!toggle)
        },
        [filteredBabyEntries])

    const deleteButton = (event) => {
        event.preventDefault()
        if (currentUser.admin) {
            return fetch(`http://localhost:8088/entries/${entry.id}`, {
                method: "DELETE"
            })
                .then(response => response.json())
                .then(() => { return fetch(`http://localhost:8088/entries?_expand=userBaby`) })
                .then(response => response.json())
                .then((newEntryData) => {
                    setEntries(newEntryData)
                })
        }
    }

    return <section key={entry.id} className="entry">
        { currentUser.admin && editButton === false ? <>
            <button
                className="entry_button"
                onClick={() => setEdit(!editButton)                
                }>
                    Edit
            </button>
            <button
                className="entry_button"
                onClick={deleteButton}>
                Delete
            </button>
            </> 
            : ""}




       {editButton ? <EntryEditSamePage setEdit={setEdit} entryObj={entry} getAllEntries={getAllEntries}/> :(
         <>         
        <div className="entry_div">{entry.entryType}</div>
       <div className="entry_div">{entry.dateTime}</div>
        <div className="entry_div">{entry.description}</div>
        </>)}

    </section>
}