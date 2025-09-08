import { createRoot } from 'react-dom/client';
import { store } from 'renderer/store';
import { Provider } from 'react-redux';
import App from './App';
import 'renderer/index.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// calling IPC exposed from preload script
window.electron?.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log('get ipc ping res')
  console.log(arg);
});
window.electron?.ipcRenderer.sendMessage('ipc-example', ['ping']);
