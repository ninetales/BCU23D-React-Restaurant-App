import { createRestaurant } from '../Blockchain-Service';
const initRestaurant = async () => {
    const restaurantId = sessionStorage.getItem('restaurantId')
    if (!restaurantId) {
        const generatedId = await createRestaurant('Big Byte');
        sessionStorage.setItem('restaurantId', generatedId);
    } else {
        console.log('there is a restaurant!', restaurantId);
    }
}

document.addEventListener('DOMContentLoaded', initRestaurant);

export const getRestaurantId = () => {
    const restaurantId = sessionStorage.getItem('restaurantId');
    if (restaurantId) {
        return Number(restaurantId);
    } else {
        return null;
    }
}