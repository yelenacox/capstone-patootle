import { useEffect, useState } from "react"
import { Entry } from "./Entry"

export const EntryList = () => {
    const [entries, setEntries] = useState([])
    const [userBabies, setUserBabies] = useState([])
    const [selectedUserBaby, setSelectedUserBaby] = useState([])
    const [filteredUserEntries, setFilteredUserEntries] = useState([])
    const [filteredBabyEntries, setFilteredBabyEntries] = useState([])

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
                    setUserBabies(array.filter((userBaby)=>userBaby.userId===currentUser.id))
                    // setSelectedUserBaby(array[0].babyId)
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
    useEffect(()=>{
        setFilteredBabyEntries(filteredUserEntries.filter(entry => entry.userBabyId === selectedUserBaby))
    },[selectedUserBaby, filteredUserEntries])
    // }

    return <>
        <h2>Entries</h2>
        <label htmlFor="baby_name">Baby:</label>
        {userBabies.map(
            (userBaby) => {
                return <><input
                    type="radio"
                    value={userBaby?.babyId}
                    name={userBaby?.baby?.name}
                    checked={selectedUserBaby === userBaby?.babyId}
                    onChange={
                        (e) => {
                            setSelectedUserBaby(parseInt(e.target.value))
                        }
                    } />
                    <label for={userBaby?.baby?.name}>{userBaby?.baby?.name}</label></>
            })}
        <article className="entries">
            {filteredBabyEntries
                .map(
                    (entry) => <Entry
                        key={`entry--${entry.id}`}
                        filteredBabyEntries={filteredBabyEntries}
                        setFilteredBabyEntries={setFilteredBabyEntries}
                        currentUser={currentUser}
                        entry={entry}
                        setEntries={setEntries}
                        setUserBabies={setUserBabies}
                        setSelectedUserBaby={setSelectedUserBaby}
                        setFilteredUserEntries={setFilteredUserEntries}
                        selectedUserBaby={selectedUserBaby}
                    />
                )
            }
        </article>
    </>
}