export default function Footer() {
    return (
        <footer className="p-3 mt-4 flex justify-between items-end">
            <div className="p-4">
                <img 
                    src="/logo.png"
                    className="w-30 grayscale"
                />
                <span className="text-[#555] ml-5 mt-15 block">The content of this site is copyright-protected and is the property of H & M Hennes & Mauritz AB.</span>
            </div>
        </footer>
    )
}