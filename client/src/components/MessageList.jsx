import React, { useRef, useEffect } from 'react';
import Message from './Message';
import './MessageList.css';

const MessageList = ({
    messages,
    favorites,
    onLoadMore,
    hasMore,
    onPinMessage,
    onToggleFavorite,
    loading
}) => {
    const listRef = useRef(null);
    const prevScrollHeight = useRef(0);

    useEffect(() => {
        if (listRef.current) {
            const { scrollHeight, scrollTop } = listRef.current;
            if (scrollHeight > prevScrollHeight.current) {
                listRef.current.scrollTop = scrollHeight - prevScrollHeight.current;
            }
            prevScrollHeight.current = scrollHeight;
        }
    }, [messages]);

    const handleScroll = (e) => {
        const { scrollTop } = e.target;
        if (scrollTop === 0 && hasMore && !loading) {
            const scrollHeight = e.target.scrollHeight;
            prevScrollHeight.current = scrollHeight;
            onLoadMore();
        }
    };

    const isFavorite = (messageId) => {
        return favorites.some(m => m.id === messageId);
    };

    return (
        <div
            className="message-list"
            ref={listRef}
            onScroll={handleScroll}
        >
            {loading && <div className="loading-indicator">Загрузка...</div>}
            {messages.map((message, index) => (
                <Message
                    key={message.id || index}
                    message={message}
                    isFavorite={isFavorite(message.id)}
                    onPin={() => onPinMessage(message.id)}
                    onToggleFavorite={() => onToggleFavorite(message.id)}
                />
            ))}
            {messages.length === 0 && !loading && (
                <div className="empty-state">
                    <p>Нет сообщений</p>
                </div>
            )}
        </div>
    );
};

export default MessageList;