const { contextBridge, ipcRenderer } = require('electron');


//  On expose proprement les fonctions dans window.electronAPI
contextBridge.exposeInMainWorld('electronAPI', {
  sendFragment: (fragment) => ipcRenderer.send('add-fragment', fragment),
  getFragments: () => ipcRenderer.invoke('get-fragments'),
  deleteFragment: (id) => ipcRenderer.send('delete-fragment', id),
  editFragment: (fragment) => ipcRenderer.send('edit-fragment', fragment),
// Ajout pour les tags :
editTag: (oldName, newName) => ipcRenderer.send('edit-tag', { oldName, newName }),
deleteTag: (name) => ipcRenderer.send('delete-tag', name),
importFragments: (fragments) => ipcRenderer.send('import-fragments', fragments),
});





// Juste pour verifier que preload marche
console.log(' preload.js chargé et exécuté');
