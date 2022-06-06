import '../styles/globals.css'
import Navbar from "../components/Navbar";
import {Toaster} from "react-hot-toast";
import {UserContext} from "../lib/context";
import 'bootstrap/dist/css/bootstrap.min.css';


function MyApp({Component, pageProps}) {
    return (
        <UserContext.Provider value={{user: {}, username: "anthony"}}>
            <Navbar/>
            <Component {...pageProps} />
            <Toaster/>
        </UserContext.Provider>
    )
}

export default MyApp
