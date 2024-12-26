
import { RouterProvider} from 'react-router-dom';
import {FC} from "react";
import router from "./router/router.tsx";

const App:FC = () => {
    return(
        <RouterProvider router={router} />
    )
};

export default App;

