import React, { useState, useEffect } from 'react';
import Chat from '../../organisms/Chat/Chat';
import Sidebar from '../../organisms/Sidebar/Sidebar';
import { useMessages } from '../../../hooks/useMessages';
import { useWebSocket } from '../../../hooks/useWebSocket';
import { api } from '../../../services/api';
import './App.css';

const App = () => {
    const [pinnedMessage, setPinnedMessage] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);

    const {
        messages,
        setMessages,
        hasMore,
        loading,
        loadMoreMessages,
        sendMessage,
        sendFile
    } = useMessages();

    // WebSocket обработка
    useWebSocket((data) => {
        switch (data.type) {
            case 'new_message':
                setMessages(prev => [...prev, data.message]);
                break;
            case 'pin_changed':
                setPinnedMessage(data.message);
                break;
            case 'favorites_updated':
                setFavorites(data.favorites);
                break;
            default:
                break;
        }
    });

    useEffect(() => {
        loadPinnedMessage();
        loadFavorites();
    }, []);

    const loadPinnedMessage = async () => {
        try {
            const result = await api.getPinnedMessage();
            setPinnedMessage(result.pinned);
        } catch (error) {
            console.error('Failed to load pinned message:', error);
        }
    };

    const loadFavorites = async () => {
        try {
            const result = await api.getFavorites();
            setFavorites(result.favorites);
        } catch (error) {
            console.error('Failed to load favorites:', error);
        }
    };

    const handlePinMessage = async (messageId) => {
        try {
            await api.pinMessage(messageId);
        } catch (error) {
            console.error('Failed to pin message:', error);
        }
    };

    const handleUnpinMessage = async () => {
        try {
            await api.unpinMessage();
        } catch (error) {
            console.error('Failed to unpin message:', error);
        }
    };

    const handleToggleFavorite = async (messageId) => {
        try {
            const isFavorite = favorites.some(m => m.id === messageId);
            if (isFavorite) {
                await api.removeFavorite(messageId);
            } else {
                await api.addFavorite(messageId);
            }
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        }
    };

    const handleSearch = async (query) => {
        if (!query.trim()) {
            // Перезагружаем сообщения
            window.location.reload();
            return;
        }
        try {
            const result = await api.searchMessages(query);
            setMessages(result.messages);
        } catch (error) {
            console.error('Failed to search messages:', error);
        }
    };

    const handleBotCommand = async (command) => {
        try {
            await api.sendBotCommand(command);
        } catch (error) {
            console.error('Failed to send bot command:', error);
        }
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>Chaos Organizer</h1>
                <div className="header-actions">
                    <button
                        className="favorites-toggle"
                        onClick={() => setShowFavorites(!showFavorites)}
                    >
                        {showFavorites ? '📋 Все сообщения' : '⭐ Избранное'}
                    </button>
                </div>
            </header>

            <div className="app-body">
                <Sidebar
                    onSearch={handleSearch}
                    favorites={favorites}
                    showFavorites={showFavorites}
                    onSelectFavorite={() => setShowFavorites(false)}
                    onBotCommand={handleBotCommand}
                />

                <Chat
                    messages={messages}
                    pinnedMessage={pinnedMessage}
                    favorites={favorites}
                    hasMore={hasMore}
                    loading={loading}
                    onLoadMore={loadMoreMessages}
                    onSendMessage={sendMessage}
                    onSendFile={sendFile}
                    onPinMessage={handlePinMessage}
                    onUnpinMessage={handleUnpinMessage}
                    onToggleFavorite={handleToggleFavorite}
                    onBotCommand={handleBotCommand}
                />
            </div>
        </div>
    );
};

export default App;