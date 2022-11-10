import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Baby } from "./Baby"
import { BabyForm } from "./BabyForm"
import "./Profile.css"

export const BabyList = () => {
    const [userBabies, setBabies] = useState([])

    const currentUser = JSON.parse(localStorage.getItem("app_user"))

    useEffect(
        () => {
            fetch(`http://localhost:8088/userBabies/?userId=${currentUser.id}&_expand=baby`)
                .then(res => res.json())
                .then((babyArray) => {
                    setBabies(babyArray)
                })
        }, []
    )

        return <article className="babies">
    {
        userBabies.map(userBaby =>
            <Baby
            key={`userBaby--${userBaby.id}`}
            userBaby={userBaby}
            />
             )
    }
    </article>
    
}
