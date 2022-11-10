import { useEffect, useState } from "react"

export const NavSingleBaby = ({userBabies, setUserBabies, selectedUserBaby, setSelectedUserBaby}) => {

    const currentUser = JSON.parse(localStorage.getItem("app_user"))

    useEffect(
        () => {
          
            fetch(`http://localhost:8088/userBabies/?userId=${currentUser.id}&_expand=baby`)
                .then(response => response.json())
                .then((data) => {
                    setUserBabies(data)
                })
        
        }, []
    )

    return (
        <><div className="baby_choice">
            <li className="navbar__item active navbar__item__right">
                {userBabies[0]?.baby?.picture !== "" ?
                <img className="nav_baby_image" src={userBabies[0]?.baby?.picture} />
                :
                <img className="nav_baby_image" src="https://i.ibb.co/VQs2j8B/baby-icon.jpg" />
                }
            </li>
            <li className="navbar__item active navbar__item__right nav_baby_name">{userBabies[0]?.baby?.name}</li>
            </div>

        </>)
}