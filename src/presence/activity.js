function createActivity(options = {}) {
    const {
        details = 'Desenvolvendo com Presence-js',
        state = 'Aprendendo JavaScript',
        startTimestamp = Date.now()
    } = options;
    
    if (typeof details !== 'string' || details.trim() === '') {
        throw new TypeError('[Presence-js] details must be a non-empty string');
    };

    if (typeof state !== 'string' || state.trim() === '') {
        throw new TypeError('[Presence-js] state must be a non-empty string');
    };

    if (!Number.isFinite(startTimestamp) || startTimestamp <= 0) {
        throw new TypeError('[Presence-js] startTimestamp must be a positive number');
    };

    return {
        details,
        state,
        startTimestamp
    };
};

module.exports = {
    createActivity
};