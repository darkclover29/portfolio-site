import { useState, useCallback } from 'react';
import { buildInitialVfs } from '../data/vfsData.js';

const STORAGE_KEY = 'harsh_portfolio_vfs';

function loadVfs() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const initial = buildInitialVfs();
      initial.children = JSON.parse(saved);
      return initial;
    }
  } catch {}
  return buildInitialVfs();
}

function saveVfs(root) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(root.children)); } catch {}
}

function getNode(root, pathArr) {
  let cur = root;
  for (const seg of pathArr) {
    if (cur.type !== 'dir' || !cur.children[seg]) return null;
    cur = cur.children[seg];
  }
  return cur;
}

function resolvePath(root, pathStr, currentPath) {
  if (!pathStr) return { node: getNode(root, currentPath), path: [...currentPath] };
  const parts = pathStr.split('/').filter(p => p && p !== '.');
  const working = pathStr.startsWith('/') ? [] : [...currentPath];
  for (const p of parts) {
    if (p === '..') { if (working.length) working.pop(); }
    else working.push(p);
  }
  return { node: getNode(root, working), path: working };
}

function resolveFilePath(root, fileStr, currentPath) {
  if (!fileStr) return { parentNode: null, targetName: '', node: null, path: [] };
  const parts = fileStr.split('/').filter(p => p && p !== '.');
  const working = fileStr.startsWith('/') ? [] : [...currentPath];
  for (const p of parts) {
    if (p === '..') { if (working.length) working.pop(); }
    else working.push(p);
  }
  if (!working.length) return { parentNode: null, targetName: '', node: null, path: [] };
  const parentPath = working.slice(0, -1);
  const targetName = working[working.length - 1];
  const parentNode = getNode(root, parentPath);
  const node = parentNode?.type === 'dir' ? parentNode.children[targetName] : null;
  return { parentNode, targetName, node, path: working };
}

export function useVFS(securityLocked) {
  const [root, setRoot] = useState(() => loadVfs());
  const [currentPath, setCurrentPath] = useState([]);

  const isLocked = useCallback((pathArr) =>
    securityLocked && pathArr?.length > 0 && pathArr[0] === 'secrets'
  , [securityLocked]);

  const persist = useCallback((newRoot) => {
    setRoot({ ...newRoot });
    saveVfs(newRoot);
  }, []);

  const cmdLs = useCallback((pathStr) => {
    const { node, path } = resolvePath(root, pathStr, currentPath);
    if (isLocked(path)) return { error: 'Permission Denied: /secrets is locked.' };
    if (!node) return { error: 'ls: Directory not found.' };
    if (node.type !== 'dir') return { error: 'ls: Not a directory.' };
    const entries = Object.keys(node.children);
    if (!entries.length) return { text: '(directory is empty)' };
    return { entries: entries.map(n => ({ name: n, isDir: node.children[n].type === 'dir' })) };
  }, [root, currentPath, isLocked]);

  const cmdCd = useCallback((pathStr) => {
    if (!pathStr || pathStr === '~') { setCurrentPath([]); return {}; }
    const { node, path } = resolvePath(root, pathStr, currentPath);
    if (isLocked(path)) return { error: 'Permission Denied: /secrets is locked.' };
    if (!node) return { error: `cd: No such directory: ${pathStr}` };
    if (node.type !== 'dir') return { error: `cd: Not a directory: ${pathStr}` };
    setCurrentPath(path);
    return {};
  }, [root, currentPath, isLocked]);

  const cmdCat = useCallback((pathStr) => {
    if (!pathStr) return { error: 'cat: Missing filename.' };
    const { node, path } = resolveFilePath(root, pathStr, currentPath);
    if (isLocked(path)) return { error: 'Permission Denied: /secrets is locked.' };
    if (!node) return { error: `cat: File not found: ${pathStr}` };
    if (node.type === 'dir') return { error: `cat: ${pathStr} is a directory.` };
    return { text: node.content };
  }, [root, currentPath, isLocked]);

  const cmdTouch = useCallback((pathStr) => {
    if (!pathStr) return { error: 'touch: Missing filename.' };
    const { parentNode, targetName, node, path } = resolveFilePath(root, pathStr, currentPath);
    if (isLocked(path)) return { error: 'Permission Denied: /secrets is locked.' };
    if (!parentNode || parentNode.type !== 'dir') return { error: 'touch: Directory path does not exist.' };
    if (node) return { text: `touch: File already exists: ${pathStr}` };
    parentNode.children[targetName] = { type: 'file', content: '' };
    persist(root);
    return { text: `Created: ${pathStr}`, ok: true };
  }, [root, currentPath, isLocked, persist]);

  const cmdRm = useCallback((pathStr) => {
    if (!pathStr) return { error: 'rm: Missing filename.' };
    const { parentNode, targetName, node, path } = resolveFilePath(root, pathStr, currentPath);
    if (isLocked(path)) return { error: 'Permission Denied: /secrets is locked.' };
    if (!node) return { error: `rm: File not found: ${pathStr}` };
    if (node.type === 'dir') return { error: 'rm: Cannot delete directories.' };
    delete parentNode.children[targetName];
    persist(root);
    return { text: `Deleted: ${pathStr}`, ok: true };
  }, [root, currentPath, isLocked, persist]);

  const openNano = useCallback((pathStr) => {
    if (!pathStr) return { error: 'nano: Missing filename.' };
    const { parentNode, targetName, node, path } = resolveFilePath(root, pathStr, currentPath);
    if (isLocked(path)) return { error: 'Permission Denied: /secrets is locked.' };
    if (!parentNode || parentNode.type !== 'dir') return { error: 'nano: Directory does not exist.' };
    if (node?.type === 'dir') return { error: `nano: ${pathStr} is a directory.` };
    if (!node) {
      parentNode.children[targetName] = { type: 'file', content: '' };
      persist(root);
    }
    return { fileName: targetName, fileNode: parentNode.children[targetName] };
  }, [root, currentPath, isLocked, persist]);

  const saveNano = useCallback((fileNode, content) => {
    fileNode.content = content;
    persist(root);
  }, [root, persist]);

  const cmdGrep = useCallback((keyword, pathStr) => {
    if (!keyword || !pathStr) return { error: 'grep: Usage: grep <keyword> <filepath>' };
    const { node, path } = resolveFilePath(root, pathStr, currentPath);
    if (isLocked(path)) return { error: 'Permission Denied: /secrets is locked.' };
    if (!node) return { error: `grep: File not found: ${pathStr}` };
    if (node.type === 'dir') return { error: `grep: ${pathStr} is a directory.` };
    const matches = node.content.split('\n')
      .map((line, i) => ({ line, i: i + 1 }))
      .filter(({ line }) => line.toLowerCase().includes(keyword.toLowerCase()));
    return { matches, keyword };
  }, [root, currentPath, isLocked]);

  const resolvForExplorer = useCallback((pathStr) => {
    const { node, path } = resolvePath(root, pathStr, []);
    return { node, locked: isLocked(path) };
  }, [root, isLocked]);

  const pwd = currentPath.length === 0 ? '/' : '/' + currentPath.join('/');

  return { root, currentPath, pwd, cmdLs, cmdCd, cmdCat, cmdTouch, cmdRm, openNano, saveNano, cmdGrep, resolvForExplorer };
}
