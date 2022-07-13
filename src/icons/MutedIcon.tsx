import React from 'react';
import {IconType} from "../types/IconTypes";

export default function MutedIcon(props: IconType){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 ${props.className}`} fill="none" viewBox="0 0 24 24"
             stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  clipRule="evenodd"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
        </svg>
    );
}
