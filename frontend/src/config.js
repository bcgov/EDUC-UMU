const getConfig = (value, def) => {
    if(globalThis.umu_config) {
        return globalThis.umu_config || def;
    }
    return def;
}

const CONFIG = {
    DEBUG: {
        ENABLED: getConfig('debug.enabled', false)
    }
}

export default CONFIG;