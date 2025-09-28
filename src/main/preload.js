const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message) => ipcRenderer.send('message', message)
})
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
    removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
  }
})

contextBridge.exposeInMainWorld('electronCREATED', {
  onWindowCreated: (callback) => {
    ipcRenderer.on('window-created', (event, data) => callback(data));
  },
  sendReply: (data) => {
    ipcRenderer.send('window-created-reply', data);
  },
  onRefreshMeetingList: (callback) => {
    ipcRenderer.on('refresh-meeting-list', (event, data) => callback(data));
  }
})