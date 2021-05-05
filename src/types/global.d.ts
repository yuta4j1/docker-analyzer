export {}
declare global {
  interface Window {
    dockerApi: {
      send: (channel: string, ...arg: any) => void
      receive: (
        channel: string,
        func: (event: any, ...arg: any) => void
      ) => void
      invoke: <T>(channel: string, ...args: any[]) => Promise<T>
      // https://github.com/frederiksen/angular-electron-boilerplate/blob/master/src/preload/preload.ts
      // https://www.electronjs.org/docs/all#ipcrenderersendtowebcontentsid-channel-args
      electronIpcSendTo: (
        window_id: string,
        channel: string,
        ...arg: any
      ) => void
      electronIpcSend: (channel: string, ...arg: any) => void
      electronIpcOn: (
        channel: string,
        listener: (event: any, ...arg: any) => void
      ) => void
      electronIpcSendSync: (channel: string, ...arg: any) => void
      electronIpcOnce: (
        channel: string,
        listener: (event: any, ...arg: any) => void
      ) => void
      electronIpcRemoveListener: (
        channel: string,
        listener: (event: any, ...arg: any) => void
      ) => void
      electronIpcRemoveAllListeners: (channel: string) => void
    }
  }
}
