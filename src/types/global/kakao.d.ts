interface Window {
  Kakao: {
    init: (key: string) => void;
    isInitialized: () => boolean;
    Auth: {
      authorize: (options: {
        redirectUri: string;
        state?: string;
        scope?: string;
        prompt?: string;
        nonce?: string;
        throughTalk?: boolean;
      }) => void;
    };
  };
}
