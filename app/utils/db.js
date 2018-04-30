// @flow
import type {FeedScheme} from '../types/podcast';

// VENDOR SPECIFIC INDEXEDDB IMPLEMENTATIONS
const indexedDB      = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
const IDBKeyRange    = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

function openDB() {
  return new Promise((resolve, reject) => {
    let req = indexedDB.open('phenopod', 1);
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(e.target.errorCode);
    req.onupgradeneeded = e => {
      let db = e.target.result;
      db.createObjectStore('feed', { keyPath: 'podcastId' });
    };
  });
}

function getValue(store, key) {
  return new Promise((resolve, reject) => {
    let req = store.get(key);
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(e.target.errorCode);
  });
}

function deleteValue(store, key) {
  return new Promise((resolve, reject) => {
    let req = store.delete(key);
    req.onsuccess = resolve;
    req.onerror   = reject;
  })
}

function updateValue(store, obj) {
  return new Promise((resolve, reject) => {
    let req = store.put(obj);
    req.onsuccess = resolve;
    req.onerror   = reject;
  });
}

export async function selectFeed(podcastId: number) {
  let db = await openDB();
  return await getValue(db.transaction(['feed']).objectStore('feed'), podcastId);
}

export async function deleteFeed(podcastId: number) {
  let db = await openDB();
  return await deleteValue(db.transaction(['feed'], 'readwrite').objectStore('feed'), podcastId);
}

export async function insertFeed(feed: FeedScheme) {
  let db = await openDB();
  return await updateValue(db.transaction(['feed'], 'readwrite').objectStore('feed'), feed);
}
