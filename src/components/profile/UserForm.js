import { useEffect, useState } from "react"

export const UserForm = () => {
    const [profile, updateProfile] = useState({
        name: "",
        email: "",
        relationship: ""
    })
    
    const currentUser = JSON.parse(localStorage.getItem("app_user"))
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        fetch(`http://localhost:8088/users/${currentUser.id}`)
            .then(response => response.json())
            .then((user) => {
                const userObj = user
                updateProfile(userObj)
            })
    }, [])

    useEffect(() => {
        if (feedback !== "") {

            setTimeout(() => setFeedback(""), 2000);
        }
    }, [feedback])

  
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/users/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("User profile successfully saved")
            })
    }

    return (
        <form className="profile">
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <h2 className="profile__title">User Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.name}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.name = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email"
                        className="form-control"
                        value={profile.email}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.email = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="relationship">Relationship:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.relationship}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.relationship = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Update Profile
            </button>
        </form>
    )
}