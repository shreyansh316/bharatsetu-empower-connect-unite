import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

// Register the PWA Service Worker for offline asset caching
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content available, please refresh.');
  },
  onOfflineReady() {
    console.log('BharatSetu is now ready to work completely offline.');
  },
});

createRoot(document.getElementById("root")!).render(<App />);
