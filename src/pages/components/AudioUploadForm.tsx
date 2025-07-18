import { type ChangeEvent, useState } from "react";
import { AUDIO_SCHEMA } from "@/utils/schemas/zod";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { uploadAudio } from "@/services";
import { useStore } from "@/stores";

export default function AudioUploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const { toast } = useToast()
    const { setAudio } = useStore()

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFile(file);

            // Crear un objeto de audio para obtener la duración
            const audioElement = document.createElement("audio");
            audioElement.src = URL.createObjectURL(file);

            // Calcular la duración cuando el archivo esté cargado
            audioElement.addEventListener("loadedmetadata", () => {
                const durationInSeconds = audioElement.duration;
                form.setValue("duration", durationInSeconds); // Establece la duración en el form
            });
        }
    };

    const handleFileSubmit: SubmitHandler<z.infer<typeof AUDIO_SCHEMA>> = async (data) => {
        if (!file) return;
        setUploading(true);

        await uploadAudio(file)
            .then((data) => {
                setAudio(data)
                toast({
                    title: "Audio is mastering now!",
                    description: "Wait for status available for get download!",
                })
            }).catch(() => {
                toast({
                    title: "Error",
                    description: "",
                })
            }).finally(() => {
                setUploading(false);
            })
    };

    const form = useForm<z.infer<typeof AUDIO_SCHEMA>>({
        resolver: zodResolver(AUDIO_SCHEMA),
        defaultValues: {
            audio: undefined,
            duration: 0
        }
    })

    return (
        <>
            <div className="grid w-full md:w-8/12 mx-auto mt-10 items-center gap-1.5">
                {/* <form onSubmit={handleFileSubmit}>
                    <Label htmlFor="picture">Upload audio</Label>
                    <div className="flex w-full items-center space-x-2">
                        <Input id="picture" type="file" accept="audio/wav, audio/mp3, audio/mp4" onChange={handleFileChange} />
                        <Button type="submit" disabled={uploading || !file}>
                            {uploading ? <><Loader2 className="animate-spin" /> uploading</> : 'submit'}
                        </Button>
                    </div>
                </form> */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFileSubmit)}>
                        <FormField
                            control={form.control}
                            name="audio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="audio">Upload audio</FormLabel>
                                    <div className="flex w-full items-center space-x-2">
                                        <FormControl>
                                            <Input
                                                disabled={uploading}
                                                id="audio"
                                                type="file"
                                                accept="audio/wav, audio/mp3, video/mp4"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        handleFileChange(e);
                                                        field.onChange(e.target.files[0]);
                                                    } else {
                                                        setFile(null)
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <Button type="submit" disabled={uploading || !form.formState.isValid}>
                                            {uploading ? (
                                                <>
                                                    <Loader2 className="animate-spin" /> uploading
                                                </>
                                            ) : (
                                                "submit"
                                            )}
                                        </Button>
                                    </div>
                                    <FormDescription>Select your file then submit.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </>
    );
}

