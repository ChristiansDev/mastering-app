import { useEffect, useState } from 'react';
import { type Audio } from '../utils/interfaces/audio';
import MediaThemeSutroAudio from 'player.style/sutro-audio/react';

export default function AudiosList() {
    const [audios, setAudios] = useState<Audio[]>([])
    const storedAudios = window.localStorage.getItem('audios');
    const gettingAudios: Audio[] = storedAudios ? JSON.parse(storedAudios) : [];

    useEffect(() => {
        if (gettingAudios.length > 0) {
            setAudios(gettingAudios)
        }
    }, [])

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {audios.map((product: Audio) => (
                    <div key={product.id} className="group relative">
                        <MediaThemeSutroAudio
                            style={{ "--media-primary-color": "#f4f6f4", "--media-secondary-color": "#252525" }}
                        >
                            <video
                                slot="media"
                                src="https://stream.mux.com/fXNzVtmtWuyz00xnSrJg4OJH6PyNo6D02UzmgeKGkP5YQ/low.mp4"
                                playsInline
                                crossOrigin="anonymous"
                            ></video>
                        </MediaThemeSutroAudio>
                    </div>
                ))}
            </div>
        </div>
    )
}