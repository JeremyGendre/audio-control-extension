import ChevronRight from "../icons/ChevronRight";
import {truncateString} from "../utils/functions";
import React from "react";

interface TabRowProps{
    tab: chrome.tabs.Tab;
    isOpened?: boolean;
    onClick?: () => void
}

export default function TabRow({tab, isOpened = false, onClick = () => {}}: TabRowProps){
    return (
        <div className={``}>
            <div title={tab.title}
                 className="flex flex-wrap select-none hover:bg-slate-200 transition duration-150 cursor-default p-2"
                 onClick={onClick}
            >
                <ChevronRight className={`my-auto mr-1 transition duration-150 ${isOpened ? 'rotate-90' : ''}`}/>
                <div className="my-auto">{truncateString(tab.title)}</div>
            </div>
            {isOpened && <div>content</div>}
        </div>
    );
}
