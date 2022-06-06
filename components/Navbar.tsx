// @ts-ignore
import Link from 'next/link';
import {useContext, useState} from "react";
import {UserContext} from "../lib/context";
import {auth} from "../lib/firebase";
// @ts-ignore
import {useRouter} from "next/router";
import {Button, Container, Nav, NavDropdown, Navbar, Form, FormControl} from "react-bootstrap";

// Top navbar
export default function NavbarComponent() {
    const router = useRouter()
    const {user, username} = useContext(UserContext)
    const [search, setSearch] = useState("")

    const signOut = async () => {
        await auth.signOut()
        router.reload()
    }

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
                        {!username && (
                            <Button href="/enter">Log In</Button>
                        )}
                        {username && (
                            <>
                                <Nav.Link href="/posts">Posts</Nav.Link>
                                <Nav.Link href="/watchlist">Watchlist</Nav.Link>
                                <Nav.Link href="/admin">Profile</Nav.Link>
                                <Button onClick={signOut} variant="outline-light">Sign
                                    Out</Button>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
