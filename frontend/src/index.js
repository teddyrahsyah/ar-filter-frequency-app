import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ARContextProvider } from './context/ARContext';
import { OutputWaveContextProvider } from './context/OutputWaveContext';
import { PreviewObjectProvider } from './context/PreviewObject';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ARContextProvider>
            <PreviewObjectProvider>
                <OutputWaveContextProvider>
                    <App />
                </OutputWaveContextProvider>                
            </PreviewObjectProvider>
        </ARContextProvider>
    </React.StrictMode>
);
