import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Entry } from "./Entry"
import { EntryEdit } from "./EntryEdit"

export const EntryList = ({selectedUserBaby}) => {
    const [entries, setEntries] = useState([])
    const [userBabies, setUserBabies] = useState([])
    // const [selectedUserBaby, setSelectedUserBaby] = useState([])
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
            fetch(`http://localhost:8088/entries?_expand=userBaby&_sort=dateTime&_order=desc`)
                .then(response => response.json())
                .then((data) => {
                    setEntries(data)
                })
            fetch(`http://localhost:8088/userBabies?_expand=baby`)
                .then(response => response.json())
                .then((array) => {
                    setUserBabies(array.filter((userBaby) => userBaby.userId === currentUser.id))
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
    useEffect(() => {
        setFilteredBabyEntries(filteredUserEntries.filter(entry => entry.userBabyId === selectedUserBaby))
    }, [selectedUserBaby, filteredUserEntries])
    // }




    return <>

        <h2>Entries</h2>
        {/* <label htmlFor="baby_name">Baby:</label> */}
        
        {/* {userBabies.map(
            (userBaby) => {
                    return <><input
                        key={`userBaby--${userBaby.id}`}
                        type="radio"
                        value={userBaby?.babyId}
                        name={userBaby?.baby?.name}
                        checked={selectedUserBaby === userBaby?.babyId}
                        onChange={
                            (e) => {
                                (parseInt(e.target.value))
                            }
                        } />
                        <label htmlFor={userBaby?.baby?.name}>{userBaby?.baby?.name}</label></>
                
            })} */}
        <article className="entries">
            {filteredBabyEntries
                .map(
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
        </article>
    </>
}
