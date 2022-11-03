import { useEffect, useState } from "react"
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

const [userBabies, setUserBabies] = useState([])

useEffect(
	() => {
		fetch(`http://localhost:8088/userBabies`)
			.then(res => res.json())
			.then((data) => {
				setUserBabies(data)
			})
	}, []
)

	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />
		<Route path="/register_baby" element={<RegisterBaby />} />
		


		<Route path="*" element={
			<Authorized>
				<>
					<NavBar userBabies={userBabies} setUserBabies={setUserBabies}/>
					<AppViews userBabies={userBabies} setUserBabies={setUserBabies}/>
					
				</>
			</Authorized>

		} />
	</Routes>
}