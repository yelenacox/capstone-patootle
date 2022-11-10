import { useEffect, useState } from "react"
import { Entry } from "./Entry"

export const EntryList = ({ selectedUserBaby }) => {
    const [entries, setEntries] = useState([])
    const [userBabies, setUserBabies] = useState([])
    const [filteredUserEntries, setFilteredUserEntries] = useState([])
    const [filteredBabyEntries, setFilteredBabyEntries] = useState([])


    const currentUser = JSON.parse(localStorage.getItem("app_user"))

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

    const filteredEntries = () => {
        let entries;
        if (userBabies.length > 1) {
            entries = filteredUserEntries.filter(entry => entry.userBabyId === parseInt(selectedUserBaby))
        }
        else { entries = filteredUserEntries }
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


    return <>

        <h2>Entries</h2>
    
        <article className="entries">
            {filteredEntries()
            }
        </article>
    </>
}
