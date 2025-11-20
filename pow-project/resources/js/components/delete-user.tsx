import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function DeleteUser() {
    const { delete: destroy, processing } = useForm({});
    const [confirming, setConfirming] = useState(false);
    const [password, setPassword] = useState('');

    const submit = () => {
        destroy('/settings/profile', {
            preserveScroll: true,
            onSuccess: () => setConfirming(false),
            onError: () => console.log('Error deleting user'),
        });
    };

    return (
        <div className="mt-14 bg-white border border-red-200 rounded-3xl p-8 shadow">

            {/* TITULO */}
            <h2 className="text-xl font-bold text-[#7A1F1F] mb-1">
                Eliminar cuenta
            </h2>

            <p className="text-sm text-[#7A1F1F] opacity-80 mb-6">
                Esta acción es permanente y eliminará todos tus datos. No podrás recuperarla.
            </p>

            {!confirming && (
                <Button
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
                    onClick={() => setConfirming(true)}
                >
                    Eliminar cuenta definitivamente
                </Button>
            )}

            {confirming && (
                <div className="mt-6 space-y-4">

                    <div className="grid gap-2">
                        <Label className="text-[#2A332D]" htmlFor="password">
                            Confirmá tu contraseña
                        </Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresá tu contraseña"
                            className="w-full px-4 py-3 rounded-xl border-gray-300 focus:border-red-600 focus:ring-red-600"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            disabled={processing}
                            onClick={submit}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
                        >
                            Confirmar eliminación
                        </Button>

                        <button
                            type="button"
                            onClick={() => setConfirming(false)}
                            className="text-sm underline text-gray-600 hover:text-gray-900"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
