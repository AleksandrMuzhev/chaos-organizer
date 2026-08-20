// Определяем базовый URL в зависимости от окружения
const getBaseUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:3000/api';
    }
    return 'https://loving-comfort-production-ee82.up.railway.app/api';
};

// Определяем WebSocket URL
const getWsUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'ws://localhost:8081';
    }
    return null; // В продакшене WebSocket не используется
};

const API_BASE = getBaseUrl();

export const api = {
    async getMessages(limit = 10, offset = 0) {
        const response = await fetch(
            `${API_BASE}/messages?limit=${limit}&offset=${offset}`
        );
        if (!response.ok) throw new Error('Failed to fetch messages');
        return response.json();
    },

    async sendMessage(content, type = 'text') {
        const response = await fetch(`${API_BASE}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, type })
        });
        if (!response.ok) throw new Error('Failed to send message');
        return response.json();
    },

    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error('Failed to upload file');
        return response.json();
    },

    async searchMessages(query) {
        const response = await fetch(
            `${API_BASE}/messages/search?q=${encodeURIComponent(query)}`
        );
        if (!response.ok) throw new Error('Failed to search messages');
        return response.json();
    },

    async pinMessage(messageId) {
        const response = await fetch(`${API_BASE}/messages/pin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageId })
        });
        if (!response.ok) throw new Error('Failed to pin message');
        return response.json();
    },

    async unpinMessage() {
        const response = await fetch(`${API_BASE}/messages/pin`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to unpin message');
        return response.json();
    },

    async getPinnedMessage() {
        const response = await fetch(`${API_BASE}/messages/pin`);
        if (!response.ok) throw new Error('Failed to get pinned message');
        return response.json();
    },

    async addFavorite(messageId) {
        const response = await fetch(`${API_BASE}/messages/favorite`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageId })
        });
        if (!response.ok) throw new Error('Failed to add favorite');
        return response.json();
    },

    async removeFavorite(messageId) {
        const response = await fetch(`${API_BASE}/messages/favorite`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageId })
        });
        if (!response.ok) throw new Error('Failed to remove favorite');
        return response.json();
    },

    async getFavorites() {
        const response = await fetch(`${API_BASE}/messages/favorites`);
        if (!response.ok) throw new Error('Failed to get favorites');
        return response.json();
    },

    async sendBotCommand(command) {
        const response = await fetch(`${API_BASE}/bot/command`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command })
        });
        if (!response.ok) throw new Error('Failed to send bot command');
        return response.json();
    }
};

export const ws = {
    connect() {
        const url = getWsUrl();
        if (!url) {
            // В продакшене возвращаем заглушку
            return {
                onmessage: null,
                close: () => {},
                send: () => {}
            };
        }
        return new WebSocket(url);
    }
};