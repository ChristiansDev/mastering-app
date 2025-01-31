// src/components/AudioUploadForm.tsx

import { type ChangeEvent, type FormEvent, useState } from "react";
import {
    downloadMasteredAudio,
    getDownloadToken,
    masterAudio,
    uploadAudio,
} from "../utils/aimastering";

// Define types for the mastering options
interface MasteringOptions {
    mode: string;
    mastering: boolean;
    preset: string;
    target_loudness: number;
}

export default function AudioUploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [masteredAudioId, setMasteredAudioId] = useState<number | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
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
            const inputAudioId = await uploadAudio(file);

            // Step 2: Master the audio
            const masteringOptions: MasteringOptions = {
                mode: "default",
                mastering: true,
                preset: "general",
                target_loudness: -5,
            };
            const masteringResponse = await masterAudio(inputAudioId, masteringOptions);
            setMasteredAudioId(masteringResponse.id);

            // Step 3: Generate a download token
            const downloadToken = await getDownloadToken(masteringResponse.id);

            // Step 4: Download the mastered audio
            const audioBlob = await downloadMasteredAudio(masteringResponse.id, downloadToken);
            const audioUrl = URL.createObjectURL(audioBlob);
            setDownloadUrl(audioUrl);
        } catch (err) {
            setError("An error occurred while processing the audio.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto mt-10">
            <div className="mb-4 w-full">
                <label htmlFor="audio-file" className="pl-1 block text-sm font-medium text-[#FF810F] mb-1">Upload Audio File</label>
                <div className="flex items-center space-x-2">
                    <input
                        name="audio-file"
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        className="flex-1 mt-1 block border border-[#BE5100] bg-[#241A17] border-opacity-50 text-[#FF810F] rounded-md shadow-sm p-2"
                    />
                    <button
                        type="submit"
                        disabled={uploading}
                        className="mt-1 bg-[#BE5100] border border-[#2C211E] text-gray-300 py-2 px-4 rounded-md hover:bg-opacity-95 disabled:bg-[#FFA03E] shadow-lg"
                    >
                        {uploading ? "Processing..." : "Upload and Master"}
                    </button>
                </div>
            </div>

            {downloadUrl && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Mastered Audio</h2>
                    <audio controls src={downloadUrl} className="mt-2 w-full"></audio>
                    <a
                        href={downloadUrl}
                        download="mastered_audio.wav"
                        className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Download Mastered Audio
                    </a>
                </div>
            )}

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
    );
}