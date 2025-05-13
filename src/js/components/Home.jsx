import React from "react";
import Todo from "./Todo"

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="body">
			<div className="text-center">
				<Todo />
			</div>
		</div>
	);
};

export default Home;