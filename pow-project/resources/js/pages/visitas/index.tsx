import AppLayout from "@/layouts/app-layout";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { Check, X, ArrowLeft } from "lucide-react";

interface Visit {
    id: number;
    institution: string;
    students_count: number;
    visit_date: string | null;
    responsible_name: string;
    email: string;
    status: "pending" | "approved" | "rejected";
    created_at: string;
}

export default function VisitasIndex() {
    const page = usePage().props as unknown as { visitas?: Visit[] };
    const visits = page.visitas ?? [];

    const aprobar = (id: number) => {
        router.post(`/visitas/${id}/approve`, {}, { preserveScroll: true });
    };

    const rechazar = (id: number) => {
        router.post(`/visitas/${id}/reject`, {}, { preserveScroll: true });
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("es-AR");

    return (
        <AppLayout breadcrumbs={[{ title: "Visitas solicitadas", href: "/visitas" }]}>
            <Head title="Visitas solicitadas" />

            <div className="min-h-screen bg-[#F7F3EB] px-6 py-12 max-w-7xl mx-auto">

                {/* BOTÓN VOLVER */}
                <Link
                    href="/dashboard"
                    className="
                        inline-flex items-center gap-2
                        text-[#3A5A40] font-semibold mb-10
                        px-5 py-2 rounded-full border border-[#c4c4c4]
                        bg-white hover:bg-[#ebebeb] transition shadow-sm
                    "
                >
                    <ArrowLeft size={16} /> Volver
                </Link>

                {/* TÍTULO */}
                <div className="text-center mb-12">
                    <span className="text-[#3A5A40] font-bold tracking-[0.20em] text-xs uppercase block mb-3">
                        Administración
                    </span>
                    <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-black uppercase tracking-tight text-[#2A332D]">
                        Visitas Solicitadas
                    </h1>
                    <div className="w-20 h-1.5 bg-[#3A5A40] mx-auto mt-5 rounded-full opacity-70"></div>
                </div>

                {/* TABLA */}
                <div className="bg-white rounded-3xl shadow p-6 overflow-x-auto">

                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="px-6 py-4">Institución</th>
                                <th className="px-6 py-4">Alumnos</th>
                                <th className="px-6 py-4">Responsable</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Fecha estimada</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Acciones</th>
                                <th className="px-6 py-4">Solicitado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {visits.map((v) => (
                                <tr key={v.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-semibold">{v.institution}</td>
                                    <td className="px-6 py-4">{v.students_count}</td>
                                    <td className="px-6 py-4">{v.responsible_name}</td>
                                    <td className="px-6 py-4">{v.email}</td>
                                    <td className="px-6 py-4">
                                        {v.visit_date
                                            ? formatDate(v.visit_date)
                                            : <span className="text-gray-400 italic">No definida</span>
                                        }
                                    </td>

                                    {/* ESTADO */}
                                    <td className="px-6 py-4">
                                        {v.status === "pending" && (
                                            <span className="px-3 py-1 rounded-full bg-yellow-200 text-yellow-800 text-sm font-semibold">
                                                Pendiente
                                            </span>
                                        )}
                                        {v.status === "approved" && (
                                            <span className="px-3 py-1 rounded-full bg-green-200 text-green-800 text-sm font-semibold">
                                                Aprobada
                                            </span>
                                        )}
                                        {v.status === "rejected" && (
                                            <span className="px-3 py-1 rounded-full bg-red-200 text-red-800 text-sm font-semibold">
                                                Rechazada
                                            </span>
                                        )}
                                    </td>

                                    {/* ACCIONES */}
                                    <td className="px-6 py-4">
                                        {v.status === "pending" ? (
                                            <div className="flex gap-3">

                                                {/* APROBAR */}
                                                <button
                                                    onClick={() => aprobar(v.id)}
                                                    className="p-2 bg-green-600 hover:bg-green-700 rounded-full text-white"
                                                >
                                                    <Check size={18} />
                                                </button>

                                                {/* RECHAZAR */}
                                                <button
                                                    onClick={() => rechazar(v.id)}
                                                    className="p-2 bg-red-600 hover:bg-red-700 rounded-full text-white"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 italic">Sin acciones</span>
                                        )}
                                    </td>

                                    {/* FECHA DE SOLICITUD */}
                                    <td className="px-6 py-4 text-gray-600">
                                        {formatDate(v.created_at)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </div>
        </AppLayout>
    );
}
