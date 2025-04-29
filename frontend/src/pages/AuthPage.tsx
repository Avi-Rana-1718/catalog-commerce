import { useState } from "react"
import Input from "../components/ui/Input";
import PrimaryBtn from "../components/ui/PrimaryBtn";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router";
import Footer from "../components/user/Footer";

export default function AuthPage() {

    const [signUp, setSignUp] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    return (
        <>
        <nav className="sticky top-0 bg-white flex items-center justify-between p-4 z-50">
            <span className="text-xl text-[#E50010] cursor-pointer">
                <img src="/logo.png" className="w-20" />
            </span>
        </nav>
        <div className="flex items-center justify-center h-[90lvh]">
            <div className="w-1/5">
                <h3 className="text-4xl font-['Oswald'] uppercase ">{signUp?"Sign up":"Login"}</h3>
                <div className="flex flex-col gap-y-2 mt-4">
                    {signUp && <Input type="text" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>}
                    <Input type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <Input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <PrimaryBtn
                    label={signUp?"Sign up":"Login"}
                    onClick={()=>{
                        fetch(`http://localhost:3030/auth/${signUp?"create":"login"}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email: email,
                                password: password,
                                username: username
                            })
                        }).then(res=>res.json()).then(data=>{
                            console.log(data);
                            
                            if(data?.type=="SUCCESS") {
                                if(signUp==false) {
                                    navigate("/account")
                                }
                                setSignUp(false);
                                toast.success(data?.msg)
                            } else {
                                toast.error(data?.msg)
                            }


                            if(!signUp && data?.type=="SUCCESS") {
                                localStorage.setItem("token", data.data)
                            }
                            
                        })
                    }}
                />
                <span
                    onClick={()=>{
                        setSignUp(!signUp)
                    }} 
                    className="text-[#2b2b2b] block mt-2 hover:underline cursor-pointer"
                >{signUp?"Don't have an account? Sign up!":"Already have an account? Login!"}</span>
            </div>
        </div>
        <Toaster
            position="bottom-right"
            reverseOrder={false}
            />
            <Footer/>
        </>
    )
}