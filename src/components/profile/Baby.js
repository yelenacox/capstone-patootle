import { useState } from "react"
import { BabyForm } from "./BabyForm"

export const Baby = ({ userBaby }) => {

    const [editButton, setEdit] = useState(false)

    return <>
        <section key={`userBaby--${userBaby.id}`} className="baby">
            {editButton ? <BabyForm setEdit={setEdit} userBabyObj={userBaby}/> : (<>

                {userBaby?.baby?.picture !== "" ?
                    <img className="baby_image" src={userBaby?.baby?.picture} />
                    : <img className="baby_image" src="https://i.ibb.co/VQs2j8B/baby-icon.jpg" />}
                <div>{userBaby?.baby?.name}</div>
                <div>{userBaby?.baby?.birthday}</div>
                <button
                    className="edit_button"
                    onClick={() => setEdit(!editButton)
                    }>
                    Edit Baby Profile</button>
            </>)
            }
        </section>
    </>

}