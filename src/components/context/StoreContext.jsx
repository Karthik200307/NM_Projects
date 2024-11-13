import { createContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [userName, setUserName] = useState("");

    const [food_list, setFoodList] = useState([
        { _id: '1', name: 'Delicious asparagus', description: 'A juicy orange egg.', price: 5.99, image:(assets.food_1), category: 'All', rating: 4.5 },
        { _id: '2', name: 'Spaghetti Bolognese', description: 'Classic Italian pasta.', price: 7.49, image:(assets.food_2), category: 'All', rating: 4.7 },
        { _id: '3', name: 'Glossy Rose patel ', description: 'Tender delicious rose.', price: 6.99, image:(assets.food_3), category: 'All', rating: 4.8 },
        { _id: '4', name: 'Veggie ', description: 'Loaded with fresh veggies.', price: 8.99, image: (assets.food_4), category: 'All', rating: 4.6 },
        { _id: '5', name: 'Chicken Tacos', description: 'Spicy chicken tacos.', price: 4.99, image:(assets.food_5), category: 'All', rating: 4.4 },
        { _id: '6', name: 'Chicken Steak', description: 'Grilled Chicken steak.', price: 12.49, image:(assets.food_6), category: 'All', rating: 4.9 },
        { _id: '7', name: 'Caesar Salad Roll', description: 'Healthy Caesar salad.', price: 5.49, image:(assets.food_7), category: 'All', rating: 4.3 },
        { _id: '8', name: 'Shrimp Pasta buffs', description: 'Pasta with fresh shrimp.', price: 10.99, image:(assets.food_8), category: 'All', rating: 4.7 },
        { _id: '9', name: 'Creamy ice cream', description: 'Flavorful Creamy ice cream.', price: 6.49, image:(assets.food_9), category: 'All', rating: 4.2 },
        { _id: '10', name: 'Sushi Platter', description: 'Assorted sushi.', price: 14.99, image:(assets.food_10), category: 'All', rating: 4.8 },
        { _id: '11', name: 'Pancakes', description: 'Fluffy pancakes.', price: 3.99, image:(assets.food_11), category: 'All', rating: 4.1 },
        { _id: '12', name: 'Sprinkle cream', description: 'color Sprinkle cream.', price: 7.99, image:(assets.food_12), category: 'All', rating: 4.5 },
        { _id: '13', name: 'Chicken Burrito', description: 'Stuffed Chicken burrito.', price: 6.49, image:(assets.food_13), category: 'All', rating: 4.6 },
        { _id: '14', name: 'Margherita bunch', description: 'Classic margherita.', price: 9.99, image: (assets.food_14), category: 'All', rating: 4.8 },
        { _id: '15', name: 'Fish Tacos bread', description: 'Crispy fish tacos.', price: 5.99, image: (assets.food_15), category: 'All', rating: 4.3 },
        { _id: '16', name: 'Chicken Chops', description: 'Grilled  chops.', price: 15.99, image:(assets.food_16), category: 'All', rating: 4.9 },
        { _id: '17', name: 'Cream cake', description: 'Healthy Cream cake .', price: 5.99, image: (assets.food_17), category: 'All', rating: 4.2 },
        { _id: '18', name: 'Strawberry Cake', description: 'Delicious straeberry Cake.', price: 13.99, image: (assets.food_18), category: 'All', rating: 4.7 },
        { _id: '19', name: 'Blackberry Cake ', description: 'Creamy risotto.', price: 11.49, image:(assets.food_19), category: 'All', rating: 4.6 },
        { _id: '20', name: 'pineapple Creamy Cake ', description: 'Rich pine Creamy Cake.', price: 9.49, image: (assets.food_20), category: 'All', rating: 4.8 },
        { _id: '21', name: 'Pad Thai', description: 'Classic Thai noodles.', price: 8.99, image: (assets.food_21), category: 'All', rating: 4.5 },
        { _id: '22', name: 'Veg-Cheese mix', description: 'Cheesy veg mix.', price: 6.49, image: (assets.food_22), category: 'All', rating: 4.4 },
        { _id: '23', name: 'Falafel Wrap', description: 'Falafel with veggies.', price: 5.99, image:(assets.food_23), category: 'All', rating: 4.3 },
        { _id: '17', name: 'Vegetable Stir Fry', description: 'Healthy stir-fry.', price: 5.99, image: (assets.food_24), category: 'All', rating: 4.2 },
    ]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${url}/api/user/login`, { email, password });
            setToken(response.data.token);
            setUserName(response.data.name);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userName", response.data.name);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "An error occurred during login");
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post(`${url}/api/user/register`, { name, email, password });
            setToken(response.data.token);
            setUserName(response.data.name);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userName", response.data.name);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "An error occurred during registration");
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                setUserName(localStorage.getItem("userName"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        userName,
        setUserName,
        login,
        register
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;