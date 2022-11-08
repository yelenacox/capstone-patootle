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
	const [selectedUserBaby, setSelectedUserBaby] = useState(undefined)
	console.log("BABY!!!!: \n\t\t", selectedUserBaby)
	const currentUser = JSON.parse(localStorage.getItem("app_user"))

	useEffect(
		() => {
			fetch(`http://localhost:8088/userBabies`)
				.then(res => res.json())
				.then((data) => {
					setUserBabies(data)
				})
				if (!selectedUserBaby) {
					fetch(`http://localhost:8088/userBabies/?userId=${currentUser?.id}&_expand=baby`)
						.then(response => response.json())
						.then((array) => {
							setSelectedUserBaby(array[0].babyId)
						})
				}

		}, []
	)



	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />
		<Route path="/register_baby" element={<RegisterBaby />} />
		


		<Route path="*" element={
			<Authorized>
				<>
					<NavBar userBabies={userBabies} setUserBabies={setUserBabies} selectedUserBaby={selectedUserBaby} setSelectedUserBaby={setSelectedUserBaby}
					/>

					<AppViews userBabies={userBabies} setUserBabies={setUserBabies} selectedUserBaby={selectedUserBaby}
					/>

				</>
			</Authorized>

		} />
	</Routes>
}