import React, { useState } from 'react';
import { X, CheckCircle, Calendar, Users, School, Send } from "lucide-react";
import { useForm } from '@inertiajs/react'; // <--- IMPORTANTE

interface VisitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function VisitModal({ isOpen, onClose }: VisitModalProps) {
    const [isSuccess, setIsSuccess] = useState(false);

    // Usamos el hook de Inertia para manejar el formulario
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        institution: '',
        students_count: '',
        visit_date: '',
        responsible_name: '',
        email: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post('/visitas/solicitar', {
            preserveScroll: true, // Para que no salte la página al enviar
            onSuccess: () => {
                setIsSuccess(true);
                reset(); // Limpia el formulario
            },
            onError: (err) => {
                console.error(err); // Por si quieres ver errores en consola
            }
        });
    };

    const handleClose = () => {
        setIsSuccess(false);
        clearErrors();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={handleClose}
            ></div>

            {/* Contenedor */}
            <div className="bg-[#F2EFE9] w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 transition-colors text-[#2A332D] z-10"
                >
                    <X size={24} />
                </button>

                {!isSuccess ? (
                    <div className="p-8 md:p-10">
                        <div className="mb-8">
                            <span className="text-[#3A5A40] font-bold tracking-[0.2em] text-[10px] uppercase mb-2 block">
                                Educación y Comunidad
                            </span>
                            <h3 className="text-2xl md:text-3xl font-['Montserrat'] font-black text-[#2A332D] uppercase leading-none">
                                Programar Visita
                            </h3>
                            <p className="text-gray-600 mt-2 text-sm">
                                Complete los datos y coordinaremos la fecha con usted.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-4">
                                {/* INSTITUCION */}
                                <div className="relative">
                                    <School className="absolute left-4 top-3.5 text-[#3A5A40]" size={20} />
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="Institución / Escuela"
                                        value={data.institution}
                                        onChange={e => setData('institution', e.target.value)}
                                        className="w-full bg-white border-none rounded-xl py-3 pl-12 pr-4 text-[#2A332D] placeholder-gray-400 focus:ring-2 focus:ring-[#3A5A40] transition-all"
                                    />
                                    {errors.institution && <span className="text-red-500 text-xs ml-4">{errors.institution}</span>}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    {/* ALUMNOS */}
                                    <div className="relative">
                                        <Users className="absolute left-4 top-3.5 text-[#3A5A40]" size={20} />
                                        <input 
                                            required
                                            type="number" 
                                            placeholder="Cant. Alumnos"
                                            value={data.students_count}
                                            onChange={e => setData('students_count', e.target.value)}
                                            className="w-full bg-white border-none rounded-xl py-3 pl-12 pr-4 text-[#2A332D] placeholder-gray-400 focus:ring-2 focus:ring-[#3A5A40]"
                                        />
                                        {errors.students_count && <span className="text-red-500 text-xs ml-4">{errors.students_count}</span>}
                                    </div>
                                    {/* FECHA */}
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-3.5 text-[#3A5A40]" size={20} />
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="Fecha estimada"
                                            onFocus={(e) => e.target.type = 'date'}
                                            onBlur={(e) => !e.target.value && (e.target.type = 'text')}
                                            value={data.visit_date}
                                            onChange={e => setData('visit_date', e.target.value)}
                                            className="w-full bg-white border-none rounded-xl py-3 pl-12 pr-4 text-[#2A332D] placeholder-gray-400 focus:ring-2 focus:ring-[#3A5A40]"
                                        />
                                        {errors.visit_date && <span className="text-red-500 text-xs ml-4">{errors.visit_date}</span>}
                                    </div>
                                </div>

                                {/* RESPONSABLE */}
                                <div className="relative">
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="Nombre del Responsable"
                                        value={data.responsible_name}
                                        onChange={e => setData('responsible_name', e.target.value)}
                                        className="w-full bg-white border-none rounded-xl py-3 px-4 text-[#2A332D] placeholder-gray-400 focus:ring-2 focus:ring-[#3A5A40]"
                                    />
                                    {errors.responsible_name && <span className="text-red-500 text-xs ml-4">{errors.responsible_name}</span>}
                                </div>

                                {/* EMAIL */}
                                <div className="relative">
                                    <input 
                                        required
                                        type="email" 
                                        placeholder="Correo de contacto"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full bg-white border-none rounded-xl py-3 px-4 text-[#2A332D] placeholder-gray-400 focus:ring-2 focus:ring-[#3A5A40]"
                                    />
                                    {errors.email && <span className="text-red-500 text-xs ml-4">{errors.email}</span>}
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full bg-[#3A5A40] hover:bg-[#2A332D] text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                            >
                                {processing ? (
                                    "Enviando..."
                                ) : (
                                    <>Enviar Solicitud <Send size={16} /></>
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    // ESTADO DE ÉXITO
                    <div className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                        <div className="w-20 h-20 bg-[#4ADE80]/20 rounded-full flex items-center justify-center mb-6 text-[#3A5A40]">
                            <CheckCircle size={48} />
                        </div>
                        <h3 className="text-2xl font-['Montserrat'] font-black text-[#2A332D] uppercase mb-4">
                            ¡Solicitud Recibida!
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-xs">
                            Gracias por su interés. En breve nos contactaremos al correo proporcionado para confirmar la visita.
                        </p>
                        <button 
                            onClick={handleClose}
                            className="text-[#3A5A40] font-bold uppercase text-xs tracking-widest border-b-2 border-[#3A5A40] pb-1 hover:text-black hover:border-black transition-colors"
                        >
                            Cerrar ventana
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}