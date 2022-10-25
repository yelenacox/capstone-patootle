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
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />
		


		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<AppViews />
					
				</>
			</Authorized>

		} />
	</Routes>
}