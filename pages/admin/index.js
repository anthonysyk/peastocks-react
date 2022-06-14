import {useContext} from "react";
import {UserContext} from "../../lib/context";
import {Card, Image} from "react-bootstrap";
import AuthCheck from "../../components/AuthCheck";

export default function Index() {
    const {user, username} = useContext(UserContext);

    return (user &&
        <>
            <AuthCheck>
                <Card className="text-center">
                    <Card.Header>Information</Card.Header>
                    <Card.Body >
                        <Card.Title>{user.displayName}</Card.Title>
                        <Image roundedCircle src={user.photoURL}/>
                        <Card.Text>
                            Username: {username}<br/>
                            Description: {}<br/>
                            Investor Type: {}<br/>
                            Strategy: {}<br/>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </AuthCheck>
        </>
    )
}