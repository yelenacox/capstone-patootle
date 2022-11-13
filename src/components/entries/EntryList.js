import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Entry } from "./Entry"
import { EntryFilter } from "./EntryFilter"

export const EntryList = ({ selectedUserBaby }) => {
    const [entries, setEntries] = useState([])
    const [userBabies, setUserBabies] = useState([])
    const [filteredUserEntries, setFilteredUserEntries] = useState([])
    const [filteredBabyEntries, setFilteredBabyEntries] = useState([])
    const [typeChoice, setTypeChoice] = useState('0')


    const currentUser = JSON.parse(localStorage.getItem("app_user"))
    const navigate = useNavigate()
    const getAllEntries = () => {
        fetch(`http://localhost:8088/entries?_expand=userBaby&_sort=dateTime&_order=desc`)
            .then(response => response.json())
            .then((entryArray) => {
                setEntries(entryArray)
            })
    }

    useEffect(
        () => {
            getAllEntries();
            fetch(`http://localhost:8088/userBabies?_expand=baby`)
                .then(response => response.json())
                .then((array) => {
                    setUserBabies(array.filter((userBaby) => userBaby.userId === currentUser.id))
                })

        },
        [])

    useEffect(
        () => {
            const myEntries = entries.filter(entry => entry?.userBaby?.userId === currentUser.id)
            setFilteredUserEntries(myEntries)
        }
        ,
        [entries]
    )
    useEffect(()=>{filteredEntries()},[selectedUserBaby])

    const filteredEntries = () => {
        let entries = filteredUserEntries;
        if (userBabies.length > 1) {
            entries = entries.filter(entry => entry.userBabyId === parseInt(selectedUserBaby))
        }
        if(typeChoice!=='0'){
            entries = entries.filter(entry => entry.entryType === typeChoice)

        }
        return entries.map(
            (entry) => <Entry
                key={`entry--${entry.id}`}
                filteredBabyEntries={filteredBabyEntries}
                currentUser={currentUser}
                entry={entry}
                setEntries={setEntries}
                getAllEntries={getAllEntries}
                selectedUserBaby={selectedUserBaby}
            />
        )
    }
    const displayEntries = filteredEntries()
    return <>

        <h2>Entries</h2>
        <article className="entries">
            <div className="entry_filter">
               <EntryFilter setTypeChoice={setTypeChoice}/>
            </div>
            {displayEntries.length > 0 ? displayEntries : <div>No entries yet? Write a <Link className="new_entry_link" to="/create">new entry</Link>!</div>
            }

        </article>
    </>
}
