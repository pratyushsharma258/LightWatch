import Map from "@/components/Map";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Createicon from "@/components/icons/Createicon";
import Usericon from "@/components/icons/Usericon";
import Deleteicon from "@/components/icons/Deleteicon";
import Editicon from "@/components/icons/Editicon";

function userpage({ username }) {

    return (
        <div className="w-screen min-h-screen flex flex-col items-center overflow-y-auto relative">
            <Navbar username={username} />
            <Map position={[75.4123, 42.526]} zoom={4} className="max-w-screen max-h-screen absolute left-0 right-0 bottom-0 top-10 z-10" center={[75.4123, 42.526]} />
            <div className="z-20 absolute w-full bg-thistle-blue p-6 rounded-lg h-[13rem] bottom-0 grid grid-cols-2" style={{ boxShadow: "0px -4px 100px 8px black" }}>
                <Button className="m-1 text-lg bg-orange-peel text-deepblue shadow-orange-peel hover:text-orange-peel hover:shadow-deepblue shadow-md h-16 rounded-2xl gap-2"><Createicon />Add street light</Button>
                <Button className="m-1 text-lg bg-orange-peel hover:shadow-deepblue text-deepblue shadow-orange-peel hover:text-orange-peel shadow-md h-16 rounded-2xl gap-2"><Usericon />Grievance management</Button>
                <Button className="m-1 text-lg bg-orange-peel hover:shadow-deepblue text-deepblue shadow-orange-peel hover:text-orange-peel shadow-md h-16 rounded-2xl gap-2"><Editicon />Editing street lights</Button>
                <Button className="m-1 text-lg bg-orange-peel hover:shadow-deepblue text-deepblue shadow-orange-peel hover:text-orange-peel shadow-md h-16 rounded-2xl gap-2"><Deleteicon />Removing street lights</Button>
            </div>
        </div>
    );

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