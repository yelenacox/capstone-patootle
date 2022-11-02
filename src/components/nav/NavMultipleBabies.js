import { useEffect, useState } from "react"

export const NavMultipleBabies = () => {

    const currentUser = JSON.parse(localStorage.getItem("app_user"))
    const [userBabies, setUserBabies] = useState([{}])
    const [chosenBaby, setChosenBaby] = useState({})




    useEffect(
        () => {
            fetch(`http://localhost:8088/userBabies/?userId=${currentUser.id}&_expand=baby`)
                .then(response => response.json())
                .then((data) => {
                    setUserBabies(data)
                })
        }, []
    )

    // useEffect(() => { }, [userBabies, chosenBaby])


    return (
        <>
            <article className="selected_baby">
                <section>
                    <div className="select-group navbar__item__right">
                        <label htmlFor="baby_choice">Baby </label>
                        <select className="baby_choice"
                            value={userBabies.babyId}
                            required
                            // onChange={
                            //     (evt) => {
                            //         const copy = { ...userBabies }
                            //         copy.userBabyId = parseInt(evt.target.value)
                            //         setChosenBaby(copy)
                            //     }} 
                                >
                            {
                                userBabies.map((userBaby) => {
                                    return <>
                                    <option key={`userBaby--${userBaby.id}`}className="baby_option" value="0">
                                        {/* <img className="baby_image" src={userBaby?.baby?.picture}/>  */}
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