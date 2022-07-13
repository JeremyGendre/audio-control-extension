import 'chrome-extension-async';

interface CapturedTab {
    audioContext: AudioContext,
    streamSource: MediaStreamAudioSourceNode,
    gainNode: GainNode
}

export type Message = {
    name: 'get-volume'
    tabId: number
} | {
    name: 'set-volume'
    tabId: number
    value: number
}

chrome.runtime.onMessage.addListener(async (message: Message, sender, resolve) => {
    switch (message.name) {
        case 'get-volume':
            resolve (await getTabVolume(message.tabId));
            break;
        case 'set-volume':
            await setTabVolume(message.tabId, message.value);
            resolve(undefined);
            break;
        default:
            throw Error(`Unknown message received: ${message}`);
    }
});

// Clean everything up once the tab is closed
chrome.tabs.onRemoved.addListener(removeTab);

const tabs: { [tabId: number]: Promise<CapturedTab> } = {};

function captureTab (tabId: number) {
    tabs[tabId] = new Promise(async resolve => {
        /*const stream = await chrome.tabCapture.capture({
            audio: true,
            video: false
        });*/
        chrome.tabCapture.getMediaStreamId({targetTabId: tabId}, async (streamId) => {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    // @ts-ignore
                    mandatory: {
                        chromeMediaSource: 'tab',
                        chromeMediaSourceId: streamId,
                    }
                }
            });

            const audioContext = new AudioContext();
            const streamSource = audioContext.createMediaStreamSource(stream);
            const gainNode = audioContext.createGain();

            streamSource.connect(gainNode);
            gainNode.connect(audioContext.destination);

            resolve({ audioContext, streamSource, gainNode });
        });
    })
}

export async function getTabVolume (tabId: number) {
    return tabId in tabs ? (await tabs[tabId]).gainNode.gain.value : 1;
}

export async function setTabVolume (tabId: number, volume: number) {
    if (!(tabId in tabs)) {
        captureTab(tabId);
    }

    (await tabs[tabId]).gainNode.gain.value = volume;
    await updateBadge(tabId, volume);
}

/**
 * Updates the extension badge which display current volume.
 * @param tabId Tab ID
 * @param volume Volume. `1` will display 100, `0.5` - 50, etc
 */
async function updateBadge (tabId: number, volume: number) {
    if (tabId in tabs) {
        const text = (Math.round(volume * 100)).toString();
        await chrome.action.setBadgeText({ text, tabId });
    }
}

async function removeTab (tabId: number) {
    if (tabId in tabs) {
        await (await tabs[tabId]).audioContext.close();
        delete tabs[tabId];
    }
}
