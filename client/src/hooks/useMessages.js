import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useMessages = () => {
    const [messages, setMessages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadMessages = async (offset = 0) => {
        try {
            setLoading(true);
            const result = await api.getMessages(10, offset);
            if (offset === 0) {
                setMessages(result.messages.reverse());
            } else {
                setMessages(prev => [...result.messages.reverse(), ...prev]);
            }
            setHasMore(result.hasMore);
        } catch (error) {
            console.error('Failed to load messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreMessages = () => {
        if (hasMore && !loading) {
            loadMessages(messages.length);
        }
    };

    const sendMessage = async (content, type = 'text') => {
        try {
            await api.sendMessage(content, type);
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const sendFile = async (file) => {
        try {
            await api.uploadFile(file);
        } catch (error) {
            console.error('Failed to upload file:', error);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    return {
        messages,
        setMessages,
        hasMore,
        loading,
        loadMoreMessages,
        sendMessage,
        sendFile
    };
};