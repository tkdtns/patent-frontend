import re
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI
from patent_agent.api.routers import analysis, stream, edits, chat

# .env 파일이 있으면 자동 로드
# main.py: backend/src/patent_agent/api/main.py → parents[3] = backend/
_env_path = Path(__file__).resolve().parents[3] / ".env"
load_dotenv(_env_path, override=True)

app = FastAPI(title="Patent Agent API", version="0.1.0")

app.include_router(analysis.router)
app.include_router(stream.router)
app.include_router(edits.router)
app.include_router(chat.router)


# ── ASGI 레벨 CORS 미들웨어 ────────────────────────────────────────────────
# starlette 1.0 의 CORSMiddleware 호환성 문제를 우회하기 위해
# 직접 ASGI 래퍼로 구현한다.

_ORIGIN_RE = re.compile(r"^https?://localhost(:\d+)?$")

_PREFLIGHT_HEADERS = [
    (b"access-control-allow-methods",
     b"GET, POST, PUT, DELETE, OPTIONS, PATCH"),
    (b"access-control-allow-headers", b"*"),
    (b"access-control-allow-credentials", b"true"),
    (b"access-control-max-age", b"600"),
]


class _CORSMiddleware:
    """모든 localhost origin에 CORS 헤더를 추가하는 ASGI 미들웨어."""

    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.inner(scope, receive, send)
            return

        # Origin 헤더 추출
        headers = dict(scope.get("headers", []))
        origin_b: bytes = headers.get(b"origin", b"")
        origin = origin_b.decode("latin-1")
        allowed = bool(_ORIGIN_RE.match(origin)) if origin else False

        if not allowed:
            await self.inner(scope, receive, send)
            return

        extra: list[tuple[bytes, bytes]] = [
            (b"access-control-allow-origin", origin.encode()),
        ] + _PREFLIGHT_HEADERS

        async def patched_send(message):
            if message["type"] == "http.response.start":
                # 헤더 리스트에 CORS 헤더 추가
                message = dict(message)
                message["headers"] = list(message["headers"]) + extra
            await send(message)

        await self.inner(scope, receive, patched_send)


# FastAPI ASGI 앱을 CORS 미들웨어로 감싼다
app = _CORSMiddleware(app)  # type: ignore[assignment]
