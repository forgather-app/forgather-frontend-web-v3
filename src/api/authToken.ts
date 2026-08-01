// NOTE: refreshToken은 서버가 httpOnly 쿠키로 내려주고 자동으로 재발급에 쓰이므로 여기서 다루지 않음.
// accessToken은 응답 바디로 오며, XSS 노출 범위를 줄이기 위해 localStorage 대신 메모리에만 보관.
let accessToken: string | undefined;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token?: string) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = undefined;
};
