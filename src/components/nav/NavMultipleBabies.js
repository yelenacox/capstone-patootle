import { useEffect, useState } from "react"

export const NavMultipleBabies = ({userBabies, setUserBabies, selectedUserBaby, setSelectedUserBaby}) => {

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
        <>
            <article className="selected_baby">
                <section>
                    <div className="select-group navbar__item__right">
                        <label htmlFor="baby_choice" className="baby_choice_title">Select Baby </label>
                        <select className="baby_choice"
                            value={userBabies.babyId}
                            required
                            onChange={
                                (e) => {
                                    setSelectedUserBaby(e.target.value)
                                }} 
                                >
                            {
                                userBabies.map((userBaby) => {
                                    return <>
                                    <option key={`userBaby--${userBaby.id}`}className="baby_option" value={userBaby.id} selected={selectedUserBaby===userBaby.id}>
                                        {userBaby?.baby?.name}</option>
                                    </>
                                })
                            }
                        </select>
                    </div>
                </section>
            </article>
        </>)
}