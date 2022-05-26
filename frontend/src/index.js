import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ARContextProvider } from './context/ARContext';
import { OutputWaveContextProvider } from './context/OutputWaveContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ARContextProvider>
            <OutputWaveContextProvider>
                <App />
            </OutputWaveContextProvider>
        </ARContextProvider>
    </React.StrictMode>
);
