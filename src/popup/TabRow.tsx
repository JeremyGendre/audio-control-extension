import ChevronRight from "../icons/ChevronRight";
import {truncateString} from "../utils/functions";
import React, {useEffect, useState} from "react";
import TabContent from "./TabContent";

interface TabRowProps{
    tab: chrome.tabs.Tab;
    isOpened?: boolean;
    onClick?: () => void
}

export default function TabRow({tab, isOpened = false, onClick = () => {}}: TabRowProps){
    const [tabVolume, setTabVolume] = useState("100");

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
                <div>{tabVolume}%</div>
            </div>
            {isOpened && <TabContent volume={tabVolume} onChange={setTabVolume}/>}
        </div>
    );
}
