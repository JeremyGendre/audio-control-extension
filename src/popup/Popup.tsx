import React, {useEffect, useState} from "react";
import TabContent from "./TabContent";
import {getTabVolume, Message, setTabVolume} from "../eventPage";
import 'chrome-extension-async'

export default function Popup() {
    //const [tabs, setTabs] = useState([]);
    //const [openedTab, setOpenedtab] = useState<chrome.tabs.Tab|null>(null);
    const [tabId, setTabId] = useState(undefined);
    const [volume, setVolume] = useState("100");

    useEffect(() => {
        //chrome.tabs.query({}, setTabs);
        const getVolume = async () => {
            const currentTabId = await getActiveTabId();
            const vol = ((await getTabVolume(currentTabId)) * 100).toString();
            setTabId(currentTabId);
            setVolume(vol);
        };

        getVolume();
    }, []);

    const handleVolumeChange = async (newVol) => {
        setVolume(newVol);
        await setTabVolume(tabId,parseInt(newVol) / 100);
    };

    return (
        <div className="p-2 w-64">
            {/*tabs.map(tab => (
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
            ))*/}
            <TabContent volume={volume} onChange={handleVolumeChange}/>
        </div>
    );
}

async function getActiveTabId () {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return activeTab.id;
}

