import React, { useState, useRef } from 'react';
import Button from '../../atoms/Button/Button';
import EmojiPicker from '../../molecules/EmojiPicker/EmojiPicker';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, onBotCommand }) => {
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

    const addEmoji = (emoji) => {
        setMessage(prev => prev + emoji);
        inputRef.current.focus();
        setShowEmojiPicker(false);
    };

    return (
        <div className="chat-input-wrapper">
            <form className="chat-input" onSubmit={handleSubmit}>
                <Button
                    variant="ghost"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    title="Выбрать эмодзи"
                >
                    😊
                </Button>

                <textarea
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Введите сообщение или @chaos: команда..."
                    rows="1"
                />

                <Button type="submit" variant="primary">
                    ➤
                </Button>
            </form>

            {showEmojiPicker && (
                <div className="emoji-picker-popup">
                    <EmojiPicker onSelectEmoji={addEmoji} />
                </div>
            )}
        </div>
    );
};

export default ChatInput;