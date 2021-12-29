import { useContext } from "react";

import { CategoryContext } from "../context/categories";

const useCategories = () => {
    return useContext(CategoryContext);
}

export default useCategories;