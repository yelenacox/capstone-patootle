import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserForm } from "./UserForm"

export const User = () => {
    const [users, setUsers] = useState([])
    const [editButton, setEdit] = useState(false)

    const currentUser = JSON.parse(localStorage.getItem("app_user"))
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/?id=${currentUser.id}`)
                .then(res => res.json())
                .then((data) => {
                    setUsers(data)
                })
        }, []
    )

    const getUser = () => {
        fetch(`http://localhost:8088/users/?id=${currentUser.id}`)
            .then(res => res.json())
            .then((data) => {
                setUsers(data)
            })
    }

    return <article className="babies">
        {
            users.map(user =>
                <article key={`user--${user.id}`} className="user_profile">
                    <section className="user">

                        {
                            editButton ? <UserForm userObj={user} setEdit={setEdit} getUser={getUser} /> : <>
                                <h2 className="profile__title">User Profile</h2>
                                <div>{user.name}</div>
                                <div>{user.email}</div>
                                <div>{user.relationship}</div>

                                {editButton === false ? <>
                                    <button
                                        className="user_button"
                                        onClick={() => setEdit(!editButton)
                                        }>
                                        Edit Profile</button>
                                    <button
                                        className="user_button"
                                        onClick={() => { navigate("/add_baby") }}
                                    >Add Baby</button>
                                </> : ""
                                }
                            </>
                        }

                    </section>
                </article>
            )
        }
    </article>

}
