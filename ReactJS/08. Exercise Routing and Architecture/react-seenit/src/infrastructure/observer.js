let subscriptions = {
    'loginUser': [],
    'notification':[]
}

export default {
    events: {
        loginUser: 'loginUser',
        notification:'notification'
    },
    subscribe: (eventname, fn) => subscriptions[eventname].push(fn),
    trigger: (eventName, data) => subscriptions[eventName].forEach(fn => fn(data))
}