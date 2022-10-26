import { useEffect, useState } from "react"
import { Entry } from "./Entry"

export const EntryList = () => {
    const [entries, setEntries] = useState([])
    const [userBabies, setUserBabies] = useState([])
    const [filteredEntries, setFiltered] = useState([])

    const currentUser = JSON.parse(localStorage.getItem("app_user"))

    useEffect(
        () => {
                fetch(`http://localhost:8088/entries?_expand=userBaby`)
                .then(response => response.json())
                .then((data) => {
                    setEntries(data)
                })
                fetch(`http://localhost:8088/userBabies?_expand=baby`)
                .then(response => response.json())
                .then((array) => {
                    setUserBabies(array)
                })

        },
        [])


        useEffect(
            () => {
                    const myEntries = entries.filter(entry => entry?.userBaby?.userId === currentUser.id)
                    setFiltered(myEntries)
                }
            ,
            [entries]
        )

        return <>
        <h2>Entries</h2>

        <article className="entries">
            {filteredEntries
                .map(
                    (entry) => <Entry
                    key={`entry--${entry.id}`}
                    entries={entries}
                    currentUser={currentUser}
                    entry={entry} 
                    />
                )
            }
        </article>
    </>
}