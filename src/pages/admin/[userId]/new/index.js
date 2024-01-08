import Navbar from "@/components/Navbar";
import axios from "axios";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/router";
import Map from "@/components/Map";

function index({ username }) {
    const router = useRouter();
    const { lat, long } = router.query;

    const [ratedWattage, setRatedWattage] = useState();
    const [criticalWattage, setCriticalWattage] = useState();
    const [expectedLife, setExpectedLife] = useState();
    const [description, setDescription] = useState();

    const submitHandler = async function (ev) {
        ev.preventDefault();
    }

    return (
        <div className="w-screen min-h-screen flex flex-row items-center bg-deepblue justify-center">
            <Navbar username={username} />
            <div className="flex flex-row items-center gap-40">
                <div className="shadow-2xl w-[24rem] h-[35rem] shadow-orange-peel rounded-lg bg-orange-peel">
                    <Card className="w-[24rem] h-[35rem] flex flex-grow flex-col justify-around rounded-lg border-orange-peel bg-orange-peel text-licorice">
                        <CardHeader>
                            <CardTitle className="mb-3 text-licorice">Spread more light</CardTitle>
                            <CardDescription>Please enter details of the installed Street Light</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submitHandler} className="flex flex-col gap-2" >
                                <Input
                                    type="number"
                                    placeholder="Latitude"
                                    value={lat}
                                    required={true}
                                    className="w-full mb-3 h-9 text-sm text-licorice"
                                    disabled={true}
                                />
                                <Input
                                    type="number"
                                    placeholder="Longitude"
                                    value={long}
                                    required={true}
                                    className="w-full mb-3 h-9 text-sm text-licorice"
                                    disabled={true}
                                />
                                <Input
                                    type="number"
                                    placeholder="Rated Wattage"
                                    value={ratedWattage}
                                    onChange={(e) => { setRatedWattage(e.target.value) }}
                                    required={true}
                                    className="w-full mb-3 h-9 text-sm placeholder-licorice text-licorice bg-orange-200 border-orange-peel"
                                />
                                <Input
                                    type="number"
                                    placeholder="Critical Wattage"
                                    value={criticalWattage}
                                    onChange={(e) => { setCriticalWattage(e.target.value) }}
                                    required={true}
                                    className="w-full mb-3 h-9 text-sm placeholder-licorice text-licorice bg-orange-200 border-orange-peel"
                                />
                                <Input
                                    type="number"
                                    placeholder="Life expectancy in hours"
                                    value={expectedLife}
                                    onChange={(e) => { setExpectedLife(e.target.value) }}
                                    required={true}
                                    className="w-full mb-3 h-9 text-sm placeholder-licorice text-licorice bg-orange-200 border-orange-peel"
                                />
                                <Textarea
                                    placeholder="Description (Optional)"
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value) }}
                                    className="w-full mb-3 max-h-14 text-sm placeholder-licorice text-licorice bg-orange-200 border-orange-peel"
                                />
                                <Button className="w-full h-9 text-sm" type="submit">Save</Button>
                            </form>
                        </CardContent>
                    </Card>
                    <Toaster />
                </div>
                <Map position={[lat, long]} zoom={16} className='w-[30rem] h-[24rem] shadow-2xl shadow-thistle-blue rounded-lg' />
            </div>
        </div>
    )
}
export async function getServerSideProps(context) {

    const { userId } = context.params;

    const actualId = userId;

    const res = await axios.get('http://localhost:3000/api/fetchrole', {
        params: {
            userId: actualId, userRole: "admin"
        }
    })

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

export default index
