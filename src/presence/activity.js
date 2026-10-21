function createActivity(options = {}) {
    const {
        details = 'Desenvolvendo com PresenceJS',
        state = 'Aprendendo JavaScript',
        startTimestamp = Date.now()
    } = options;

    return {
        details,
        state,
        startTimestamp
    };
};

module.exports = {
    createActivity
};