import Map from "@/components/Map";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/router"

function userpage({ username }) {
    const router = useRouter();

    return (
        <div className="w-screen min-h-screen flex items-center justify-center">
            <Navbar username={username} />
            <Map position={[75.4123, 42.526]} zoom={4} />
        </div>
    )
}

export async function getServerSideProps(context) {

    // return {
    //     props: { title: "role", content: "true" }
    // }

    const { userId } = context.params;

    const actualId = userId[0];

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