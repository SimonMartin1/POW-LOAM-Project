import HeadingSmall from "@/components/heading-small";
import TwoFactorRecoveryCodes from "@/components/two-factor-recovery-codes";
import TwoFactorSetupModal from "@/components/two-factor-setup-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTwoFactorAuth } from "@/hooks/use-two-factor-auth";
import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";
import { disable, enable, show } from "@/routes/two-factor";
import { type BreadcrumbItem } from "@/types";
import { Form, Head } from "@inertiajs/react";
import { ShieldBan, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface TwoFactorProps {
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Autenticación en dos pasos",
        href: show.url(),
    },
];

export default function TwoFactor({
    requiresConfirmation = false,
    twoFactorEnabled = false,
}: TwoFactorProps) {
    const {
        qrCodeSvg,
        hasSetupData,
        manualSetupKey,
        clearSetupData,
        fetchSetupData,
        recoveryCodesList,
        fetchRecoveryCodes,
        errors,
    } = useTwoFactorAuth();

    const [showSetupModal, setShowSetupModal] = useState<boolean>(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Autenticación en dos pasos" />

            <SettingsLayout>
                <div className="space-y-10">

                    {/* TÍTULO PRINCIPAL */}
                    <div>
                        <span className="text-[#3A5A40] font-bold tracking-[0.20em] text-xs uppercase block mb-2">
                            Seguridad
                        </span>

                        <h1 className="text-3xl md:text-4xl font-black uppercase text-[#2A332D]">
                            Autenticación en dos pasos
                        </h1>

                        <div className="w-14 h-1.5 bg-[#3A5A40] mt-3 rounded-full opacity-70"></div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow space-y-8">

                        <HeadingSmall
                            title="Protegé tu cuenta"
                            description="Añadí una capa extra de seguridad solicitando un código desde tu app de autenticación."
                        />

                        {twoFactorEnabled ? (
                            <>
                                {/* Estado → HABILITADO */}
                                <Badge className="bg-green-600 text-white text-sm px-3 py-1 rounded-full">
                                    Habilitado
                                </Badge>

                                <p className="text-[#4b4b4b] leading-relaxed">
                                    Tenés activada la verificación en dos pasos. Cuando ingreses,
                                    se te solicitará un código generado por tu app
                                    (Google Authenticator, Authy, etc.).
                                </p>

                                {/* Códigos de recuperación */}
                                <TwoFactorRecoveryCodes
                                    recoveryCodesList={recoveryCodesList}
                                    fetchRecoveryCodes={fetchRecoveryCodes}
                                    errors={errors}
                                />

                                <Form {...disable.form()}>
                                    {({ processing }) => (
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold mt-6"
                                        >
                                            <ShieldBan className="mr-2" />
                                            Desactivar 2FA
                                        </Button>
                                    )}
                                </Form>
                            </>
                        ) : (
                            <>
                                {/* Estado → DESHABILITADO */}
                                <Badge className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                                    Deshabilitado
                                </Badge>

                                <p className="text-[#4b4b4b] leading-relaxed">
                                    Si activás la autenticación en dos pasos, cada vez que ingreses
                                    deberás confirmar tu identidad con un código generado por tu dispositivo.
                                </p>

                                {/* BOTÓN INICIAL DE ACTIVAR */}
                                {!hasSetupData ? (
                                    <Form
                                        {...enable.form()}
                                        onSuccess={() => setShowSetupModal(true)}
                                    >
                                        {({ processing }) => (
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-[#3A5A40] hover:bg-[#1F3022] text-white px-6 py-3 rounded-xl font-bold mt-6"
                                            >
                                                <ShieldCheck className="mr-2" />
                                                Activar verificación en dos pasos
                                            </Button>
                                        )}
                                    </Form>
                                ) : (
                                    <Button
                                        onClick={() => setShowSetupModal(true)}
                                        className="bg-[#3A5A40] hover:bg-[#1F3022] text-white px-6 py-3 rounded-xl font-bold mt-6"
                                    >
                                        <ShieldCheck className="mr-2" />
                                        Continuar configuración
                                    </Button>
                                )}
                            </>
                        )}

                        {/* MODAL DE SETUP */}
                        <TwoFactorSetupModal
                            isOpen={showSetupModal}
                            onClose={() => setShowSetupModal(false)}
                            requiresConfirmation={requiresConfirmation}
                            twoFactorEnabled={twoFactorEnabled}
                            qrCodeSvg={qrCodeSvg}
                            manualSetupKey={manualSetupKey}
                            clearSetupData={clearSetupData}
                            fetchSetupData={fetchSetupData}
                            errors={errors}
                        />
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
