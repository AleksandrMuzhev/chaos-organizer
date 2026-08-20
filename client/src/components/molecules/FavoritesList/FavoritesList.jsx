import React from 'react';
import './FavoritesList.css';

const FavoritesList = ({ favorites, onSelectMessage }) => {
    if (favorites.length === 0) {
        return <div className="favorites-empty">Нет избранных сообщений</div>;
    }

    return (
        <div className="favorites-list">
            <h3>⭐ Избранное</h3>
            {favorites.map(message => (
                <div
                    key={message.id}
                    className="favorite-item"
                    onClick={onSelectMessage}
                >
                    <div className="favorite-content">
                        {message.type === 'text' ? message.content : '📎 Файл'}
                    </div>
                    <div className="favorite-time">
                        {new Date(message.timestamp).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FavoritesList;