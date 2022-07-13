import React, {useEffect, useState} from "react";
import 'chrome-extension-async'
import TabRow from "./TabRow";
import {Message} from "../eventPage";

export default function Popup() {
    const [tabs, setTabs] = useState([]);
    const [openedTab, setOpenedtab] = useState<chrome.tabs.Tab|null>(null);

    useEffect(() => {
        chrome.tabs.query({}, setTabs);
    }, []);

    return (
        <div className="p-2 w-64">
            {tabs.map(tab => (
                <TabRow
                    key={tab.id}
                    tab={tab}
                    isOpened={openedTab && tab.id === openedTab.id}
                    onClick={() => {
                        if(openedTab && openedTab.id === tab.id) {
                            setOpenedtab(null);
                            return;
                        }
                        setOpenedtab(tab);
                    }}
                />
            ))}
        </div>
    );
}

export async function getActiveTabId () {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return activeTab.id;
}

export async function getTabVolume(tabId: number){
    const message: Message = { name: 'get-volume', tabId };
    return chrome.tabs.sendMessage(tabId, message);
}

export async function setActiveTabVolume (tabId: number, value: number) {
    const message: Message = { name: 'set-volume', tabId, value };
    return chrome.tabs.sendMessage(tabId, message);
}


