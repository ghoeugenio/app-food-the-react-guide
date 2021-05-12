import React, {useContext} from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItem = cartCtx.items.length > 0;
	const itemsCart = cartCtx.items;
	const handleAddItem = (item) => {
		cartCtx.addItem({...item, amount: 1});
	};
	const handleRemoveItem = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{itemsCart.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onAdd={handleAddItem.bind(null, item)}
					onRemove={handleRemoveItem.bind(null, item.id)}
				/>
			))}
		</ul>
	);

	return (
		<Modal onClickHide={props.onClickHide}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button
					className={classes["button--alt"]}
					onClick={props.onClickHide}
				>
					Close
				</button>
				{hasItem && (
					<button className={classes.button}>Order</button>
				)}
			</div>
		</Modal>
	);
};

export default Cart;
