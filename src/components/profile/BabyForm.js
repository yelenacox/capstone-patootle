import { useEffect, useState } from "react"

export const BabyForm = ({setEdit, babyObj}) => {

    const [profile, updateProfile] = useState(babyObj)

    const [feedback, setFeedback] = useState("")

    const currentUser = JSON.parse(localStorage.getItem("app_user"))
  
    useEffect(() => {
        fetch(`http://localhost:8088/userBabies/?userId=${currentUser.id}&_expand=baby`)
            .then(response => response.json())
            .then((data) => {
                const babyObj = data
                updateProfile(babyObj)
            })
    }, [])
    
    useEffect(() => {
        if (feedback !== "") {

            setTimeout(() => setFeedback(""), 2000);
        }
    }, [feedback])

  
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/userBabies/?userId=${babyObj.id}&_expand=baby`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Baby profile successfully saved")
            })
    }

    return (
        <form className="profile">
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <h2 className="profile__title">Baby Profile</h2>
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
                    <label htmlFor="picture">Picture:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.picture}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.picture = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="birthday">Baby's Birthday:</label>
                    <input type="date"
                        className="form-control"
                        value={profile.birthday}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.birthday = evt.target.value
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