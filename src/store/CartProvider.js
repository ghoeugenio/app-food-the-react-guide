import React, {useReducer} from "react";

import CartContext from "./cart-context";

const CartProvider = (props) => {
	const defaultCartState = {
		items: [],
		totalAmount: 0,
	};

	const cartReducer = (state, action) => {
		if (action.type === "ADD") {
			const updateAmount =
				state.totalAmount + action.item.price * action.item.amount;

			const existingCartItemIndex = state.items.findIndex(
				(item) => item.id === action.item.id
			);
			const existingCartItem = state.items[existingCartItemIndex];
			let updatedItems;
			if (existingCartItem) {
				const updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount + action.item.amount,
				};
				updatedItems = [...state.items];
				updatedItems[existingCartItemIndex] = updatedItem;
			} else {
				updatedItems = state.items.concat(action.item);
			}
			return {
				items: updatedItems,
				totalAmount: updateAmount,
			};
		}
		if (action.type === "REMOVE") {
			const existingCartItemIndex = state.items.findIndex(
				(item) => item.id === action.id
			);
			const existingCartItem = state.items[existingCartItemIndex];
			const updateAmount = state.totalAmount - existingCartItem.price;
			let updatedItems;
			if (existingCartItem.amount === 1) {
				updatedItems = state.items.filter(
					(item) => item.id !== action.id
				);
			} else {
				const updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount - 1,
				};
				updatedItems = [...state.items];
				updatedItems[existingCartItemIndex] = updatedItem;
			}
			return {
				items: updatedItems,
				totalAmount: updateAmount,
			};
		}
		return defaultCartState;
	};

	const [cartState, dispatchCartSAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const handleAddItem = (item) => {
		dispatchCartSAction({type: "ADD", item: item});
	};

	const handleRemoveItem = (id) => {
		dispatchCartSAction({type: "REMOVE", id: id});
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: handleAddItem,
		removeItem: handleRemoveItem,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
