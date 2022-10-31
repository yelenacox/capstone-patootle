import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { EntryEdit } from "./EntryEdit"
import { EntryEditSamePage } from "./EntryEditSamePage"
import { EntryList } from "./EntryList"

export const Entry = ({ filteredBabyEntries, currentUser, entry, setEntries }) => {
    const navigate = useNavigate()
    const [editButton, setEdit] = useState(false)
    const [toggle, setToggle] = useState(false)

    useEffect(
        () => {},
        [editButton]
    )

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
                    // navigate(`${entry.id}/edit`)               
                
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




       {editButton ? <EntryEditSamePage entryObj={entry}/> :(<>
        <div className="entry_div">{entry.entryType}</div>
       <div className="entry_div">{entry.dateTime}</div>
        <div className="entry_div">{entry.description}</div>
        </>)}

    </section>
}