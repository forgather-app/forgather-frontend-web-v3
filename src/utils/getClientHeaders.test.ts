import { describe, expect, it } from "vitest";
import { getClientHeaders } from "./getClientHeaders";

describe("getClientHeaders", () => {
  it("일반 브라우저 User-Agent면 X-Client-Type: WEB만 반환한다", () => {
    expect(
      getClientHeaders(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      ),
    ).toEqual({ "X-Client-Type": "WEB" });
  });

  it("iOS 앱 WebView면 X-Client-Type: IOS와 X-App-Version을 반환한다", () => {
    // 앱의 userAgent prop은 기본 브라우저 UA를 통째로 덮어쓰므로 "iPhone" 등
    // 브라우저 UA 토큰은 섞이지 않는다. 실제로 전송되는 값 그대로 검증한다.
    expect(getClientHeaders("ForgatherWebview/1.3.0 (iOS) WebView")).toEqual({
      "X-Client-Type": "IOS",
      "X-App-Version": "1.3.0",
    });
  });

  it("Android 앱 WebView면 X-Client-Type: ANDROID와 X-App-Version을 반환한다", () => {
    expect(
      getClientHeaders("ForgatherWebview/1.3.0 (Android) WebView"),
    ).toEqual({
      "X-Client-Type": "ANDROID",
      "X-App-Version": "1.3.0",
    });
  });

  it("앱 WebView UA에 버전이 없으면 X-App-Version 없이 X-Client-Type만 반환한다", () => {
    expect(getClientHeaders("ForgatherWebview (iOS) WebView")).toEqual({
      "X-Client-Type": "IOS",
    });
  });

  it("롤아웃 전 구버전 앱(ForgatherWebview/1.0, 2자리)도 파싱한다", () => {
    expect(getClientHeaders("ForgatherWebview/1.0 (iOS) WebView")).toEqual({
      "X-Client-Type": "IOS",
      "X-App-Version": "1.0",
    });
  });
});
