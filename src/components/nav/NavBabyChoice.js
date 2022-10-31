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
                babyChoices.length > 1 ?
                    babyChoices.map((userBaby) => {

                        return (<>
                            <article 
                            key={`userBaby--${userBaby.id}`
                            } className="selected_baby">
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
                    :

                    <>

                        <li className="navbar__item active navbar__item__right">
                            <img className="nav_baby_image" src={babyChoices[0]?.baby?.picture} />
                        </li>
                        <li className="navbar__item active navbar__item__right nav_baby_name">{babyChoices[0]?.baby?.name}</li>

                    </>

            }
        </>)
}