import { useEffect, useState } from "react"

export const BabyForm = ({userBabyObj, setEdit}) => {

    const [profile, updateProfile] = useState(userBabyObj)

    const currentUser = JSON.parse(localStorage.getItem("app_user"))
  
    // useEffect(() => {
    //     fetch(`http://localhost:8088/userBabies/?userId=${currentUser.id}&_expand=baby`)
    //         .then(response => response.json())
    //         .then((data) => {
    //             updateProfile(data)
    //         })
    // }, [])

  
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/babies/${userBabyObj.babyId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile.baby)
        })
            .then(response => response.json())
            .then((data) => {
                updateProfile(data)
            })
            .then(setEdit(false))
          
    }

    return (
        <form className="profile">
             <fieldset>
                <div className="form-group">
                    <label htmlFor="picture">Picture:</label>
                    <input type="text"
                        className="form-control"
                        // placeholder={profile?.baby?.picture}
                        value={profile?.baby?.picture}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.baby.picture = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        // placeholder={profile?.baby?.name}
                        value={profile?.baby?.name}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.baby.name = evt.target.value
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
                        // placeholder={profile?.baby?.birthday}
                        value={profile?.baby?.birthday}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.baby.birthday = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(event) => handleSaveButtonClick(event)}
                className="btn btn-primary">
                Update Profile
            </button>
        </form>
    )
}