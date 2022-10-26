import { Outlet, Route, Routes } from "react-router-dom";
import { RegisterBaby } from "../auth/RegisterBaby";
import { EntryForm } from "../entries/EntryForm";
import { EntryList } from "../entries/EntryList";
import { Profile } from "../profile/Profile";

export const AppViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Patootle</h1>
                    <Outlet />
                </>
            }>
                <Route path="/add_baby" element={<RegisterBaby />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create" element={<EntryForm />} />
                <Route path="/entries" element={<EntryList/>} />

                      </Route>
        </Routes>
    )
}

