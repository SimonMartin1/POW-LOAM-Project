import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head } from '@inertiajs/react';
import { useRef } from 'react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/password';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cambiar contraseña',
        href: edit().url,
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cambiar contraseña" />

            <SettingsLayout>
                <div className="space-y-10">
                    
                    {/* TÍTULO PRINCIPAL */}
                    <div>
                        <span className="text-[#3A5A40] font-bold tracking-[0.20em] text-xs uppercase block mb-2">
                            Seguridad
                        </span>
                        <h1 className="text-3xl md:text-4xl font-black uppercase text-[#2A332D]">
                            Contraseña
                        </h1>
                        <div className="w-14 h-1.5 bg-[#3A5A40] mt-3 rounded-full opacity-70"></div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow space-y-8">
                        <HeadingSmall
                            title="Actualizar contraseña"
                            description="Para mantener tu cuenta segura, usá una contraseña fuerte."
                        />

                        <Form
                            {...PasswordController.update.form()}
                            options={{ preserveScroll: true }}
                            resetOnError={[
                                'password',
                                'password_confirmation',
                                'current_password',
                            ]}
                            resetOnSuccess
                            onError={(errors) => {
                                if (errors.password) passwordInput.current?.focus();
                                if (errors.current_password) currentPasswordInput.current?.focus();
                            }}
                            className="space-y-8 mt-6"
                        >
                            {({ errors, processing, recentlySuccessful }) => (
                                <>
                                    {/* CONTRASEÑA ACTUAL */}
                                    <div className="grid gap-2">
                                        <Label className="font-semibold text-[#2A332D]">
                                            Contraseña actual
                                        </Label>

                                        <Input
                                            ref={currentPasswordInput}
                                            name="current_password"
                                            type="password"
                                            className="px-4 py-3 rounded-xl border-gray-300 focus:border-[#3A5A40] focus:ring-[#3A5A40]"
                                            placeholder="Ingresá tu contraseña actual"
                                        />

                                        <InputError message={errors.current_password} />
                                    </div>

                                    {/* NUEVA CONTRASEÑA */}
                                    <div className="grid gap-2">
                                        <Label className="font-semibold text-[#2A332D]">
                                            Nueva contraseña
                                        </Label>

                                        <Input
                                            ref={passwordInput}
                                            name="password"
                                            type="password"
                                            className="px-4 py-3 rounded-xl border-gray-300 focus:border-[#3A5A40] focus:ring-[#3A5A40]"
                                            placeholder="Ingresá una contraseña fuerte"
                                        />

                                        <InputError message={errors.password} />
                                    </div>

                                    {/* CONFIRMAR */}
                                    <div className="grid gap-2">
                                        <Label className="font-semibold text-[#2A332D]">
                                            Confirmar contraseña
                                        </Label>

                                        <Input
                                            name="password_confirmation"
                                            type="password"
                                            className="px-4 py-3 rounded-xl border-gray-300 focus:border-[#3A5A40] focus:ring-[#3A5A40]"
                                            placeholder="Volvé a escribir la contraseña"
                                        />

                                        <InputError message={errors.password_confirmation} />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button
                                            disabled={processing}
                                            className="bg-[#3A5A40] hover:bg-[#1F3022] text-white px-6 py-3 rounded-xl font-bold"
                                        >
                                            Guardar contraseña
                                        </Button>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-neutral-600">
                                                Cambios guardados
                                            </p>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
