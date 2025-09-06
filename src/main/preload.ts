// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import os from 'os';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    async getCaptureImg(docWidth: any){
      const img = await ipcRenderer.invoke('captureScreen', docWidth);
      if (img === undefined) {
        return null;
      }
      const dataUrl = img.toDataURL();
      return dataUrl;
    },
    async getIpAddresses(){
      const nics = os.networkInterfaces();
      const addrObjArray = Object.values(nics).flat();
      return Promise.resolve(addrObjArray.map((addrObj) => addrObj.address));
    }

  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;



// import { contextBridge, ipcRenderer, BrowserWindow } from 'electron';

// window.getCaptureImg = async (docWidth) => {
//   const img = await ipcRenderer.invoke('captureScreen', docWidth);
//   if (img === undefined) {
//     return null;
//   }
//   const dataUrl = img.toDataURL();
//   return dataUrl;
// };

// window.openFileDialog = async (method, config) => {
//   return await ipcRenderer.invoke('dialog', method, config);
// };

// window.openDevTools = async () => {
//   return ipcRenderer.invoke('openDevTools');
// };

// window.getAppVersion = async () => {
//   return ipcRenderer.invoke('getAppVersion');
// };
