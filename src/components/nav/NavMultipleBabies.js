import { useEffect, useState } from "react"

export const NavMultipleBabies = ({ userBabies, setUserBabies, selectedUserBaby, setSelectedUserBaby }) => {

    const currentUser = JSON.parse(localStorage.getItem("app_user"))
    const [selectedBabyPicture, setSelectedBabyPicture] = useState('')
    useEffect(
        () => {
            fetch(`http://localhost:8088/userBabies/?userId=${currentUser.id}&_expand=baby`)
                .then(response => response.json())
                .then((data) => {
                    setUserBabies(data)
                })
                setBabyImage()
        }, []
    )
    useEffect(() => {
        setBabyImage()
        
    }, [selectedUserBaby])
    const setBabyImage = () =>{
        const selectedBaby = userBabies.filter((userBaby) => userBaby?.baby?.id === parseInt(selectedUserBaby))[0]
        setSelectedBabyPicture(selectedBaby ? selectedBaby?.baby?.picture : ''
        )
    }

    return (
        <>
            <article className="selected_baby">
                <section className="dropdown-selections">
                    <div className="selected-baby-container">
                        <img className="nav_baby_image_multiple" src={selectedBabyPicture} />
                    </div>
                    <div className="select-group navbar__item__right">
                        <label htmlFor="baby_choice" className="baby_choice_title">Select Baby </label>
                        <select className="baby_choice"
                            value={selectedUserBaby}
                            required
                            onChange={
                                (e) => {
                                    setSelectedUserBaby(e.target.value)
                                }}
                        >
                            {
                                userBabies.map((userBaby) => {
                                    return <>
                                        <option key={`userBaby--${userBaby.id}`}
                                            className="baby_option" value={userBaby.id} defaultValue={selectedUserBaby === userBaby.id}>
                                            {userBaby?.baby?.name}
                                        </option>
                                    </>
                                })
                            }
                        </select>
                    </div>
                </section>
            </article>
        </>)
}