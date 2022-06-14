// @ts-ignore
import Link from 'next/link';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../lib/context";
import {auth, googleAuthProvider} from "../lib/firebase";
import {useRouter} from "next/router";
import {Button, Container, Nav, NavDropdown, Navbar, Form, FormControl, Image} from "react-bootstrap";

// Top navbar
export default function NavbarComponent() {
    const router = useRouter()
    const {user, username} = useContext(UserContext)
    const [search, setSearch] = useState("")

    const signOut = async () => {
        await auth.signOut()
        router.reload()
    }

    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
        router.reload()
        if (!username) {
            await router.push("/enter")
        } else {
            await router.push("/")
        }
    };

    const redirectToTickerPage = () => {
        router.push(`/stocks/${search.toUpperCase()}`)
    }

    const onKeyPressSearchInput = (ev) => {
        if (ev.key === "Enter") {
            ev.preventDefault()
            redirectToTickerPage()
        }
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Peastocks</Navbar.Brand>
                    <Nav className="me-auto">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(event) => {
                                    setSearch(event.target.value)
                                }}
                                onKeyPress={onKeyPressSearchInput}
                            />
                            <Button variant="outline-success" onClick={redirectToTickerPage}>Search</Button>
                        </Form>
                    </Nav>
                    <Nav>
                        {!user && (
                            <Button variant="light" onClick={signInWithGoogle} className="ml-5">
                                <img src={'/google.png'} width="30px"/> Sign in with Google
                            </Button>
                        )}
                        {username && (
                            <>
                                <Nav.Link href="/posts">Posts</Nav.Link>
                                <Nav.Link href="/watchlist">Watchlist</Nav.Link>
                                <Nav.Link href="/admin"><Image roundedCircle src={user.photoURL} width={30} height={30}/></Nav.Link>
                                <Button onClick={signOut} variant="outline-light" style={{marginLeft:"1rem"}}>Sign Out</Button>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
