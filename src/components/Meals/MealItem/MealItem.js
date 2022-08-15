import { useContext } from 'react';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const price = `$${props.meal.price.toFixed(2)}`;
    const addtoCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.meal.id,
            name: props.meal.name,
            price:props.meal.price,
            amount: amount
        });
    };
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.meal.name}</h3>
                <div className={classes.description}>{props.meal.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addtoCartHandler}/>
            </div>
        </li>
    );
};

export default MealItem;