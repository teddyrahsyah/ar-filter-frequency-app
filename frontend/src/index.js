import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ARContextProvider } from './context/ARContext';
import { OutputWaveContextProvider } from './context/OutputWaveContext';
import { PreviewObjectProvider } from './context/PreviewObject';
import { RecordScreenProvider } from './context/RecordScreenContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ARContextProvider>
        <PreviewObjectProvider>
            <OutputWaveContextProvider>
                <RecordScreenProvider>
                    <App />
                </RecordScreenProvider>
            </OutputWaveContextProvider>                
        </PreviewObjectProvider>
    </ARContextProvider>
);
