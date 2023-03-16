function utils() {
    const limitString = (text: string, limit: number, open: boolean): string => {
        return open ? text : text.length > limit ? ((text.substring(0, limit - 3)) + "...") : text;
    };
    
    return {
        limitString,
    }
}

export default utils