import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import NewUserForm from "./DetailsForm/NewUserForm";
import ExistingUserForm from "./DetailsForm/ExistingUserForm";
import { Button } from "./ui/button";


function userform(props) {
    const [userStatus, setUserStatus] = useState("register");

    const toggleUserStatus = () => {
        if (userStatus === 'register')
            setUserStatus('login')
        else
            setUserStatus('register')
    }

    return (
        <div className="inline-block shadow-2xl text-lg">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to LightWatch</CardTitle><br />
                    <CardDescription>Enter your details below</CardDescription>
                </CardHeader>
                <CardContent>
                    <NewUserForm userStatus={userStatus} existenceModifier={props.userExistenceModifier} existence={props.userExistence} />
                </CardContent>
                <CardFooter>
                    <p>Already a user?
                        <label
                            className="m-1 hover:cursor-pointer hover:text-green-700"
                            onClick={() => { toggleUserStatus() }}>
                            {userStatus === "register" ? "SignIn" : "SignUp"}
                        </label>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}


export default userform
