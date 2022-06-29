import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ARContextProvider } from './context/ARContext';
import { ModuleContextProvider } from './context/ModuleContext';
import { ArticleContextProvider } from './context/ArticleContext';
import { OutputWaveContextProvider } from './context/OutputWaveContext';
import { PreviewObjectProvider } from './context/PreviewObject';
import { TheoryContextProvider } from './context/TheoryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ARContextProvider>
        <PreviewObjectProvider>
            <OutputWaveContextProvider>
                <ModuleContextProvider>
                    <ArticleContextProvider>
                        <TheoryContextProvider>
                            <App />
                        </TheoryContextProvider>
                    </ArticleContextProvider>
                </ModuleContextProvider>
            </OutputWaveContextProvider>                
        </PreviewObjectProvider>
    </ARContextProvider>
);
