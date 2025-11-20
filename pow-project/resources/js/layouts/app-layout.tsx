import { ReactNode } from "react";
import AppHeaderFixed from "@/components/AppHeaderFixed";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { type BreadcrumbItem } from "@/types";

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs = [] }: AppLayoutProps) {
    const hasBreadcrumbs = breadcrumbs.length > 0;

    return (
        <div className="
                        min-h-screen flex flex-col
                        bg-[#F7F3EB] text-[#2A332D]
                        dark:bg-[#0E0E0E] dark:text-[#EDEDED]
                        transition-colors duration-300
        ">


            {/* HEADER FIJO UNIFICADO */}
            <AppHeaderFixed />

            {/* OFFSET por header fijo */}
            <div className="h-[120px]"></div>

            {/* BREADCRUMBS (si existen) */}
            {hasBreadcrumbs && (
                <div className="
                    border-b border-[#D6D0C4]/80 dark:border-[#3A3A3A]
                    bg-[#F7F3EB]/80 dark:bg-[#1A1A1A]/80
                    backdrop-blur-sm
                ">
                    <div className="max-w-6xl mx-auto px-6 py-3">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}

            {/* CONTENIDO */}
            <main className="flex-1">
                {children}
            </main>

            {/* FOOTER */}
            <footer className="
                bg-[#2F2F2F] dark:bg-[#000000]
                text-[#E5E5E5] dark:text-[#CCCCCC]
                py-16
                border-t border-[#3A5A40] dark:border-[#1F3A25]
            ">

                <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
                    <div className="flex gap-8 mb-10">
                        {["linkedin", "facebook", "x", "instagram", "youtube"].map((social) => (
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
