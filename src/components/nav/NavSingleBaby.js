import { useEffect, useState } from "react"

export const NavSingleBaby = () => {

    const currentUser = JSON.parse(localStorage.getItem("app_user"))
    const [babyChoices, setBabyChoices] = useState([{}])

    useEffect(
        () => {
            // if (currentUser.id) 
            // {
            fetch(`http://localhost:8088/userBabies/?userId=${currentUser.id}&_expand=baby`)
                .then(response => response.json())
                .then((data) => {
                    setBabyChoices(data)
                })
            // }
        }, []
    )

    return (
        <><div className="baby_choice">
            <li className="navbar__item active navbar__item__right">
                <img className="nav_baby_image" src={babyChoices[0]?.baby?.picture} />
            </li>
            <li className="navbar__item active navbar__item__right nav_baby_name">{babyChoices[0]?.baby?.name}</li>
            </div>

        </>)
}