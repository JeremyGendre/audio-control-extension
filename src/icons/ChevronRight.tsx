import React from 'react';
import {IconType} from "../types/IconTypes";

export default function ChevronRight(props: IconType){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${props.className}`} fill="none" viewBox="0 0 24 24"
             stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
    );
}
