import React, {useContext, useState, useEffect} from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
	const cartCtx = useContext(CartContext);

	const [isAnimated, setIsAnimated] = useState(false);

	const {items} = cartCtx;

	const numberOfCartItems = items.reduce((accumulator, currentItem) => {
		return accumulator + currentItem.amount;
	}, 0);

	const buttonClasses = `${classes.button} ${
		isAnimated ? classes.bump : ""
	}`;

	useEffect(() => {
		if (items.length === 0) return;
		setIsAnimated(true);
		const timer = setTimeout(() => {
			setIsAnimated(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={buttonClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon></CartIcon>
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
