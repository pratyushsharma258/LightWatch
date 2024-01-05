import UserForm from "@/components/UserForm"
import { useState } from "react"

function index() {
    const [isNewUser, setIsNewUser] = useState(false);
    console.log(isNewUser);
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <UserForm userExistence={isNewUser} userExistenceModifier={setIsNewUser} />
        </div>
    )
}

export default index
