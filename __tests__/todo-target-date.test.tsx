import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it } from "vitest"

import { TodoApp } from "@/components/todo-app"

const stored = () => JSON.parse(window.localStorage.getItem("todos")!)

describe("목표 날짜", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("1. 목표 날짜를 고르고 할 일을 추가하면 항목에 날짜가 저장된다", async () => {
    const user = userEvent.setup()
    render(<TodoApp />)

    fireEvent.change(screen.getByLabelText("새 할 일의 목표 날짜"), {
      target: { value: "2030-01-15" },
    })
    await user.type(screen.getByLabelText("새 할 일"), "장보기{Enter}")

    expect(screen.getByLabelText("장보기 목표 날짜")).toHaveValue("2030-01-15")
    expect(stored()[0].targetDate).toBe("2030-01-15")
  })

  it("2. 날짜 없이 추가하면 targetDate가 저장되지 않고 입력칸은 비어 있다", async () => {
    const user = userEvent.setup()
    render(<TodoApp />)

    await user.type(screen.getByLabelText("새 할 일"), "장보기{Enter}")

    expect(screen.getByLabelText("장보기 목표 날짜")).toHaveValue("")
    expect(stored()[0]).not.toHaveProperty("targetDate")
  })

  it("3. 추가한 뒤에는 새 할 일의 날짜 입력칸이 비워진다", async () => {
    const user = userEvent.setup()
    render(<TodoApp />)

    fireEvent.change(screen.getByLabelText("새 할 일의 목표 날짜"), {
      target: { value: "2030-01-15" },
    })
    await user.type(screen.getByLabelText("새 할 일"), "장보기{Enter}")

    expect(screen.getByLabelText("새 할 일의 목표 날짜")).toHaveValue("")
  })

  it("4. 기존 항목의 날짜를 바꾸면 저장되고, 비우면 지워진다", () => {
    window.localStorage.setItem(
      "todos",
      JSON.stringify([{ id: "1", text: "장보기", completed: false }])
    )
    render(<TodoApp />)
    const input = screen.getByLabelText("장보기 목표 날짜")

    fireEvent.change(input, { target: { value: "2030-02-01" } })
    expect(stored()[0].targetDate).toBe("2030-02-01")

    fireEvent.change(input, { target: { value: "" } })
    expect(stored()[0]).not.toHaveProperty("targetDate")
  })

  it("5. 기한이 지난 미완료 항목만 강조된다", () => {
    window.localStorage.setItem(
      "todos",
      JSON.stringify([
        { id: "1", text: "지난 일", completed: false, targetDate: "2000-01-01" },
        { id: "2", text: "끝낸 일", completed: true, targetDate: "2000-01-01" },
        { id: "3", text: "먼 일", completed: false, targetDate: "2999-01-01" },
      ])
    )
    render(<TodoApp />)

    expect(screen.getByLabelText("지난 일 목표 날짜")).toHaveClass(
      "text-destructive"
    )
    expect(screen.getByLabelText("끝낸 일 목표 날짜")).not.toHaveClass(
      "text-destructive"
    )
    expect(screen.getByLabelText("먼 일 목표 날짜")).not.toHaveClass(
      "text-destructive"
    )
  })
})
