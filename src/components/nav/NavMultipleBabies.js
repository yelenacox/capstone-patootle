import { useEffect, useState } from "react"

export const NavBabyChoice = () => {

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
            {
                    babyChoices.map((userBaby) => {

                        return (<>
                            <article className="selected_baby">
                                <section>
                                    <div className="form-group">
                                        <label htmlFor="baby_choise">Baby</label>
                                        <select className="baby_choice"
                                            value={userBaby?.babyId}
                                            required
                                            onChange={
                                                (evt) => {
                                                    setBabyChoices({
                                                        ...babyChoices, userBabyId:
                                                            parseInt(evt.target.value)
                                                    })
                                                }} >
                                            <option value="0">{userBaby?.baby?.name}</option>
                                        </select>
                                    </div>
                                </section>
                            </article>
                        </>)
                    })
                   

            }
        </>)
}