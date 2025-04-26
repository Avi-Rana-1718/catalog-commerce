export default function Input({label=null, placeholder="", value=null, onChange, type="text"}) {
    return (
        <>
        {label && <label htmlFor={label} className="uppercase block mt-1">{label}</label>}
        <input id={label||placeholder} placeholder={placeholder} value={value} type={type} autoComplete="off" onChange={onChange} className="border w-full border-[#dad8d8] focus:border-[#555] px-3 py-2 focus:outline-none block"/>
        </>
    )
}