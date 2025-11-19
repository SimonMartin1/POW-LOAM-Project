import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon, PlusCircle, UserIcon } from "lucide-react";

export default function Dashboard() {
    return (
        <AppLayout
            
        >
            <Head title="Dashboard" />

            <div className="min-h-screen px-6 py-10 bg-[#F7F3EB] text-[#3E3E3E]">

                {/* Título */}
                <h1 className="text-4xl font-bold text-[#3A5A40] mb-10 text-center">
                    Panel de Control
                </h1>

                {/* Tarjetas principales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Ver Galería (público) */}
                    <Link href="/galeria">
                        <Card className="bg-white hover:shadow-xl hover:-translate-y-1 transition rounded-3xl border border-[#D8D2C4]">
                            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                                <ImageIcon className="h-12 w-12 text-[#3A5A40]" />
                                <h2 className="text-2xl font-semibold">Ver Galería</h2>
                                <p className="text-sm opacity-70">
                                    Explora las imágenes disponibles del museo digital.
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Agregar Imagen (solo admin) */}
                    <Link href="/imagenes/agregar">
                        <Card className="bg-white hover:shadow-xl hover:-translate-y-1 transition rounded-3xl border border-[#D8D2C4]">
                            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                                <PlusCircle className="h-12 w-12 text-[#7F5539]" />
                                <h2 className="text-2xl font-semibold">Agregar Imagen</h2>
                                <p className="text-sm opacity-70">
                                    Sube nuevas piezas y amplía la colección.
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Perfil */}
                    <Link href="/settings/profile">
                        <Card className="bg-white hover:shadow-xl hover:-translate-y-1 transition rounded-3xl border border-[#D8D2C4]">
                            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                                <UserIcon className="h-12 w-12 text-[#A47148]" />
                                <h2 className="text-2xl font-semibold">Perfil</h2>
                                <p className="text-sm opacity-70">
                                    Gestioná tu cuenta y configuración personal.
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
