import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { EntryEdit } from "./EntryEdit"
import { EntryList } from "./EntryList"

export const Entry = ({ filteredBabyEntries, currentUser, entry, setEntries }) => {
    const navigate = useNavigate()
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
        <div className="entry_div">{entry.entryType}

            <button
                className="entry_button"
                onClick={() => navigate(`${entry.id}/edit`)}>
                Edit
            </button>
            <button
                className="entry_button"
                onClick={deleteButton}>
                Delete
            </button>


        </div>
        <div className="entry_div">{entry.dateTime}</div>
        <div className="entry_div">{entry.description}</div>

    </section>
}