import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const EntryForm = () => {
    const [entry, update] = useState({
        userBabyId: 0,
        entryType: "",
        description: "",
        dateTime: ""
    })

    const [filteredBabies, setFiltered] = useState([])

    const currentUser = JSON.parse(localStorage.getItem("app_user"))
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
                navigate("/all")
            })

    }


    return <>

        {filteredBabies.map(
            (userBaby) => {
                <section key={userBaby.id}>
                    <form className="entry_form">
                        <h2 className="entry_form_title">New Entry</h2>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="baby_name">Baby:</label>
                                <input
                                    type="radio"
                                    className="form-control"
                                    value={userBaby?.baby?.name}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...filteredBabies }
                                            copy.name = evt.target.value
                                            update(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="entry_type">Entry Type</label>
                                <select classname="entry_type"
                                    value={entry.entryType}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...filteredBabies }
                                            copy.entryType = evt.target.value
                                            update(copy)
                                        }}
                                >
                                    <option value="0">Select Baby</option>
                                    <option value="1">Nap</option>
                                    <option value="2">Diaper</option>
                                    <option value="3">Solid Food</option>
                                    <option value="4">Liquids</option>
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
                                            const copy = { ...filteredBabies }
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
                                            const copy = { ...filteredBabies }
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
                    </form></section>
            }


        )
        }</>
}