import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileDropzone.css';

const FileDropzone = ({ onFileUpload }) => {
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
        <div className="file-dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={`drop-zone ${isDragActive ? 'active' : ''}`}>
                {isDragActive ? (
                    <p>Отпустите файлы здесь...</p>
                ) : (
                    <p>📎 Перетащите или кликните</p>
                )}
            </div>
        </div>
    );
};

export default FileDropzone;