import { Outlet, Route, Routes } from "react-router-dom";
import { RegisterBaby } from "../auth/RegisterBaby";
import { EntryEdit } from "../entries/EntryEdit";
import { EntryForm } from "../entries/EntryForm";
import { EntryList } from "../entries/EntryList";
import { Profile } from "../profile/Profile";

export const AppViews = ({currentUser, setCurrentUser}) => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                 
                    <Outlet />
                </>
            }>
                <Route path="/add_baby" element={<RegisterBaby currentUser={currentUser} />} />
                <Route path="/profile" element={<Profile currentUser={currentUser}setCurrentUser={setCurrentUser}/>} />
                <Route path="/create" element={<EntryForm />} />
                <Route path="/entries" element={<EntryList />} />
                <Route path="entries/:entryId/edit" element={ <EntryEdit /> } />

                      </Route>
        </Routes>
    )
}

