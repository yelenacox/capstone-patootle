import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BabyForm } from "./BabyForm"
import "./Profile.css"

export const BabyList = () => {
    const [userBabies, setBabies] = useState([])
    const [buttonClick, setButton] = useState(false)

    const navigate = useNavigate()

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
        userBabies.map(userBaby =>{
            
            return <section key={`userBaby--${userBaby.id}`} className="baby">
                <img class="baby_image" src={userBaby?.baby?.picture}/>
                <div>{userBaby?.baby?.name}</div>
                <div>{userBaby?.baby?.birthday}</div>
                <button
                onClick={() => <BabyForm />}
                className="button_edit"
                >Edit Baby Profile</button>
            </section> })
    }
    </article>
    
}
