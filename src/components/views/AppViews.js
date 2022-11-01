import { Outlet, Route, Routes } from "react-router-dom";
import { AddBaby } from "../entries/AddBaby";
import { RegisterBaby } from "../auth/RegisterBaby";
import { EntryEdit } from "../entries/EntryEdit";
import { EntryEditSamePage } from "../entries/EntryEditSamePage";
import { EntryForm } from "../entries/EntryForm";
import { EntryList } from "../entries/EntryList";
import { Profile } from "../profile/Profile";

export const AppViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                 
                    <Outlet />
                </>
            }>
                <Route path="/add_baby" element={<AddBaby />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create" element={<EntryForm />} />
                <Route path="/entries" element={<EntryList />} />
                {/* <Route path="entries/:entryId/edit" element={ <EntryEdit /> } /> */}

                      </Route>
        </Routes>
    )
}

