import React, { useState, useRef } from 'react';
import './MessageInput.css';

const MessageInput = ({ onSendMessage, onBotCommand }) => {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        if (message.startsWith('@chaos:')) {
            const command = message.replace('@chaos:', '').trim();
            onBotCommand(command);
        } else {
            onSendMessage(message);
        }

        setMessage('');
        setShowEmojiPicker(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Популярные эмодзи
    const emojis = [
        { emoji: '😊', name: 'Улыбка' },
        { emoji: '😂', name: 'Смех' },
        { emoji: '❤️', name: 'Любовь' },
        { emoji: '👍', name: 'Одобрение' },
        { emoji: '🔥', name: 'Огонь' },
        { emoji: '🎉', name: 'Праздник' },
        { emoji: '💪', name: 'Сила' },
        { emoji: '🙏', name: 'Спасибо' },
        { emoji: '😍', name: 'Влюбленность' },
        { emoji: '🤔', name: 'Размышление' },
        { emoji: '🥳', name: 'Веселье' },
        { emoji: '😎', name: 'Круто' },
        { emoji: '🤗', name: 'Объятие' },
        { emoji: '✨', name: 'Блеск' },
        { emoji: '💯', name: '100%' },
        { emoji: '🎯', name: 'Цель' }
    ];

    const addEmoji = (emoji) => {
        setMessage(prev => prev + emoji);
        inputRef.current.focus();
        setShowEmojiPicker(false);
    };

    return (
        <div className="message-input-wrapper">
            <form className="message-input" onSubmit={handleSubmit}>
                <button
                    type="button"
                    className="emoji-toggle-btn"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    title="Выбрать эмодзи"
                >
                    😊
                </button>

                <textarea
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Введите сообщение или @chaos: команда..."
                    rows="1"
                />

                <button type="submit" className="send-button">
                    ➤
                </button>
            </form>

            {showEmojiPicker && (
                <div className="emoji-picker-popup">
                    <div className="emoji-grid">
                        {emojis.map(({ emoji, name }) => (
                            <button
                                key={emoji}
                                className="emoji-item"
                                onClick={() => addEmoji(emoji)}
                                title={name}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageInput;