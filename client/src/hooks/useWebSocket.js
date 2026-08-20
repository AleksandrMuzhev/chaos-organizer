import { useEffect, useRef } from 'react';
import { ws } from '../services/api';

export const useWebSocket = (onMessage) => {
    const wsRef = useRef(null);
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    useEffect(() => {
        if (isLocal) {
            wsRef.current = ws.connect();
            wsRef.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                onMessage(data);
            };
        }

        return () => {
            if (wsRef.current && isLocal) {
                wsRef.current.close();
            }
        };
    }, [onMessage, isLocal]);

    return wsRef.current;
};