
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Don't wrap App in StrictMode here since we're doing it in App.tsx
createRoot(document.getElementById("root")!).render(<App />);
