import { errorToastConfig, successToastConfig } from "@/config"
import { appClipData } from "@/services"
import toast from "react-hot-toast"
import { animationRippleEffect } from "./animator"

function copyTextFromClipboard(addClip: (clip: IClip)=> void) {
    navigator.clipboard.readText()
        .then(text => {
            if (text) {
                appClipData(text, addClip)
            } else {
                toast("No text found in clipboard", errorToastConfig)
            }
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err)
        })
}

async function copyClipData (e: React.MouseEvent<HTMLDivElement>, content: string) {
  
  animationRippleEffect(e);

  await navigator.clipboard.writeText(content);
  toast.success("Copied to clipboard!", successToastConfig)

};

async function handlePaste(event: KeyboardEvent, addClip: (data: IClip) => void) {
    if (event.ctrlKey && event.key === 'v') {
        event.preventDefault()
        const clipboardData = await navigator.clipboard.readText()
        if (clipboardData) {
            appClipData(clipboardData, addClip)
        }
        else {
            toast.error("No text found in clipboard", errorToastConfig)
        }
    }
}

function swtichClipView(view: ClipView, setClipView: (view: ClipView) => void, router: any) {
    if(view === "timeline") {
        view = "pin"
    }
    else {
        view = "timeline"
    }
    toast.success(`Switched to ${view} view`, successToastConfig)
    setClipView(view)
    // timeline view is the default view, pin view is /boar/pin
    if(view === "pin") {
        router.push("/board/pin")
    }
    else {
        router.push("/board")
    }
}

export { copyTextFromClipboard, copyClipData, handlePaste, swtichClipView }