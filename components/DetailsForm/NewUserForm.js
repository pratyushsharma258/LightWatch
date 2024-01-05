import { useState } from "react";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "../ui/button";
import axios from "axios";


function NewUserForm(props) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [userRole, setUserRole] = useState("");

    const submitHandler = async function (ev) {
        ev.preventDefault();

        const userFormData = { username, email, password, userRole }

        const response = await axios.post('/api/register', userFormData);

        if (response.data.found) {
            const { existenceModifier } = props;
            existenceModifier(true);
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler} className="" >
                <Input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                    required={true}
                    className="w-80 mb-4"
                />
                <Input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    required={true}
                    className="w-80 mb-4"
                />
                <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    required={true}
                    className="w-80 mb-4"
                />
                <Select
                    onValueChange={(e) => { setUserRole(e) }}
                    value={userRole}
                >
                    <SelectTrigger className="w-full mb-4">
                        <SelectValue placeholder="Select User Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="user">Normal User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
                <Button className="w-full" type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default NewUserForm
