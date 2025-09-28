/**
 * Should match main/preload.js for typescript support in renderer
 */
export default interface ElectronApi {
  sendMessage: (message: string) => void
}

interface ElectronIpcRenderer {
  send: (channel: string, ...args: any[]) => void;
  on: (channel: string, listener: (...args: any[]) => void) => void;
  invoke: (channel: string, ...args: any[]) => Promise<any>;
  removeAllListeners: (channel: string) => void;
}

interface ElectronAPI {
  ipcRenderer: ElectronIpcRenderer;
}

interface ElectronCreated {
  onWindowCreated: (callback: (data: any) => void) => void;
  sendReply: (data: any) => void;
  onRefreshMeetingList: (callback: (data: any) => void) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronApi;
    electron: ElectronAPI;
    electronCREATED: ElectronCreated;
    sdk: any;
  }
}
