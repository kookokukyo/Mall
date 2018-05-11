import storage from 'good-storage'

export function loadData(n) {
  let m = storage.get(n, {})
  return m
}

export function saveData(r, n) {
  let dataOld = storage.get(n, {})
  let dataNew = Object.assign(dataOld, r)
  storage.set(n, dataNew)
  return dataNew
}