import { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import Cart from '../UI/Cart';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      // const response = await fetch('https://food-order-app-react-90beb-default-rtdb.firebaseio.com/meals.json');
      const response = await fetch('https://foodappnew-4e66a-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
      if(!response.ok) {
        throw new Error('Something went wrong');
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for(const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if(isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if(httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }


  const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} price={meal.price} description={meal.description} />);
  
  return (
      <section className={classes.meals}>
          <Cart>
              <ul>{mealsList}</ul>
          </Cart>
      </section>
  );
};

export default AvailableMeals;