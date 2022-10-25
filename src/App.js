import { Route, Routes } from "react-router-dom"
// import { Authorized } from "./views/Authorized"
// import { ApplicationViews } from "./views/ApplicationViews"
// import { NavBar } from "./nav/NavBar"

import "./App.css"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"


export const App = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		{/* <Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
				</>
			</Authorized>

		} /> */}
	</Routes>
}