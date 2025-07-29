export const copyClipData = async (content: string) => {
    try {
        await navigator.clipboard.writeText(content)
    } 
    catch (error) {
        console.error('Failed to copy content:', error)
    }
}