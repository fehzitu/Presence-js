function createActivity(options = {}) {
    const {
        details = 'Desenvolvendo com Presence-js',
        state = 'Aprendendo JavaScript',
        startTimestamp = Date.now(),
        largeImageKey,
        largeImageText,
        smallImageKey,
        smallImageText
    } = options;

    if (typeof details !== 'string' || details.trim() === '') {
        throw new TypeError(
            '[Presence-js] details must be a non-empty string'
        );
    }

    if (typeof state !== 'string' || state.trim() === '') {
        throw new TypeError(
            '[Presence-js] state must be a non-empty string'
        );
    }

    if (!Number.isFinite(startTimestamp) || startTimestamp <= 0) {
        throw new TypeError(
            '[Presence-js] startTimestamp must be a positive number'
        );
    }

    const activity = {
        details,
        state,
        startTimestamp
    };

    if (largeImageKey) activity.largeImageKey = largeImageKey;
    if (largeImageText) activity.largeImageText = largeImageText;
    if (smallImageKey) activity.smallImageKey = smallImageKey;
    if (smallImageText) activity.smallImageText = smallImageText;

    return activity;
}

module.exports = {
    createActivity
};