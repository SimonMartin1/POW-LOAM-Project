import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { type BreadcrumbItem } from '@/types'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, Image as ImageIcon, Terminal, CircleAlert } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale" 
import AppLayout from "@/layouts/app-layout"
import { useForm } from "@inertiajs/react"
import { Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Agregar Imagen',
    href: '/imagenes/agregar',
  },
]

export default function Agregar() {

    const {data, setData, post, processing, errors} = useForm({
    nombre: '',
    autor: '',
    fecha_creacion: '',
    descripcion: '',
    imagen: null as File | null,
    });

    const [date, setDate] = useState<Date | undefined>(new Date())
    const [preview, setPreview] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        post('/imagenes/guardar');
    }
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
        setData('imagen', file);
        const reader = new FileReader()
        reader.onloadend = () => setPreview(reader.result as string)
        reader.readAsDataURL(file)
    }
    }

    return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <form onSubmit={handleSubmit} className="min-h-screen w-full bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-white p-8">

        {Object.keys(errors).length > 0 && (
            <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    <ul>
                    {Object.entries(errors).map(([key, message]) => (
                        <li key={key}>{message as string}</li>
                    ))}
                    </ul>
                </AlertDescription>
            </Alert>    
        )}

        <div className="max-w-3xl mx-auto">
        <Card className="bg-neutral-900/70 border border-neutral-800 shadow-xl backdrop-blur-md">
            <CardHeader>
            <CardTitle className="text-xl font-semibold">Detalles de la Obra</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label>Nombre</Label>
                <Input
                    placeholder="Ej: La noche estrellada" 
                    value={data.nombre} onChange={(e)=> setData('nombre', e.target.value)}
                    className="bg-neutral-800 border-neutral-700 text-white"
                />
                </div>

                <div className="space-y-2">
                <Label>Autor</Label>
                <Input
                    placeholder="Ej: Vincent van Gogh" 
                    value={data.autor} onChange={(e)=> setData('autor', e.target.value)}
                    className="bg-neutral-800 border-neutral-700 text-white"
                />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Fecha de creación</Label>
                <Popover>
                <PopoverTrigger asChild>
                    <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-neutral-800 border-neutral-700 text-white"
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-neutral-900 border-neutral-700 rounded-xl">
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        if (selectedDate) {
                            setData('fecha_creacion', selectedDate.toISOString());
                        } else {
                            setData('fecha_creacion', ''); 
                        }
                    }}
                    captionLayout="dropdown" 
                    />
                </PopoverContent>
                </Popover>
            </div>

            <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea
                placeholder="Describe la obra o imagen..." 
                value={data.descripcion} onChange={(e)=> setData('descripcion', e.target.value)}
                className="bg-neutral-800 border-neutral-700 text-white"
                />
            </div>

            <div className="space-y-3">
                <Label>Imagen</Label>
                <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-neutral-700 rounded-2xl cursor-pointer bg-neutral-800/60 hover:bg-neutral-700/60 transition"
                >
                    {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                    ) : (
                    <div className="flex flex-col items-center justify-center text-neutral-400">
                        <ImageIcon className="h-8 w-8 mb-2" />
                        <p>Haz clic para subir una imagen</p>
                    </div>
                    )}
                    <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    />
                </label>
                </div>
            </div>
            </CardContent>

            <CardFooter className="flex justify-end">
            <Button
                type="submit"
                className="m-4"
            >
                <Upload className="mr-2 h-4 w-4" /> Guardar obra
            </Button>
            </CardFooter>
        </Card>
        </div>
    </form>
    </AppLayout>
  )
}
