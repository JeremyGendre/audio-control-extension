import * as React from 'react';
import {createRoot} from 'react-dom/client';
import Popup from './Popup';
import './index.css';

chrome.tabs.query({ active: true, currentWindow: true }, tab => {
    createRoot(document.getElementById('popup')).render(<Popup />);
});
