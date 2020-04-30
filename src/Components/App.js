import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Add from "../Routes/Add";
import Edit from "../Routes/Edit";
import Note from "../Routes/Note";
import Notes from "../Routes/Notes";

function App() {
	return (
		<Router>
			<Route exact path={"/"} component={Notes}></Route>
			<Route path={"/note/:id"} component={Note}></Route>
			<Route path={"/add"} component={Add}></Route>
			<Route path={"/edit/:id"} component={Edit}></Route>
		</Router>
	);
}

export default App;
