function createTimer(timerState) {
    let totalSeconds = timerState.totalSeconds;
    let startedAt = null;
    
    if (!timerState || typeof timerState !== 'object') {
        throw new TypeError('A valid timer state is required.');
    };
    
    if (!Number.isFinite(timerState.totalSeconds) || timerState.totalSeconds < 0) {
        throw new Error('totalSeconds must be a non-negative number.');
    };
    
    function startTimer() {
        if (startedAt !== null) {
            return;
        };
    
        if (timerState.enabled === false) {
            return;
        };
    
        startedAt = Date.now();
    };
    
    function pauseTimer() {
        if (startedAt === null) {
            return;
        };
    
        totalSeconds += (Date.now() - startedAt) / 1000;
        startedAt = null;
    };
    
    function getElapsedTime() {
        if (startedAt === null) {
            return totalSeconds;
        };
    
        return totalSeconds + (Date.now() - startedAt) / 1000;
    };
    
    function resetTimer() {
        totalSeconds = 0;
    
        if (startedAt !== null) {
            startedAt = Date.now();
        };
    };
    
    function getState() {
        return {
            enabled: timerState.enabled !== false,
            mode: timerState.mode,
            totalSeconds: getElapsedTime(),
            running: startedAt !== null
        };
    };
    
    return {
        startTimer,
        pauseTimer,
        getElapsedTime,
        resetTimer,
        getState
    };
};

module.exports = {
    createTimer
};