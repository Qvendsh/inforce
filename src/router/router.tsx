import {createBrowserRouter} from "react-router-dom";
import ProductList from "../components/ProductList.tsx";
import ProductView from "../components/ProductView.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProductList/>,
    },
    {
        path: "/product/:id",
        element: <ProductView/>,
    },
]);

export default router