import { Outlet, Route, Routes } from "react-router-dom";
import { AddBaby } from "../nav/AddBaby";
import { EntryEdit } from "../entries/EntryEdit";
import { EntryEditSamePage } from "../entries/EntryEditSamePage";
import { EntryForm } from "../entries/EntryForm";
import { EntryList } from "../entries/EntryList";
import { Profile } from "../profile/Profile";

export const AppViews = ({userBabies, setUserBabies, selectedUserBaby}) => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<EntryForm selectedUserBaby={selectedUserBaby}/>} />
                <Route path="/add_baby" element={<AddBaby userBabies={userBabies} setUserBabies={setUserBabies} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create" element={<EntryForm selectedUserBaby={selectedUserBaby} />} />
                <Route path="/entries" element={<EntryList selectedUserBaby={selectedUserBaby}/>} />
                {/* <Route path="entries/:entryId/edit" element={ <EntryEdit /> } /> */}

                      </Route>
        </Routes>
    )
}

