import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { EntryList } from "./EntryList"

export const Entry = ({ filteredBabyEntries, setFilteredBabyEntries, currentUser, entry, setEntries, setUserBabies, setSelectedUserBaby, setFilteredUserEntries, selectedUserBaby }) => {
    const navigate = useNavigate()
    const [editButton, setEdit] = useState(false)
    const [toggle, setToggle] = useState(false)
    useEffect(() => { setToggle(!toggle) },
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
                    // const whateverTheFuck = newEntryData.filter(entry => entry?.userBaby?.userId === currentUser.id)
                    // return whateverTheFuck
                })
                // .then((filteredEntryData) => { return filteredEntryData.filter(entry => entry.userBabyId === selectedUserBaby) })
                // .then((superFilteredData) => { setFilteredBabyEntries(superFilteredData) })
        }

    }

    return <section key={entry.id} className="entry">
        <div className="entry_div">{entry.entryType}

            <button
                className="entry_button">Edit</button>
            <button onClick={deleteButton}>Delete</button>


        </div>
        <div className="entry_div">{entry.dateTime}</div>
        <div className="entry_div">{entry.description}</div>

    </section>
}