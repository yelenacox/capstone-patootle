import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { RegisterBaby } from "./components/auth/RegisterBaby"
import { NavBar } from "./components/nav/NavBar"
import { Profile } from "./components/profile/Profile"
import { AppViews } from "./components/views/AppViews"
import { Authorized } from "./components/views/Authorized"


export const App = () => {
	const [currentUser, setCurrentUser] = useState({})

	return <Routes>
		<Route path="/login" element={<Login login={setCurrentUser}/>} />
		<Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
		


		<Route path="*" element={
			<Authorized>
				<>
					<NavBar logout={setCurrentUser} />
					<AppViews currentUser={currentUser} setCurrentUser={setCurrentUser}/>
					
				</>
			</Authorized>

		} />
	</Routes>
}