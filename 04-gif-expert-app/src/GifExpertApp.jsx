import { useState } from "react";

import AddCategory from "./components/AddCategory";

const GifExpertApp = () => {
    const [categories, setCategories] = useState(["One Punch"]);

    const onAddCategory = () => {
        setCategories([...categories, "Spider-Man"]);
    }

    return (
        <>
            <h1>GifExpertApp</h1>

            <AddCategory />

            <button onClick={ onAddCategory }>Agregar</button>

            <ol>
                { categories.map((category) => (
                    <li key={ category }>{ category }</li>
                )) }
            </ol>
        </>
    );
}
 
export default GifExpertApp;