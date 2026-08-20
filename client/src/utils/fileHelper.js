import React from 'react';

const getBaseUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:3000';
    }
    return 'https://loving-comfort-production-ee82.up.railway.app';
};

const BASE_URL = getBaseUrl();

export const renderFileContent = (fileData) => {
    const { filename, path, mimetype, size } = fileData;
    const fileSize = (size / 1024).toFixed(2);
    const fileUrl = `${BASE_URL}${path}`;

    if (mimetype?.startsWith('image/')) {
        return (
            <div className="file-image">
                <img src={fileUrl} alt={filename} />
                <div className="file-info">
                    <span>{filename} ({fileSize} KB)</span>
                    <a href={fileUrl} download>Скачать</a>
                </div>
            </div>
        );
    }

    if (mimetype?.startsWith('video/')) {
        return (
            <div className="file-video">
                <video controls>
                    <source src={fileUrl} type={mimetype} />
                </video>
                <div className="file-info">
                    <span>{filename} ({fileSize} KB)</span>
                    <a href={fileUrl} download>Скачать</a>
                </div>
            </div>
        );
    }

    if (mimetype?.startsWith('audio/')) {
        return (
            <div className="file-audio">
                <audio controls>
                    <source src={fileUrl} type={mimetype} />
                </audio>
                <div className="file-info">
                    <span>{filename} ({fileSize} KB)</span>
                    <a href={fileUrl} download>Скачать</a>
                </div>
            </div>
        );
    }

    return (
        <div className="file-other">
            <span>📎 {filename} ({fileSize} KB)</span>
            <a href={fileUrl} download>Скачать</a>
        </div>
    );
};