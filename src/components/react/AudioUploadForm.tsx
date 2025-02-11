// src/components/AudioUploadForm.tsx

import { type ChangeEvent, type FormEvent, useState } from "react";
import {
    getAudios,
    uploadAudio,
} from "../../utils/aimastering";

import { type Audio } from '../../utils/interfaces/audio';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function AudioUploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        setError(null);

        try {
            // Step 1: Upload the audio file
            await uploadAudio(file);
            await getAudios().then((data: Audio[]) => {
                window.localStorage.setItem('audios', JSON.stringify(data));
            });

        } catch (err) {
            setError("An error occurred while processing the audio.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="grid w-full sm:w-full md:w-8/12 mx-auto mt-10 items-center gap-1.5">
            <form onSubmit={handleSubmit}>
                <Label htmlFor="picture">Upload audio</Label>
                <Input id="picture" type="file" accept="audio/wav, audio/mp3, audio/mp4"/>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
        </div>
    );
}