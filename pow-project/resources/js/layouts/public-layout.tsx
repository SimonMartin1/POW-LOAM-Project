import { ReactNode } from "react";
import AppHeaderFixed from "@/components/AppHeaderFixed";

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-[#F2EFE9]">

            <AppHeaderFixed />

            {/* Empuje del header */}
            <div className="h-[120px]"></div>

            <main className="flex-1">
                {children}
            </main>

                {/* FOOTER */}
                <footer className="bg-[#2F2F2F] text-[#E5E5E5] py-16 border-t border-[#3A5A40] mt-0">
                    <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
                        <div className="flex gap-8 mb-10">
                            {['linkedin', 'facebook', 'x', 'instagram', 'youtube'].map((social) => (
                                <img 
                                    key={social}
                                    src={`/images/social/${social}.png`}
                                    className="h-6 w-6 opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                                    alt={social}
                                />
                            ))}
                        </div>
                        <div className="w-20 h-1 bg-[#3A5A40] mx-auto mb-6 rounded-full opacity-50"></div>
                        <div className="text-center space-y-3">
                            <p className="font-['Montserrat'] font-bold tracking-widest text-sm text-white">
                                MUSEO NATURAL DE LA PAMPA
                            </p>
                            <p className="text-xs text-gray-500 font-['Inter']">
                                © {new Date().getFullYear()} Facultad de Ingeniería UNLPam
                            </p>
                        </div>
                    </div>
                </footer>
        </div>
    );
}
