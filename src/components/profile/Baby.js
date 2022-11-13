import { useState } from "react"
import { BabyForm } from "./BabyForm"
import babyIcon from '../../images/babyIcon.jpg'

export const Baby = ({ userBaby }) => {

    const [editButton, setEdit] = useState(false)

    return <>
     <section key={`userBaby--${userBaby.id}`} className="baby">
        {
            editButton ? <BabyForm userBabyObj={userBaby} setEdit={setEdit} /> : <>
             {userBaby?.baby?.picture !== "" ?
                    <img className="baby_image" src={userBaby?.baby?.picture} />
                    : 
                    <img className="baby_image" src={babyIcon} />}
                <div>{userBaby?.baby?.name}</div>
                <div>{userBaby?.baby?.birthday}</div>
               
                { editButton === false ? <>
                <button
                    className="edit_button"
                    onClick={() => setEdit(!editButton)
                    }>
                    Edit Baby Profile</button>
            </> : ""
            }
            </>
        }
               
        </section>
    </>

}