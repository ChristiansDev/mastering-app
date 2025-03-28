import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { DataAudio } from '@/utils';
import MediaThemeSutroAudio from 'player.style/sutro-audio/react';
import { useStore } from "@/stores";

export default function AudiosList() {
    const { audios } = useStore()

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {audios.map((product: DataAudio) => (
                    <div key={product.id} className="group relative">
                        <Tabs defaultValue="mastered" className="w-auto">
                            <TabsList>
                                <TabsTrigger value="mastered">Mastered</TabsTrigger>
                                <TabsTrigger value="no-mastered">No mastered</TabsTrigger>
                            </TabsList>
                            <TabsContent value="mastered">
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
                            </TabsContent>
                            <TabsContent value="no-mastered">
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
                            </TabsContent>
                        </Tabs>
                    </div>
                ))}
            </div>
        </div>
    )
}