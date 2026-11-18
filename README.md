# Todo Tutorial

[Claude Code Playbook](https://docs.claude-hunt.com) 강의에서 작은 할 일 앱을 직접 만들어 보며 Claude Code 쓰는 법을 배우는 연습용 저장소입니다.

## 관련 링크

- 강의 본문: https://docs.claude-hunt.com
- 수강생 결과물 공유: https://claude-hunt.com

## 기술 스택

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4
- shadcn/ui (radix-maia 스타일, taupe 베이스)
- TypeScript / ESLint / Prettier
- 패키지 매니저: bun 1.3.6

## 시작하기

### 준비물

- [Git](https://git-scm.com)
- [bun](https://bun.sh) 1.3.6 이상 (`bun -v`로 확인)
- Node.js 20.9 이상 (Next.js 16 요구 사항, `node -v`로 확인)

### 설치와 실행

1. 저장소를 받아 폴더로 이동합니다.

   ```bash
   git clone https://github.com/AAudreyLee/todo-tutorial.git
   cd todo-tutorial
   ```

2. 의존성을 설치합니다.

   ```bash
   bun install
   ```

3. 개발 서버를 실행합니다.

   ```bash
   bun dev
   ```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다. 3000번 포트가 이미 쓰이고 있으면 터미널에 표시된 다른 주소를 사용하세요. 서버는 `Ctrl+C`로 종료합니다.

### 자주 쓰는 스크립트

```bash
bun run build      # 프로덕션 빌드
bun run start      # 빌드 결과 실행 (먼저 build 필요)
bun run lint       # ESLint
bun run typecheck  # tsc --noEmit
bun run test       # Vitest 테스트 한 번 실행
bun run format     # Prettier 포맷팅
```

## 레슨별 시작 브랜치

레슨마다 시작 시점의 코드를 `lesson/<레슨 이름>` 브랜치로 제공합니다. 레슨 본문이 안내하는 브랜치로 바꾼 뒤 따라가세요.

```shell
git checkout lesson/claude-md
```

## 컴포넌트 추가

shadcn/ui 컴포넌트는 다음과 같이 추가합니다.

```bash
bunx --bun shadcn@latest add button
```

`components/ui` 디렉토리에 컴포넌트가 추가됩니다.

## 컴포넌트 사용

```tsx
import { Button } from "@/components/ui/button";
```
