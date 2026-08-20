import React, { useState } from 'react';
import Button from '../../atoms/Button/Button';
import { formatTime, formatDate } from '../../../utils/dateFormatter';
import { renderFileContent } from '../../../utils/fileHelper';
import './MessageItem.css';

const MessageItem = ({ message, isFavorite, onPin, onToggleFavorite }) => {
    const [showActions, setShowActions] = useState(false);

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

    const renderContent = () => {
        switch (message.type) {
            case 'text':
                return renderText(message.content);
            case 'file':
                return renderFileContent(message.content);
            default:
                return <div>{message.content}</div>;
        }
    };

    return (
        <div
            className={`message-item ${message.type === 'file' ? 'message-file' : ''}`}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <div className="message-header">
                <span className="message-author">{message.author || 'User'}</span>
                <span className="message-time">{formatTime(message.timestamp)}</span>
                <span className="message-date">{formatDate(message.timestamp)}</span>
            </div>

            <div className="message-content">{renderContent()}</div>

            {showActions && (
                <div className="message-actions">
                    <Button variant="ghost" onClick={onPin} title="Закрепить">
                        📌
                    </Button>
                    <Button variant="ghost" onClick={onToggleFavorite} title="В избранное">
                        {isFavorite ? '⭐' : '☆'}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MessageItem;