import '../styles/globals.css'
import Navbar from "../components/Navbar";
import {Toaster} from "react-hot-toast";
import {UserContext} from "../lib/context";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useUserData} from "../lib/hooks";
import {Container} from "react-bootstrap";


function MyApp({Component, pageProps}) {
    const userData = useUserData()

    return (
        <UserContext.Provider value={userData}>
            <Navbar/>
            <Container className="mt-3 mb-3" style={{minHeight:'80vh'}}>
                <Component {...pageProps} />
            </Container>
            <Toaster/>
        </UserContext.Provider>
    )
}

export default MyApp
