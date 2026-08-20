import React from 'react';
import Button from '../../atoms/Button/Button';
import './PinnedMessage.css';

const PinnedMessage = ({ message, onUnpin }) => {
    if (!message) return null;

    return (
        <div className="pinned-message">
            <div className="pinned-content">
                <span className="pin-icon">📌</span>
                <span className="pinned-text">
                    {message.type === 'text' ? message.content : '📎 Файл'}
                </span>
                <Button variant="ghost" onClick={onUnpin} title="Открепить">
                    ✕
                </Button>
            </div>
        </div>
    );
};

export default PinnedMessage;