import fetchApiKey from "@/services/generateApiKey";
import { useEffect, type FC } from "react";

interface LayoutProps {
    children: React.ReactNode;
}

export const Providers: FC<LayoutProps> = ({ children }) => {
    const apiKey = window.localStorage.getItem('apiKey') || "";
    useEffect(() => {
        if (!apiKey) {
            fetchApiKey().then((data: string | null) => {
                if (data) {
                    window.localStorage.setItem('apiKey', data);
                    
                }
            }).catch((e: Error) => {
                console.log('Un error ha ocurrido:' + e)
            })
        }
    }, []);

    return (
        <>{children}</>
    );
}