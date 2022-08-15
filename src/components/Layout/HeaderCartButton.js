import { useContext, useEffect, useState } from 'react';
import React from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    
    const numberOfCartItems = cartCtx.items.reduce((curNum, item) => {
        return curNum+item.amount;
    }, 0);
    
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
    
    useEffect(() => {
        setBtnIsHighlighted(true);
        const bumpTimer = setTimeout(() => {
            setBtnIsHighlighted(false)
        },300);
        return () => {clearTimeout(bumpTimer)};
    },[numberOfCartItems]);
    console.log(cartCtx.totalAmount);

    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;