import { useEffect, useRef } from 'react';
import { ws } from '../services/api';

export const useWebSocket = (onMessage) => {
    const wsRef = useRef(null);

    useEffect(() => {
        wsRef.current = ws.connect();
        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onMessage(data);
        };

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [onMessage]);

    return wsRef.current;
};