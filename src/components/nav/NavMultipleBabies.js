import { useEffect, useState } from "react"

export const NavMultipleBabies = () => {

    const currentUser = JSON.parse(localStorage.getItem("app_user"))
    const [babyChoices, setBabyChoices] = useState([{}])

    useEffect(
        () => {
            fetch(`http://localhost:8088/userBabies/?userId=${currentUser.id}&_expand=baby`)
                .then(response => response.json())
                .then((data) => {
                    setBabyChoices(data)
                })
        }, []
    )

    return (
        <>
            <article className="selected_baby">
                <section>
                    <div className="select-group">
                        <label htmlFor="baby_choice">Baby</label>
                        <select className="baby_choice"
                            value={babyChoices?.babyId}
                            required
                            onChange={
                                (evt) => {
                                    const copy = { ...babyChoices }
                                    copy.userBabyId = parseInt(evt.target.value)
                                    setBabyChoices(copy)
                                }} >
                            {
                                babyChoices.map((userBaby) => {
                                    return <>
                                    <option className="baby_option" value="0"><img className="baby_image" src={userBaby?.baby?.picture}/> {userBaby?.baby?.name}</option>
                                    </>
                                })
                            }
                        </select>
                    </div>
                </section>
            </article>
        </>)
}