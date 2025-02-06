"use client";

import Toolbar from "./Toolbar";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Toolbar />

            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <footer className="bg-orange-300 py-6 text-center">
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="#" className="text-white hover:underline">Privacy Policy</a>
                    <a href="#" className="text-white hover:underline">Accessibility</a>
                </div>

            </footer>
        </div>
    );
}