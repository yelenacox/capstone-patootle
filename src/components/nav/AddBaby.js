import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./NavBar.css"

export const AddBaby = () => {

    const [baby, setBaby] = useState({
        name: "",
        picture: "",
        birthday: "",
    })

    const [userBaby, setUserBaby] = useState({
        userId: 0,
        babyId: 0
    })

    const currentUser = JSON.parse(localStorage.getItem("app_user"))

    let navigate = useNavigate()

    const babyToSendToAPI = {
        name: baby.name,
        picture: baby.picture,
        birthday: baby.birthday
    }

    const userBabyToSendToAPI = {
        userId: currentUser.id,
        babyId: userBaby.babyId,
    }


    const addNewBaby = () => {
        return fetch(`http://localhost:8088/babies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(babyToSendToAPI)
        })
            .then(res => res.json())
            .then((babyObj) => { userBabyToSendToAPI.babyId = babyObj.id })
            .then(() => {
                fetch(`http://localhost:8088/userBabies`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userBabyToSendToAPI)
                })
                    .then(res => res.json())
                    .then((data) => {
                        setUserBaby(data)
                    })
                    .then(() => {
                        navigate("/")
                    })
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return addNewBaby()

    }

    const addBabyProperties = (evt) => {
        const copy = { ...baby }
        copy[evt.target.id] = evt.target.value
        setBaby(copy)
    }

    return (
        <article className="babies_form">
            <section className="baby_section">
                <form className="baby_form" onSubmit={handleRegister}>
                    <h2 className="add_baby_title">Add New Baby</h2>
                    <fieldset>
                        <label htmlFor="name"> Baby's Name </label>
                        <input className="input_field" onChange={addBabyProperties}
                            type="text" id="name"
                            placeholder="Enter baby's name" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="picture"> Baby's picture </label>
                        <input className="input_field" onChange={addBabyProperties}
                            type="text" id="picture"
                            placeholder="Picture URL" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="birthday"> Birthday </label>
                        <input className="input_field" onChange={addBabyProperties}
                            type="date" id="birthday"
                            placeholder="Baby's birthday" required />
                    </fieldset>
                    <fieldset>
                        <button type="submit">Add New Baby</button>
                    </fieldset>
                </form>
            </section>
        </article>
    )
}