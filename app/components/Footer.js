

export default function Layout({ children }) {
    return (
        
        
        <div className="min-h-screen flex flex-col">
            <Toolbar />
            
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <footer className="bg-orange-300 py-6 text-center">
                <div className="flex justify-center space-x-6">
                    <a href="#" className="text-white">Privacy Policy</a>
                    <a href="#" className="text-white">Accessibility</a>
                </div>
                <img src="/images/sun.png" alt="Sun" className="w-12 h-12 mx-auto mt-4" />
            </footer>

        </div>
    );
}
