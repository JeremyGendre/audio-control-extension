import React, {useEffect, useState} from "react";
import {truncateString} from "../utils/functions";
import ChevronRight from "../icons/ChevronRight";
import TabRow from "./TabRow";

export default function Popup() {
    const [tabs, setTabs] = useState([]);
    const [openedTab, setOpenedtab] = useState<chrome.tabs.Tab|null>(null);

    useEffect(() => {
        chrome.runtime.sendMessage({ popupMounted: true });
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
