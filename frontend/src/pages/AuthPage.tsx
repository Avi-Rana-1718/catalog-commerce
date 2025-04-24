import { useState } from "react"

export default function AuthPage() {

    const [signUp, setSignUp] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <h3 className="text-xl">{signUp?"Sign up":"Login"}</h3>
                <div className="flex flex-col gap-y-2 mt-4">
                    {signUp && <input type="text" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}} className="px-3 py-2 bg-[#F2F2F2] outline-blue-500 rounded"/>}
                    <input type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="px-3 py-2 bg-[#F2F2F2] outline-blue-500 rounded"/>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="px-3 py-2 bg-[#F2F2F2] outline-blue-500 rounded"/>
                </div>
                <button
                    className="w-full mb-2 bg-[#6F48EC] text-white px-8 py-2 mt-5 rounded hover:underline cursor-pointer"
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
                                setSignUp(false);
                            }

                            if(!signUp && data?.type=="SUCCESS") {
                                localStorage.setItem("token", data.msg)
                            }
                            
                        })
                    }}
                >
                    {signUp?"Sign up":"Login"}
                </button>
                <span
                    onClick={()=>{
                        setSignUp(!signUp)
                    }} 
                    className="text-[#2b2b2b] hover:underline cursor-pointer"
                >{signUp?"Don't have an account? Sign up!":"Already have an account? Login!"}</span>
            </div>
        </div>
    )
}