export const convertToMins = (duration: number) :string => {
    var minutes: number  = Math.floor(duration / 60000);
    var seconds: number  = ((duration % 60000) / 1000);
    return minutes + ":" + (seconds < 10 ? '0' : '') + Math.floor(seconds);
}

export const trimString = (value: string, numOfChars: number): string => {
    if (value.length > numOfChars) {
        return value.substring(0,numOfChars) + "...";
    }
    return value;
}
