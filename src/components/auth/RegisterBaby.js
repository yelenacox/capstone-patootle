import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const RegisterBaby = () => {

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
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h2 className="h3 mb-3 font-weight-normal">Please Add New Baby</h2>
                <fieldset>
                    <label htmlFor="name"> Baby's Name </label>
                    <input onChange={addBabyProperties}
                        type="text" id="name" className="form-control"
                        placeholder="Enter baby's name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="picture"> Baby's picture </label>
                    <input onChange={addBabyProperties}
                        type="text" id="picture" className="form-control"
                        placeholder="Picture URL" />
                </fieldset>
                <fieldset>
                    <label htmlFor="birthday"> Birthday </label>
                    <input onChange={addBabyProperties}
                        type="date" id="birthday" className="form-control"
                        placeholder="Baby's birthday" required />
                </fieldset>
                <fieldset>
                    <button type="submit">Add New Baby</button>
                </fieldset>
            </form>
        </main>
    )
}