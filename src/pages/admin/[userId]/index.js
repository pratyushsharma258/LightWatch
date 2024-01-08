import Map from "@/components/Map";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import axios from "axios";

function userpage({ username }) {

    return (
        <div className="w-screen min-h-screen flex flex-col items-center justify-center overflow-y-auto">
            <Navbar username={username} />
            <Map position={[75.4123, 42.526]} zoom={4} />
            <Button>Add street light</Button>
            <Button>Greviance management</Button>
            <Button>Editing street lights</Button>
            <Button>Removing street lights</Button>
        </div>
    )
}

export async function getServerSideProps(context) {

    // return {
    //     props: { title: "role", content: "true" }
    // }

    const { userId } = context.params;
    // console.log(userId);

    const actualId = userId;

    // return {
    //     props: { title: "role", content: "true" }
    // }

    const res = await axios.get('http://localhost:3000/api/fetchrole', {
        params: {
            userId: actualId, userRole: "admin"
        }
    })
    // console.log(res);
    const { username } = res.data;

    if (res.data.found === "true") {
        return {
            props: { content: "true", username }
        }
    } else {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

}

export default userpage