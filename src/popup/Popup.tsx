import React, {useEffect, useState} from "react";
import TabRow from "./TabRow";
import TabContent from "./TabContent";

export default function Popup() {
    //const [tabs, setTabs] = useState([]);
    //const [openedTab, setOpenedtab] = useState<chrome.tabs.Tab|null>(null);
    const [tabVolume, setTabVolume] = useState("100");

    useEffect(() => {
        chrome.runtime.sendMessage({ popupMounted: true });
        //chrome.tabs.query({}, setTabs);
    }, []);

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
            <TabContent volume={tabVolume} onChange={setTabVolume}/>
        </div>
    );
}
