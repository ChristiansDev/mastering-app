import React, { useEffect } from 'react';

import { useStore } from '@/stores';

interface LayoutProps {
    children: React.ReactNode;
}

const App: React.FC<LayoutProps> = ({ children }) => {
    const { loadAudios } = useStore()
    
    useEffect(() => {
        loadAudios() 
    }, []);

    return (
        <>{children}</>
    );
};

export default App;