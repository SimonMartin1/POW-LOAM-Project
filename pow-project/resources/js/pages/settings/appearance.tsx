import { Head } from "@inertiajs/react";

import AppearanceTabs from "@/components/appearance-tabs";
import HeadingSmall from "@/components/heading-small";
import { type BreadcrumbItem } from "@/types";

import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";
import { edit as editAppearance } from "@/routes/appearance";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Apariencia",
        href: editAppearance().url,
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Apariencia" />

            <SettingsLayout>
                <div className="space-y-10">

                    {/* TÍTULO PRINCIPAL */}
                    <div>
                        <span className="text-[#3A5A40] font-bold tracking-[0.20em] text-xs uppercase block mb-2">
                            Personalización
                        </span>

                        <h1 className="text-3xl md:text-4xl font-black uppercase text-[#2A332D]">
                            Configuración de Apariencia
                        </h1>

                        <div className="w-14 h-1.5 bg-[#3A5A40] mt-3 rounded-full opacity-70"></div>
                    </div>

                    {/* TARJETA */}
                    <div className="bg-white p-8 rounded-3xl shadow space-y-8">

                        <HeadingSmall
                            title="Apariencia del sistema"
                            description="Elegí cómo querés que el sitio adapte los colores y el modo visual."
                        />

                        {/* TABS DE APARIENCIA */}
                        <AppearanceTabs />
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
