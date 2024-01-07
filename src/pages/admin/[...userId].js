import axios from "axios";
import { useRouter } from "next/router"

function userpage({ username }) {
    const router = useRouter();
    // console.log(props);
    return (
        <div>
            Admin user page for user {username}
        </div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: { role: "admin", username: "joginder" }
    }
    const { userId } = context.params;

    const res = await axios.get('http://localhost:3000/api/fetchrole', {
        params: {
            userId: userId[0], userRole: "admin"
        }
    })

    if (res.data.found === "true") {
        return {
            props: { title: "role", content: "true" }
        }
    } else {
        return {
            redirect: {
                destination: "/",
                permanent: true,
            },
        };
    }

}

export default userpage