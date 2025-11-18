import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

// Definimos el tipo Imagen
interface Imagen {
    id: number;
    nombre: string;
    descripcion: string | null;
    autor: string | null;
    fecha_creacion: string;
    url_imagen: string;
}

// Tipamos las props del componente
export default function Detalle({ imagen }: { imagen: Imagen }) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: "Galería", href: "/galeria" },
                { title: imagen.nombre, href: `/galeria/${imagen.id}` }
            ]}
        >
            <Head title={imagen.nombre} />

            <div className="min-h-screen bg-[#F7F3EB] px-6 py-10 flex justify-center">
                <div className="max-w-4xl w-full bg-white rounded-3xl shadow-lg p-8">

                    {/* Imagen grande */}
                    <img
                        src={imagen.url_imagen.startsWith("http")
                            ? imagen.url_imagen
                            : `/storage/${imagen.url_imagen}`}
                        alt={imagen.nombre}
                        className="w-full h-auto rounded-xl shadow-md mb-8"
                    />

                    {/* Título */}
                    <h1 className="text-4xl font-bold text-[#3A5A40] mb-4">
                        {imagen.nombre}
                    </h1>

                    {/* Autor y Fecha */}
                    <p className="text-lg text-[#5A5A5A] mb-2">
                        <span className="font-semibold">Autor:</span> {imagen.autor}
                    </p>

                    <p className="text-lg text-[#5A5A5A] mb-6">
                        <span className="font-semibold">Fecha de creación:</span>{" "}
                        {new Date(imagen.fecha_creacion).toLocaleDateString("es-AR")}
                    </p>

                    {/* Descripción */}
                    <p className="text-md text-[#444] leading-relaxed">
                        {imagen.descripcion}
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
