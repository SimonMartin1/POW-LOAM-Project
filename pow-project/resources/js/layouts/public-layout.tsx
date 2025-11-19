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
            <footer className="mt-20 w-full bg-[#2F2F2F] text-[#E5E5E5] py-10">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="flex justify-center gap-8 mb-6">
                        {["linkedin", "facebook", "x", "instagram", "youtube"].map(s => (
                            <img
                                key={s}
                                src={`/images/social/${s}.png`}
                                className="h-7 opacity-70 hover:opacity-100 cursor-pointer"
                            />
                        ))}
                    </div>

                    <p className="text-sm tracking-wide">
                        © {new Date().getFullYear()} Museo Natural de La Pampa — Pecheras & Pategras · Facultad de Ingeniería UNLPam
                    </p>
                </div>
            </footer>
        </div>
    );
}
