import React, {Fragment} from "react";

import HeaderCartButton from "./HeaderCartButton";

import imageMeals from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
	return (
		<Fragment>
			<header className={classes.header}>
				<h1>ReactMels</h1>
				<HeaderCartButton onClick={props.onClickShow} />
			</header>
			<div className={classes["main-image"]}>
				<img src={imageMeals} alt='A table full of delicious!' />
			</div>
		</Fragment>
	);
};

export default Header;
