import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { EntryEditSamePage } from "./EntryEditSamePage"
import editIcon from '../../images/editIcon.png'
import deleteIcon from '../../images/deleteIcon.png'
import bottle from '../../images/bottle.png'
import diaper from '../../images/diaper.png'
import nap from '../../images/nap.png'
import SolidFood from '../../images/SolidFood.png'

export const Entry = ({ filteredBabyEntries, currentUser, entry, setEntries, getAllEntries, selectedUserBaby }) => {
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
                .then(() => { return fetch(`http://localhost:8088/entries?_expand=userBaby&_sort=dateTime&_order=desc`) })
                .then(response => response.json())
                .then((newEntryData) => {
                    setEntries(newEntryData)
                })
        }
    }

    return <article key={entry.id} className="entry">



        <section className="entry-content">
            {editButton ? <EntryEditSamePage setEdit={setEdit} entryObj={entry} getAllEntries={getAllEntries} /> : (
                <>

                    <div className="entry_div">{entry.entryType}</div>
                    <div className="entry_div">{entry.dateTime}</div>
                    <div className="entry_div">{entry.description}</div>
                </>)}

            {currentUser.admin && editButton === false ? <>
                <img src={editIcon} alt="edit-icon"
                    className="entry_button" border="0"
                    onClick={() => setEdit(!editButton)
                    } />

                <img src={deleteIcon} alt="delete-icon" border="0" className="entry_button"
                    onClick={deleteButton} />



            </>
                : ""}
        </section>

        <section className="entry-type-pictures">
            {
                entry.entryType === "Nap" ? <img className="entry-type-picture" src={nap} />
                    :
                    entry.entryType === "Diaper" ? <img className="entry-type-picture" src={diaper} />
                        :
                        entry.entryType === "Liquids" ? <img className="entry-type-picture" src={bottle} />
                            :
                            entry.entryType === "Solid Food" ? <img className="entry-type-picture" src={SolidFood} /> : ""
            }
        </section>

    </article>
}