import React from 'react';
import SearchBar from '../../molecules/SearchBar/SearchBar';
import FavoritesList from '../../molecules/FavoritesList/FavoritesList';
import './Sidebar.css';

const Sidebar = ({
    onSearch,
    favorites,
    showFavorites,
    onSelectFavorite,
    onBotCommand
}) => {
    const botCommands = [
        { cmd: 'погода', emoji: '🌤️', label: 'Погода' },
        { cmd: 'время', emoji: '🕐', label: 'Время' },
        { cmd: 'дата', emoji: '📅', label: 'Дата' },
        { cmd: 'привет', emoji: '👋', label: 'Привет' },
        { cmd: 'справка', emoji: 'ℹ️', label: 'Справка' }
    ];

    return (
        <div className="sidebar">
            <SearchBar onSearch={onSearch} />

            {showFavorites && (
                <FavoritesList
                    favorites={favorites}
                    onSelectMessage={onSelectFavorite}
                />
            )}

            <div className="bot-commands">
                <h4>Команды бота:</h4>
                {botCommands.map(({ cmd, emoji, label }) => (
                    <button
                        key={cmd}
                        onClick={() => onBotCommand(cmd)}
                    >
                        {emoji} {label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;