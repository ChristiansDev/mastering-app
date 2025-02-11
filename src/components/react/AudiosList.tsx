import { type Audio } from '../../utils/interfaces/audio';
import MediaThemeSutroAudio from 'player.style/sutro-audio/react';

export default function AudiosList() {
    const audios: Audio[] = JSON.parse(window.localStorage.getItem('audios') || '[]')
    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {audios.map((product: Audio) => (
                    <div key={product.id} className="group relative">
                        <MediaThemeSutroAudio
                            style={{ "--media-primary-color": "#dedede", "--media-secondary-color": "#ef8d2f", "--media-accent-color": "#231816" } as React.CSSProperties}
                        >
                            <audio
                                slot="media"
                                src="https://stream.mux.com/fXNzVtmtWuyz00xnSrJg4OJH6PyNo6D02UzmgeKGkP5YQ/low.mp4"
                                playsInline
                                crossOrigin="anonymous"
                            ></audio>
                        </MediaThemeSutroAudio>
                    </div>
                ))}
            </div>
        </div>
    )
}