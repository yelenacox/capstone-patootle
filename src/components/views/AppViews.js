import { Route, Routes } from "react-router-dom";
import { AddBaby } from "../profile/AddBaby";
import { EntryForm } from "../entries/EntryForm";
import { EntryList } from "../entries/EntryList";
import { Profile } from "../profile/Profile";

export const AppViews = ({userBabies, setUserBabies, selectedUserBaby, setSelectedUserBaby}) => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<EntryList selectedUserBaby={selectedUserBaby}/>} />
                <Route path="/add_baby" element={<AddBaby userBabies={userBabies} setUserBabies={setUserBabies} setSelectedUserBaby={setSelectedUserBaby}/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create" element={<EntryForm selectedUserBaby={selectedUserBaby} />} />
                <Route path="/entries" element={<EntryList selectedUserBaby={selectedUserBaby}/>} />

                      </Route>
        </Routes>
    )
}

