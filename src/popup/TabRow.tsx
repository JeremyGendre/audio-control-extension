import ChevronRight from "../icons/ChevronRight";
import {truncateString} from "../utils/functions";
import React, {useEffect, useState} from "react";
import TabContent from "./TabContent";
import {getTabVolume, setTabVolume} from "../eventPage";

interface TabRowProps{
    tab: chrome.tabs.Tab;
    isOpened?: boolean;
    onClick?: () => void
}

export default function TabRow({tab, isOpened = false, onClick = () => {}}: TabRowProps){
    //const [tabId, setTabId] = useState(undefined);
    const [volume, setVolume] = useState("100");

    useEffect(() => {
        const getVolume = async () => {
            //const currentTabId = await getActiveTabId();
            const vol = ((await getTabVolume(tab.id)) * 100).toString();
            setVolume(vol);
        };

        getVolume();
    }, [tab]);

    const handleVolumeChange = async (newVol) => {
        setVolume(newVol);
        await setTabVolume(tab.id,parseInt(newVol) / 100);
    };

    return (
        <div className={`border border-transparent hover:border-slate-200 transition duration-150`}>
            <div title={tab.title ?? tab.id.toString()}
                 className="flex flex-wrap justify-between select-none hover:bg-slate-200 transition duration-150 cursor-pointer p-2"
                 onClick={onClick}
            >
                <div className="flex flex-wrap">
                    <ChevronRight className={`my-auto mr-1 transition duration-150 ${isOpened ? 'rotate-90' : ''}`}/>
                    <div className="my-auto">{truncateString(tab.title ?? tab.id.toString())}</div>
                </div>
                {(parseInt(volume) < 100) && <div>{volume}%</div>}
            </div>
            {isOpened && <TabContent volume={volume} onChange={handleVolumeChange}/>}
        </div>
    );
}
