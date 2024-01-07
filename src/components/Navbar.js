export default function Navbar(props) {
    return (
        <div className="h-10 bg-black text-white fixed top-0 w-full z-10 flex justify-between">
            Navigation links
            {props.username ?
                <div>{props.username}</div>
                :
                <div>SignIn</div>
            }
        </div>
    )
}

