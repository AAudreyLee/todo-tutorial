import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "사용법 안내",
}

const SECTIONS: { title: string; items: string[] }[] = [
  {
    title: "할 일 추가",
    items: [
      "입력창에 할 일을 쓰고 Enter를 누르면 목록에 추가됩니다.",
      "입력창 옆 날짜 칸에서 목표 날짜를 함께 정할 수 있습니다.",
    ],
  },
  {
    title: "완료와 삭제",
    items: [
      "왼쪽 체크박스를 누르면 완료로 바뀌고, 다시 누르면 진행중으로 돌아갑니다.",
      "오른쪽 휴지통 버튼을 누르면 그 할 일이 삭제됩니다.",
      "완료한 할 일이 있으면 목록 아래의 '완료한 일 지우기' 버튼으로 한 번에 지울 수 있습니다.",
    ],
  },
  {
    title: "수정",
    items: [
      "할 일 글자를 더블클릭하면 수정할 수 있습니다.",
      "Enter 또는 입력창 밖 클릭으로 저장하고, Esc로 취소합니다.",
      "빈 값으로 저장하면 원래 글자가 유지됩니다.",
    ],
  },
  {
    title: "필터",
    items: [
      "'전체', '진행중', '완료' 탭으로 보고 싶은 할 일만 골라 볼 수 있습니다.",
    ],
  },
  {
    title: "목표 날짜",
    items: [
      "각 할 일 오른쪽의 날짜 칸에서 목표 날짜를 바꾸거나 지울 수 있습니다.",
      "목표 날짜가 지났는데 끝나지 않은 할 일은 날짜가 빨간색으로 표시됩니다.",
    ],
  },
  {
    title: "저장",
    items: [
      "할 일은 이 브라우저에 저장되므로 새로고침해도 유지됩니다.",
      "다른 브라우저나 기기에서는 같은 목록이 보이지 않습니다.",
    ],
  },
]

export default function GuidePage() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col gap-6 p-6 pt-16">
      <h1 className="text-3xl font-bold tracking-tight">사용법 안내</h1>
      {SECTIONS.map((section) => (
        <section key={section.title} className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">{section.title}</h2>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-muted-foreground">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
      <Link href="/" className="text-sm underline underline-offset-4">
        ← 내 할 일로 돌아가기
      </Link>
    </main>
  )
}
