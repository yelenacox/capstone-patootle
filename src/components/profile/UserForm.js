import { useEffect, useState } from "react"

export const UserForm = ({setEdit, getUser}) => {
    const [profile, updateProfile] = useState({
        name: "",
        email: "",
        relationship: ""
    })
    
    const currentUser = JSON.parse(localStorage.getItem("app_user"))

    useEffect(() => {
        fetch(`http://localhost:8088/users/${currentUser.id}`)
            .then(response => response.json())
            .then((data) => {
                updateProfile(data)
            })
    }, [])

  
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

            .then((data) => {
                updateProfile(data)
                getUser()
                })
            .then(() => {
                setEdit(false)
                
            })
    }

    return (
        <form className="profile">
            <h2 className="profile__title">User Profile</h2>
                <div className="form-group">
                    <input
                        required autoFocus
                        type="text"
                        className="form-control-profile"
                        value={profile.name}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.name = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
         
                <div className="form-group">
                    <input type="email"
                        className="form-control-profile"
                        value={profile.email}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.email = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
         
                <div className="form-group">
                    <input type="text"
                        className="form-control-profile"
                        value={profile.relationship}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.relationship = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
         
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Update Profile
            </button> 
        </form>
    )
}