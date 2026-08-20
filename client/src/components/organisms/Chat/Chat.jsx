import React from 'react';
import MessageList from '../MessageList/MessageList';
import ChatInput from '../ChatInput/ChatInput';
import FileDropzone from '../../molecules/FileDropzone/FileDropzone';
import PinnedMessage from '../../molecules/PinnedMessage/PinnedMessage';
import './Chat.css';

const Chat = ({
    messages,
    pinnedMessage,
    favorites,
    hasMore,
    loading,
    onLoadMore,
    onSendMessage,
    onSendFile,
    onPinMessage,
    onUnpinMessage,
    onToggleFavorite,
    onBotCommand
}) => {
    return (
        <div className="chat-container">
            {pinnedMessage && (
                <PinnedMessage message={pinnedMessage} onUnpin={onUnpinMessage} />
            )}

            <MessageList
                messages={messages}
                favorites={favorites}
                onLoadMore={onLoadMore}
                hasMore={hasMore}
                onPinMessage={onPinMessage}
                onToggleFavorite={onToggleFavorite}
                loading={loading}
            />

            <div className="chat-input-area">
                <FileDropzone onFileUpload={onSendFile} />
                <ChatInput
                    onSendMessage={onSendMessage}
                    onBotCommand={onBotCommand}
                />
            </div>
        </div>
    );
};

export default Chat;