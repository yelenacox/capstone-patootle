import { Route, Routes } from "react-router-dom"
import "./App.css"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { RegisterBaby } from "./components/auth/RegisterBaby"
import { NavBar } from "./components/nav/NavBar"
import { Authorized } from "./components/views/Authorized"
// import { ApplicationViews } from "./views/ApplicationViews"


export const App = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />
		<Route path="/add_baby" element={<RegisterBaby />} />


		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					{/* <ApplicationViews /> */}
				</>
			</Authorized>

		} />
	</Routes>
}