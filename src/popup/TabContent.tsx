import React, {useEffect} from "react";

interface TabContentProps{
    volume: string
    onChange: (volume:string) => void
}

export default function TabContent({volume, onChange}:TabContentProps){

    useEffect(() => {
        chrome.tabCapture.capture({ audio: true, video: false },(t) => {
            console.log(t);
        });
        //console.log(chrome.tabCapture);
    },[]);

    return (
        <div className="w-full flex space-x-1 p-2">
            <input className="flex-1 my-auto" type="range" min="0" max="100" value={volume} onChange={e => onChange(e.currentTarget.value)}/>
            <div className="my-auto">{volume}%</div>
        </div>
    );
}
