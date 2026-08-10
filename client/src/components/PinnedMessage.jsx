import React from 'react';

const PinnedMessage = ({ message, onUnpin }) => {
    return (
        <div className="pinned-message">
            <div className="pinned-content">
                <span className="pin-icon">📌</span>
                <span className="pinned-text">
                    {message.type === 'text' ? message.content : '📎 Файл'}
                </span>
                <button onClick={onUnpin} className="unpin-button">✕</button>
            </div>
        </div>
    );
};

export default PinnedMessage;