import { useEffect, useState } from "react"
import { NavMultipleBabies } from "./NavMultipleBabies"
import { NavSingleBaby } from "./NavSingleBaby"

export const NavBabyChoice = ({userBabies, setUserBabies}) => {

    const currentUser = JSON.parse(localStorage.getItem("app_user"))

    return (
        <>
            {
                userBabies.length > 1 ?
                    <NavMultipleBabies userBabies={userBabies} setUserBabies={setUserBabies}/>
                    :
                    <NavSingleBaby userBabies={userBabies} setUserBabies={setUserBabies}/>                 

            }
        </>)
}