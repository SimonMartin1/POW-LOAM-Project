"use client";

import { useEffect, useMemo, useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption,
} from "@/components/ui/table";
import { ChevronDown, Search, X, ArrowLeft } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [{ title: "Imagenes", href: "/imagenes" }];

interface Imagen {
    id: number;
    nombre: string;
    descripcion: string | null;
    autor: string | null;
    fecha_creacion: string;
    url_imagen: string;
}
interface PageProps {
    imagenes: Imagen[];
    [key: string]: any;
}

type UIRow = Imagen & { url_publica: string; fecha_lectura: string };

export default function Index() {
    const { props } = usePage<PageProps>();
    const imagenes = props.imagenes ?? [];

    const [rows, setRows] = useState<UIRow[]>([]);

    useEffect(() => {
        const mapped = imagenes.map((i) => {
            let url_publica = "";

            if (!i.url_imagen) url_publica = "";
            else if (i.url_imagen.startsWith("http")) url_publica = i.url_imagen;
            else url_publica = `${window.location.origin}/storage/${i.url_imagen}`;

            const fecha_lectura = i.fecha_creacion
                ? new Date(i.fecha_creacion).toISOString().slice(0, 10)
                : "";

            return { ...i, url_publica, fecha_lectura };
        });

        setRows(mapped);
    }, [imagenes]);

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, nombre: string) => {
        if (!confirm(`¿Está seguro que desea eliminar la imagen "${nombre}"?`)) return;

        destroy(`/imagenes/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setRows((prev) => prev.filter((r) => r.id !== id));
            },
        });
    };

    const [query, setQuery] = useState("");
    const [columns, setColumns] = useState({
        miniatura: true,
        descripcion: true,
        autor: true,
        fecha: true,
    });
    const toggleCol = (k: keyof typeof columns, v: boolean | "indeterminate") =>
        setColumns((c) => ({ ...c, [k]: !!v }));

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return rows;
        return rows.filter((i) => {
            const n = i.nombre?.toLowerCase() ?? "";
            const d = i.descripcion?.toLowerCase() ?? "";
            const a = i.autor?.toLowerCase() ?? "";
            return n.includes(q) || d.includes(q) || a.includes(q);
        });
    }, [rows, query]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Imágenes" />

            <div className="m-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-[#3A5A40] font-semibold mb-10 px-5 py-2 rounded-full border border-[#c4c4c4] bg-white hover:bg-[#ebebeb] transition shadow-sm"
                >
                    <ArrowLeft size={16} /> Volver
                </Link>

                <h1 className="text-xl font-semibold">Panel de Obras cargadas</h1>

                <div className="flex w-full items-center gap-2 sm:w-auto">
                    <div className="relative flex-1 sm:min-w-[320px]">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
                        <Input
                            placeholder="Buscar por nombre, descripción o autor…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="pl-9 pr-9"
                        />
                        {query && (
                            <button
                                aria-label="Borrar búsqueda"
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 opacity-70 hover:opacity-100"
                                onClick={() => setQuery("")}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="whitespace-nowrap">
                                Columns <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 dropdown-solid">
                            <DropdownMenuLabel>Mostrar/Ocultar</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                checked={columns.miniatura}
                                onCheckedChange={(v) => toggleCol("miniatura", v)}
                            >
                                Miniatura
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={columns.descripcion}
                                onCheckedChange={(v) => toggleCol("descripcion", v)}
                            >
                                Descripción
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={columns.autor}
                                onCheckedChange={(v) => toggleCol("autor", v)}
                            >
                                Autor
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={columns.fecha}
                                onCheckedChange={(v) => toggleCol("fecha", v)}
                            >
                                Fecha
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/imagenes/agregar">
                        <Button>Agregar una Imagen</Button>
                    </Link>
                </div>
            </div>

            <div className="m-4 overflow-x-auto rounded-xl border max-w-full">
                <Table>
                    <TableCaption className="text-sm">
                        {filtered.length} resultado(s){query ? " (filtrado)" : ""}
                    </TableCaption>

                    <TableHeader>
                        <TableRow>
                            {columns.miniatura && <TableHead className="w-[140px]">Miniatura</TableHead>}
                            <TableHead className="min-w-[220px]">Nombre</TableHead>
                            {columns.descripcion && (
                                <TableHead className="w-[120px]">Descripción</TableHead>
                            )}
                            {columns.autor && <TableHead className="w-[140px]">Autor</TableHead>}
                            {columns.fecha && <TableHead className="w-[120px]">Fecha</TableHead>}
                            <TableHead className="text-right w-[140px]">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filtered.length > 0 ? (
                            filtered.map((img) => (
                                <TableRow key={img.id}>
                                    {columns.miniatura && (
                                        <TableCell>
                                            <div className="h-[72px] w-[96px] overflow-hidden rounded-md border bg-muted">
                                                <img
                                                    src={img.url_publica}
                                                    alt={img.nombre}
                                                    className="h-full w-full object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </TableCell>
                                    )}

                                    {/* NOMBRE – siempre visible, nunca se corta */}
                                    <TableCell className="font-medium whitespace-normal break-words">
                                        {img.nombre}
                                    </TableCell>

                                    {/* DESCRIPCIÓN – columna angosta, siempre corta texto */}
                                    {columns.descripcion && (
                                        <TableCell className="text-slate-600">
                                            <span className="line-clamp-2 text-sm leading-snug break-words">
                                                {img.descripcion
                                                    ? img.descripcion.substring(0, 80) + "…"
                                                    : "-"}
                                            </span>
                                        </TableCell>
                                    )}

                                    {columns.autor && <TableCell>{img.autor}</TableCell>}

                                    {columns.fecha && <TableCell>{img.fecha_lectura}</TableCell>}

                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/imagenes/${img.id}/editar`}>
                                                <Button variant="outline" size="sm" className="bg-[#3A5A40] hover:bg-[#2a4633] text-white shadow-sm border-none">
                                                    Editar
                                                </Button>
                                            </Link>

                                            <Button
                                                disabled={processing}
                                                onClick={() => handleDelete(img.id, img.nombre)}
                                                className="bg-[#d9534f] hover:bg-[#c9302c] text-white shadow-sm"
                                                size="sm"
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    {query ? "Sin resultados para la búsqueda." : "No hay imágenes para mostrar."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
