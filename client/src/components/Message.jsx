import React, { useState } from 'react';

const Message = ({ message, isFavorite, onPin, onToggleFavorite }) => {
    const [showActions, setShowActions] = useState(false);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const renderContent = () => {
        switch (message.type) {
            case 'text':
                return renderText(message.content);
            case 'file':
                return renderFile(message.content);
            default:
                return <div>{message.content}</div>;
        }
    };

    const renderText = (content) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = content.split(urlRegex);

        return parts.map((part, index) => {
            if (part && part.match(urlRegex)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="message-link"
                    >
                        {part}
                    </a>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    const renderFile = (fileData) => {
        const { filename, path: filePath, mimetype, size } = fileData;
        const fileSize = (size / 1024).toFixed(2);
        const baseUrl = 'http://localhost:3000';

        if (mimetype && mimetype.startsWith('image/')) {
            return (
                <div className="file-image">
                    <img src={`${baseUrl}${filePath}`} alt={filename} />
                    <div className="file-info">
                        <span>{filename} ({fileSize} KB)</span>
                        <a href={`${baseUrl}${filePath}`} download>Скачать</a>
                    </div>
                </div>
            );
        } else if (mimetype && mimetype.startsWith('video/')) {
            return (
                <div className="file-video">
                    <video controls>
                        <source src={`${baseUrl}${filePath}`} type={mimetype} />
                    </video>
                    <div className="file-info">
                        <span>{filename} ({fileSize} KB)</span>
                        <a href={`${baseUrl}${filePath}`} download>Скачать</a>
                    </div>
                </div>
            );
        } else if (mimetype && mimetype.startsWith('audio/')) {
            return (
                <div className="file-audio">
                    <audio controls>
                        <source src={`${baseUrl}${filePath}`} type={mimetype} />
                    </audio>
                    <div className="file-info">
                        <span>{filename} ({fileSize} KB)</span>
                        <a href={`${baseUrl}${filePath}`} download>Скачать</a>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="file-other">
                    <span>📎 {filename} ({fileSize} KB)</span>
                    <a href={`${baseUrl}${filePath}`} download>Скачать</a>
                </div>
            );
        }
    };

    return (
        <div
            className={`message ${message.type === 'file' ? 'message-file' : ''}`}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <div className="message-header">
                <span className="message-author">{message.author || 'User'}</span>
                <span className="message-time">
                    {formatTime(message.timestamp)}
                </span>
                <span className="message-date">
                    {formatDate(message.timestamp)}
                </span>
            </div>

            <div className="message-content">
                {renderContent()}
            </div>

            {showActions && (
                <div className="message-actions">
                    <button onClick={onPin} title="Закрепить">📌</button>
                    <button onClick={onToggleFavorite} title="В избранное">
                        {isFavorite ? '⭐' : '☆'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Message;