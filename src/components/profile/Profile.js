import { BabyForm } from "./BabyForm"
import { BabyList } from "./BabyList"
import { UserForm } from "./UserForm"

export const Profile = ({currentUser, setCurrentUser}) => {

       return <>
       
       <UserForm currentUser={currentUser} setCurrentUser={setCurrentUser}/> 
       <BabyList />

       </>
    }


