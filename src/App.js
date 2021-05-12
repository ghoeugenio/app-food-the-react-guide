import React, {useState} from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
	const [isShowCart, setIsShowCart] = useState(false);

	const handleShowCart = () => {
		setIsShowCart(true);
	};

	const handleHideCart = () => {
		setIsShowCart(false);
	};

	return (
		<CartProvider>
			{isShowCart && <Cart onClickHide={handleHideCart} />}
			<Header onClickShow={handleShowCart} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	);
}

export default App;
