import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';

const FileUpload = ({ onFileUpload }) => {
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach(file => {
            onFileUpload(file);
        });
    }, [onFileUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true
    });

    return (
        <div className="file-upload" {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={`drop-zone ${isDragActive ? 'active' : ''}`}>
                {isDragActive ? (
                    <p>Отпустите файлы здесь...</p>
                ) : (
                    <p>📎 Перетащите файлы или кликните</p>
                )}
            </div>
        </div>
    );
};

export default FileUpload;