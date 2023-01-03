import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal'; 
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);
    console.log(cartCtx);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const cartItemAddHandler = (item) => {
        console.log(item);
        cartCtx.addItem({...item, amount: 1});
    };
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };
    const orderHandler = () => {
        setIsCheckout(true);
    };
    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://food-order-app-react-90beb-default-rtdb.firebaseio.com/orders.json', {
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderedItems:cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };
    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => (
                <CartItem key={item.id} 
                    name={item.name} 
                    amount={item.amount} 
                    price={item.price} 
                    onRemove={cartItemRemoveHandler.bind(null,item.id)} 
                    onAdd={cartItemAddHandler.bind(null,item)}/>
            ))}
        </ul>
    );
    const modalActions = <div className={classes.actions}>
        <button onClick={props.closeCart} className={classes['button--alt']}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
    const cartModalContent = <React.Fragment>{cartItems}
    <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
    </div>
    {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.closeCart}></Checkout>}
    {!isCheckout && modalActions}
    </React.Fragment>
    
    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent = <React.Fragment>
        <p>Successfully send the order!</p>
        <div className={classes.actions}>
        <button onClick={props.closeCart} className={classes['button']}>Close</button>
    </div>
    </React.Fragment>

    return (
        <Modal onClose={props.closeCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && !isSubmitting && didSubmitModalContent}
        </Modal>
    )
};

export default Cart;
