export const getYouTubeEmbedUrl = (url: string) => {
    if (!url)
        return '';
    if (url.includes('/embed/'))
        return url;
    try {
        const parsed = new URL(url);
        const host = parsed.hostname.replace('www.', '');
        if (host === 'youtu.be') {
            const id = parsed.pathname.replace('/', '');
            return id ? `https://www.youtube.com/embed/${id}` : '';
        }
        if (host === 'youtube.com' || host === 'm.youtube.com') {
            const id = parsed.searchParams.get('v');
            return id ? `https://www.youtube.com/embed/${id}` : '';
        }
    }
    catch {
        return '';
    }
    return '';
};
export const isAudioUrl = (url: string) => {
    return /\.(mp3|wav|ogg|m4a|aac)(\?.*)?$/i.test(url);
};
