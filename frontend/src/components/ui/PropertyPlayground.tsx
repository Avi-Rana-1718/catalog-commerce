import { useEffect, useState } from "react"
import Input from "./Input"
import { LuTrash, LuX } from "react-icons/lu"

enum type {
    Variation="Variation",
    Relation="Relation"
}


export default function PropertyPlayground({values, setValues}) {
    const [keys, setKeys] = useState(Object.keys(values))
    const [nKey, setNKey] = useState("") // to add a new key - key name

    const [types, setTypes] = useState({size: type.Variation})

    useEffect(()=>{
        setKeys(Object.keys(values))
        
    }, [values])

    function addKey(key) {
        let obj = {...values};
        obj[key.toLowerCase()]=[];
        obj[key.toLowerCase()].push({name: "", id: 0})
        let nTypes = {...types};
        nTypes[key]=type.Relation;
        setTypes(nTypes)
        setValues(obj)
    }

    function deleteKey(key) {
        let obj = {...values};
        delete obj[key.toLowerCase()];
        setValues(obj)
        console.log(values);
        
    } 

    function changeType(key, nType) {
        let obj = {...types};
        obj[key]=nType;

        let data = {...values}
        data[key].forEach(el=>{
            if(nType==type.Relation) {
                delete el.stock;
            } else {
                delete el.id;
            }
        })

        setValues(data)
        setTypes(obj)
        console.log(types);
        
    }
    
    return (
        <div className="w-full text-left">
                {keys.map((key=>{
                    return (
                <div>
                    <div className="bg-[#EAEAEA] p-2 capitalize flex justify-between items-center">
                       <h5>
                            <span>{key}</span>
                       </h5>
                       <span className="flex items-center">
                            <select className="mr-2" onChange={(e)=>{changeType(key, e.target.value)}}>
                                <option value={type.Relation} selected={types[key]==type.Relation}>Relation</option>
                                <option value={type.Variation} selected={types[key]==type.Variation}>Variation</option>
                            </select>
                            <LuTrash className="text-red-700 cursor-pointer" onClick={()=>{deleteKey(key)}}/>
                        </span> 
                    </div>
                        {values[key]?.length && values[key].map((el, index)=>{
                            
                            return (
                                <div className="flex items-center gap-x-3 pl-2 mt-1">
                                    <Input label="name" value={el.name} onChange={(e)=>{
                                        let obj = {...values};
                                        obj[key][index].name=e.target.value;
                                        setValues(obj)
                                    }}/>
                                    <Input type={types[key]==type.Variation?"number":"text"} label={types[key]==type.Variation?"Stock":"ID"} value={types[key]==type.Variation?el?.stock:el?.id} onChange={(e)=>{
                                        let obj = {...values};
                                        if(types[key]==type.Variation) {
                                            obj[key][index].stock=e.target.value;
                                        } else {
                                            obj[key][index].id=e.target.value;
                                        }
                                        setValues(obj)
                                    }}/>
                                    <span
                                        onClick={()=>{
                                            let obj = {...values};
                                            delete obj[key][index]
                                            setValues(obj)
                                        }}
                                    >
                                    <LuTrash className="text-red-700 cursor-pointer" /> 
                                    </span>
                                </div>
                            )
                        })}
                        <button 
                            onClick={()=>{
                                let obj = {...values};
                                if(types[key]==type.Variation) {
                                    obj[key][values[key].length]={name: "", stock: 0};
                                } else {
                                    obj[key][values[key].length]={name: "", id: 0};
                                }
                                setValues(obj)
                            }}
                            className="text-right w-full my-2 hover:underline cursor-pointer">
                            Add entry
                        </button>
                </div>
                    ) 
                }))
            }

            <label className="mb-1 mx-3 mt-5 block">Add new key</label>
            <input 
                className="border w-full border-[#dad8d8] focus:border-[#555] mx-3 px-3 py-2 focus:outline-none block" 
                placeholder="Key name"
                value={nKey} 
                onChange={(e)=>{setNKey(e.target.value)}}  
                onKeyDown={(e)=>{
                    if(e.key=="Enter") {
                        addKey(nKey);
                        setNKey("")
                        let obj = {...types};
                        obj[nKey]=type.Relation;
                        setTypes(obj)
                    }
                }}  
            />
        </div>
    )
}