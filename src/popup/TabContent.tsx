import React, {Dispatch, SetStateAction} from "react";
import SoundIcon from "../icons/SoundIcon";
import MutedIcon from "../icons/MutedIcon";

interface TabContentProps{
    volume: string
    onChange: (volume:string) => void
    muted: boolean
    onMutedChange: Dispatch<SetStateAction<boolean>>
}

export default function TabContent({volume, onChange, muted, onMutedChange}:TabContentProps){
    return (
        <div className="w-full flex space-x-1 p-2">
            <div onClick={() => onMutedChange(prev => !prev)}
                className="my-auto cursor-pointer hover:bg-slate-200 p-1 rounded-full transition duration-150">
                {muted ? (<MutedIcon className="my-auto h-5 w-5"/>) : (<SoundIcon className="my-auto h-5 w-5"/>)}
            </div>
            <input className="flex-1 my-auto" type="range" min="0" max="100" value={volume} onChange={e => onChange(e.currentTarget.value)}/>
            <div className="my-auto hidden">{volume}%</div>
        </div>
    );
}
