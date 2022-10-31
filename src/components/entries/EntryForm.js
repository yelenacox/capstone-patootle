import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./EntryForm.css"

export const EntryForm = () => {
    const [entry, update] = useState({
        userBabyId: 0,
        entryType: "",
        description: "",
        date: "",
    })
    const currentUser = JSON.parse(localStorage.getItem("app_user"))
    const [filteredBabies, setFiltered] = useState([])

    // const currentUser = JSON.parse(localStorage.getItem("app_user"))
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/userBabies/?userId=${currentUser.id}&_expand=baby`)
                .then(response => response.json())
                .then((data) => {
                    setFiltered(data)
                })
        }, []
    )


    const saveButtonClick = (event) => {
        event.preventDefault()

        const entryToSendToAPI = {
            userBabyId: entry.userBabyId,
            entryType: entry.entryType,
            description: entry.description,
            dateTime: entry.dateTime
        }
        return fetch(`http://localhost:8088/entries?_expand=userBaby/?userBabyId=1`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entryToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/entries")
            })

    }


    return <>
        <article className="entries">

            <section>
                <form className="entry_form">
                    <h2 className="entry_form_title">New Entry</h2>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="baby_name">Baby:</label>
                            {filteredBabies.map(
                                (userBaby) => {
                                    return <><input
                                        key={`entry--${userBaby.id}`}
                                        type="radio"
                                        value={userBaby?.babyId}
                                        name={userBaby?.baby?.name}
                                        required
                                        checked={entry.userBabyId === userBaby?.babyId}
                                        onChange={
                                            (e) => {
                                                update({ ...entry, userBabyId: parseInt(e.target.value) })
                                            }
                                        } />
                                        <label for={userBaby?.baby?.name}>{userBaby?.baby?.name}</label></>
                                })}
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="entry_type">Entry Type</label>
                            <select className="entry_type"
                                value={entry.entryType}
                                onChange={
                                    (evt) => {
                                        const copy = { ...entry }
                                        copy.entryType = evt.target.value
                                        update(copy)
                                    }}
                                    required
                            >
                                <option value="0">Select Entry Type</option>
                                <option value="Nap">Nap</option>
                                <option value="Diaper">Diaper</option>
                                <option value="Solid Food">Solid Food</option>
                                <option value="Liquids">Liquids</option>
                            </select>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                value={entry.description}
                                onChange={
                                    (evt) => {
                                        const copy = { ...entry }
                                        copy.description = evt.target.value
                                        update(copy)
                                    }
                                }
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="date_time">Date & Time</label>
                            <input
                                required autoFocus
                                type="datetime-local"
                                className="form-control"
                                value={entry.dateTime}
                                onChange={
                                    (evt) => {
                                        const copy = { ...entry }
                                        copy.dateTime = evt.target.value
                                        update(copy)
                                    }
                                }
                            />
                        </div>
                    </fieldset>
                    <button
                        onClick={(clickEvent) => saveButtonClick(clickEvent)}
                        className="submitButton">
                        Submit Entry
                    </button>
                </form>
            </section>
        </article></>
}