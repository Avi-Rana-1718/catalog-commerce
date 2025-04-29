export default function Drawer({children}:{children:any}) {
    return (
        <div className="absolute bg-black/55 w-screen h-screen overflow-y-scroll top-0 left-0 z-50">
            <div className="absolute top-0 right-0 p-8 md:p-16 bg-white h-screen w-full overflow-y-scroll md:w-1/3 opacity-100">
                {children}
            </div>
        </div>
    )
}