import { Card } from 'antd';
import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useAuth } from '../Login/context';

const Logout = () => {

    const auth = useAuth();

    const logout = () => {
        auth.logout()
    }

    return (
        <div className="d-flex flex-lg-row flex-column justify-content-center">
            <Card className="border border-3 mt-5 d-flex flex-lg-row flex-column justify-content-center" cover={<img className="img-fluid" alt="shopConsumer" style={{ height: "25em", width: "25em" }} src={"https://media.istockphoto.com/id/1056810716/vector/young-man-and-woman-at-shopping.jpg?s=612x612&w=0&k=20&c=U1x0SIE_a5e-jgoLNCTULf0WnZRAGi8guf8V0ywEqcw="} />}>
                <Image style={{ height: "50px" }} src='https://i.pinimg.com/564x/3b/b4/6e/3bb46e3801c053c39b5e7a4bf3768cd4.jpg' />
                <h1>Are you sure to go out?</h1>
                <Button className="btn btn-danger text-white w-75 mb-2 p-2" onClick={logout}>Exit</Button>
                <h2>Come back soon <br /> to visit us</h2>
            </Card>
        </div>

    );
}

export { Logout };