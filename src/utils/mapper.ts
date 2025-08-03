export const groupedData = (clips: IClip[]): IGroupedClips[] => {

    return clips.reduce((acc: IGroupedClips[], clip: IClip) => {
        const date = new Date(clip.created_at).toLocaleDateString();
        const existingGroup = acc.find((item) => item.date === date);
        if (existingGroup) {
            existingGroup.clips.push({ id: clip.id, content: clip.content, is_pin: clip.is_pin });
        } else {
            acc.push({ date: date, clips: [{ id: clip.id, content: clip.content, is_pin: clip.is_pin }] });
        }
        return acc;
    }, []);

}

export const pinnedData = (clips: IClip[]): IGroupedClips[] => {

    return groupedData(clips).map((group) => {
        return {
            date: group.date,
            clips: group.clips.filter((clip) => clip.is_pin)
        }
    }).filter((group) => group.clips.length > 0);

}
