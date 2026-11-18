"use client"

import { useCallback, useSyncExternalStore } from "react"

export type Todo = {
  id: string
  text: string
  completed: boolean
  // 목표 날짜 (YYYY-MM-DD). 이 필드가 없던 예전 데이터도 그대로 읽을 수 있게 선택값으로 둔다
  targetDate?: string
}

const STORAGE_KEY = "todos"
const EMPTY: Todo[] = []

const listeners = new Set<() => void>()
let cachedRaw: string | null = null
let cachedTodos: Todo[] = EMPTY

function readTodos(): Todo[] {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (raw === cachedRaw) return cachedTodos
  cachedRaw = raw
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : []
    cachedTodos = Array.isArray(parsed) ? (parsed as Todo[]) : EMPTY
  } catch {
    cachedTodos = EMPTY
  }
  return cachedTodos
}

function writeTodos(todos: Todo[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // 다른 탭에서 바뀐 내용도 반영
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) listener()
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

export function useTodos() {
  const todos = useSyncExternalStore(subscribe, readTodos, () => EMPTY)

  const update = useCallback((fn: (prev: Todo[]) => Todo[]) => {
    writeTodos(fn(readTodos()))
  }, [])

  const addTodo = useCallback(
    (text: string, targetDate?: string) =>
      update((prev) => [
        {
          id: crypto.randomUUID(),
          text,
          completed: false,
          ...(targetDate ? { targetDate } : {}),
        },
        ...prev,
      ]),
    [update]
  )

  const setTargetDate = useCallback(
    (id: string, targetDate: string) =>
      update((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t
          // 빈 값이면 목표 날짜를 지운다
          const next: Todo = { ...t, targetDate }
          if (!targetDate) delete next.targetDate
          return next
        })
      ),
    [update]
  )

  const toggleTodo = useCallback(
    (id: string) =>
      update((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      ),
    [update]
  )

  const deleteTodo = useCallback(
    (id: string) => update((prev) => prev.filter((t) => t.id !== id)),
    [update]
  )

  const editTodo = useCallback(
    (id: string, text: string) =>
      update((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t))),
    [update]
  )

  const clearCompleted = useCallback(
    () => update((prev) => prev.filter((t) => !t.completed)),
    [update]
  )

  return {
    todos,
    addTodo,
    setTargetDate,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
  }
}
