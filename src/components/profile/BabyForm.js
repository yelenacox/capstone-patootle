import { useEffect, useState } from "react"

export const BabyForm = ({ setEdit, userBabyObj }) => {

    const [profile, updateProfile] = useState(userBabyObj)

    const handleSaveButtonClick = (clickEvent) => {
        clickEvent.preventDefault()

        return fetch(`http://localhost:8088/userBabies/${userBabyObj.id}?_expand=baby`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then((data) => {
                updateProfile(data);
            })
            .then(setEdit(false))
    }

    return (
        <form className="profile">
            <div className="form-group">
                <label htmlFor="picture">Picture:</label>
                <input type="text"
                    className="form-control"
                    placeholder={profile?.baby?.picture}
                    value={profile?.baby?.picture}
                    onChange={
                        (evt) => {
                            const copy = { ...profile }
                            copy.picture = evt.target.value
                            updateProfile(copy)
                        }
                    } />
            </div>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder={profile?.baby?.name}
                    value={profile?.baby?.name}
                    onChange={
                        (evt) => {
                            const copy = { ...profile }
                            copy.name = evt.target.value
                            updateProfile(copy)
                        }
                    } />
            </div>
            <div className="form-group">
                <label htmlFor="birthday">Baby's Birthday:</label>
                <input type="date"
                    className="form-control"
                    // placeholder={profile?.baby?.birthday}
                    value={profile?.baby?.birthday}
                    onChange={
                        (evt) => {
                            const copy = { ...profile }
                            copy.birthday = evt.target.value
                            updateProfile(copy)
                        }
                    } />
            </div>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    )
}