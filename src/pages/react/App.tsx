import React, { useEffect } from 'react';

import fetchApiKey from '../../utils/generateApiKey';
import { getAudios } from '../../utils/aimastering';
import { type Audio } from '../../utils/interfaces/audio';

interface LayoutProps {
    children: React.ReactNode;
}


const App: React.FC<LayoutProps> = ({ children }) => {
    const apiKey = window.localStorage.getItem('apiKey') || "";
    useEffect(() => {
        if (!apiKey) {
            fetchApiKey().then((data: string | null) => {
                if (data) {
                    window.localStorage.setItem('apiKey', data);
                    getAudios().then((data: Audio[]) => {
                        window.localStorage.setItem('audios', JSON.stringify(data));
                    }); 
                }
            }).catch((e: Error) => {
                console.log('Un error ha ocurrido:' + e)
            })
        } else {
            getAudios().then((data: Audio[]) => {
                window.localStorage.setItem('audios', JSON.stringify(data));
            });  
        }
    }, []);

    return (
        <>{children}</>
    );
};

export default App;