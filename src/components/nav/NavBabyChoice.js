import { useEffect, useState } from "react"
import { NavMultipleBabies } from "./NavMultipleBabies"
import { NavSingleBaby } from "./NavSingleBaby"

export const NavBabyChoice = ({userBabies, setUserBabies}) => {

    const currentUser = JSON.parse(localStorage.getItem("app_user"))
    // const [babyChoices, setBabyChoices] = useState([{}])

    // useEffect(
    //     () => {
    //             fetch(`http://localhost:8088/userBabies/?userId=${currentUser.id}&_expand=baby`)
    //                 .then(response => response.json())
    //                 .then((data) => {
    //                     setBabyChoices(data)
    //                 })
    //     }, []
    // )

    return (
        <>
            {
                userBabies.length > 1 ?
                    <NavMultipleBabies userBabies={userBabies} setUserBabies={setUserBabies}/>
                    :
                    <NavSingleBaby />                 

            }
        </>)
}