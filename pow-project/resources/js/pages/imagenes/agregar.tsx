import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { type BreadcrumbItem } from '@/types'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, Image as ImageIcon, Terminal } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale" 
import AppLayout from "@/layouts/app-layout"
import { useForm } from "@inertiajs/react"
import { Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Agregar Imagen', href: '/imagenes/agregar' },
]

export default function Agregar() {
  const { data, setData, post, processing, errors } = useForm({
    nombre: '',
    autor: '',
    fecha_creacion: '',
    descripcion: '',
    imagen: null as File | null,
  })

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [preview, setPreview] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/imagenes/guardar')
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setData('imagen', file)
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="min-h-screen w-full bg-background text-foreground p-8"
      >
        {Object.keys(errors).length > 0 && (
          <Alert className="mb-6">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Revisá los campos</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside">
                {Object.entries(errors).map(([key, message]) => (
                  <li key={key}>{message as string}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="max-w-3xl mx-auto">
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Detalles de la obra</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    placeholder="Ej: La noche estrellada"
                    value={data.nombre}
                    onChange={(e) => setData('nombre', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="autor">Autor</Label>
                  <Input
                    id="autor"
                    placeholder="Ej: Vincent van Gogh"
                    value={data.autor}
                    onChange={(e) => setData('autor', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fecha de creación</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate)
                        if (selectedDate) {
                          setData('fecha_creacion', selectedDate.toISOString())
                        } else {
                          setData('fecha_creacion', '')
                        }
                      }}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Describe la obra o imagen…"
                  value={data.descripcion}
                  onChange={(e) => setData('descripcion', e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="file-upload">Imagen</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl cursor-pointer
                               border-border bg-muted/50 hover:bg-accent/50 transition"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Vista previa"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <ImageIcon className="h-8 w-8 mb-2" />
                        <p>Hacé clic para subir una imagen</p>
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
              <Button type="submit" className="m-4" disabled={processing}>
                <Upload className="mr-2 h-4 w-4" />
                {processing ? 'Guardando…' : 'Guardar obra'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </AppLayout>
  )
}
