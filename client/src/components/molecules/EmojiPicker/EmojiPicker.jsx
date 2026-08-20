import React from 'react';
import './EmojiPicker.css';

const EmojiPicker = ({ onSelectEmoji }) => {
    const emojis = [
        '😊', '😂', '❤️', '👍', '🔥', '🎉', '💪', '🙏',
        '😍', '🤔', '🥳', '😎', '🤗', '✨', '💯', '🎯'
    ];

    return (
        <div className="emoji-picker">
            <div className="emoji-grid">
                {emojis.map(emoji => (
                    <button
                        key={emoji}
                        className="emoji-item"
                        onClick={() => onSelectEmoji(emoji)}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EmojiPicker;