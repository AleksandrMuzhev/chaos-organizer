import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import FileUpload from './FileUpload';
import PinnedMessage from './PinnedMessage';
import SearchBar from './SearchBar';
import FavoritesList from './FavoritesList';
import { api, ws } from '../services/api';
import '../styles/App.css';

const App = () => {
    const [messages, setMessages] = useState([]);
    const [pinnedMessage, setPinnedMessage] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);
    const wsRef = useRef(null);

    useEffect(() => {
        loadMessages();
        loadPinnedMessage();
        loadFavorites();
        setupWebSocket();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    const setupWebSocket = () => {
        wsRef.current = ws.connect();
        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
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
        };
    };

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
            loadMessages(0);
            return;
        }
        try {
            const result = await api.searchMessages(query);
            setMessages(result.messages);
            setHasMore(false);
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
            <div className="app-header">
                <h1>Chaos Organizer</h1>
                <div className="header-actions">
                    <button
                        className="favorites-toggle"
                        onClick={() => setShowFavorites(!showFavorites)}
                    >
                        {showFavorites ? '📋 Все сообщения' : '⭐ Избранное'}
                    </button>
                </div>
            </div>

            <div className="app-body">
                <div className="sidebar">
                    <SearchBar onSearch={handleSearch} />
                    {showFavorites && (
                        <FavoritesList
                            favorites={favorites}
                            onSelectMessage={() => setShowFavorites(false)}
                        />
                    )}
                    <div className="bot-commands">
                        <h4>Команды бота:</h4>
                        <button onClick={() => handleBotCommand('погода')}>🌤️ Погода</button>
                        <button onClick={() => handleBotCommand('время')}>🕐 Время</button>
                        <button onClick={() => handleBotCommand('дата')}>📅 Дата</button>
                        <button onClick={() => handleBotCommand('привет')}>👋 Привет</button>
                        <button onClick={() => handleBotCommand('справка')}>ℹ️ Справка</button>
                    </div>
                </div>

                <div className="main-content">
                    {pinnedMessage && (
                        <PinnedMessage
                            message={pinnedMessage}
                            onUnpin={handleUnpinMessage}
                        />
                    )}

                    <MessageList
                        messages={messages}
                        favorites={favorites}
                        onLoadMore={loadMoreMessages}
                        hasMore={hasMore}
                        onPinMessage={handlePinMessage}
                        onToggleFavorite={handleToggleFavorite}
                        loading={loading}
                    />

                    <div className="input-area">
                        <FileUpload onFileUpload={sendFile} />
                        <MessageInput
                            onSendMessage={sendMessage}
                            onBotCommand={handleBotCommand}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;