// forgather.app을 v2/v3가 경로로 나눠 쓰는 동안, `vite build` 결과물(dist/)을 배포 가능한
// 형태로 재구성한다. `.well-known/*`(Universal Link/App Link 검증 파일)는 iOS/Android 사양상
// 반드시 도메인 루트에서만 서빙되어야 하므로, `/v3` prefix 대상에서 제외하고 dist/ 루트에
// 그대로 남긴다. 그 외 모든 산출물(index.html, assets/, images/ 등)은 dist/v3/ 밑으로 옮겨서,
// 그대로 S3 등에 업로드하면 URL 구조와 일치하게 만든다.
//
// 결과:
//   dist/.well-known/...   → forgather.app/.well-known/...  로 배포
//   dist/v3/...            → forgather.app/v3/...           로 배포
import { mkdir, readdir, rename } from "node:fs/promises";
import path from "node:path";

const DIST_DIR = path.resolve(import.meta.dirname, "..", "dist");
const V3_DIR_NAME = "v3";
const EXCLUDED_ENTRIES = new Set([".well-known", V3_DIR_NAME]);

async function main() {
  const entries = await readdir(DIST_DIR);
  const entriesToMove = entries.filter((entry) => !EXCLUDED_ENTRIES.has(entry));

  if (entriesToMove.length === 0) {
    console.log("[prepare-deployment-v3] 옮길 파일이 없습니다.");
    return;
  }

  const v3Dir = path.join(DIST_DIR, V3_DIR_NAME);
  await mkdir(v3Dir, { recursive: true });

  for (const entry of entriesToMove) {
    await rename(path.join(DIST_DIR, entry), path.join(v3Dir, entry));
  }

  console.log(
    `[prepare-deployment-v3] ${entriesToMove.length}개 항목을 dist/${V3_DIR_NAME}/ 로 이동했습니다.`,
  );
  console.log(
    "[prepare-deployment-v3] dist/.well-known/ 은 도메인 루트로, dist/v3/ 은 /v3 경로로 배포하세요.",
  );
}

main().catch((error) => {
  console.error("[prepare-deployment-v3] 실패:", error);
  process.exit(1);
});
