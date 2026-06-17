import type { TermsAgreementState } from "@/pages/signUp/components/termsAgreement/TermsAgreement.type";

export type { TermsAgreementState } from "@/pages/signUp/components/termsAgreement/TermsAgreement.type";
export { INITIAL_TERMS_STATE } from "@/pages/signUp/components/termsAgreement/TermsAgreement.type";

export interface TermsItem {
  key: keyof TermsAgreementState;
  label: string;
  required: boolean;
  /** 클릭 시 모달로 전체 내용을 보여줄 약관. undefined면 모달 없음 */
  modalContent?: string;
}

export const TERMS_ITEMS: TermsItem[] = [
  {
    key: "isServiceTermsAgreed",
    label: "서비스 이용약관 동의",
    required: true,
    modalContent: `제1조 (목적)
본 약관은 forgather(이하 "서비스")가 제공하는 서비스의 이용과 관련하여 서비스와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (정의)
① "서비스"란 forgather가 제공하는 전시 방명록 작성 및 관리 서비스를 의미합니다.
② "이용자"란 본 약관에 동의하고 서비스를 이용하는 모든 사람을 의미합니다.

제3조 (약관의 효력 및 변경)
① 본 약관은 서비스 화면에 게시하거나 기타 방법으로 이용자에게 공지함으로써 효력이 발생합니다.
② 서비스는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 공지 후 7일이 경과한 날부터 효력이 발생합니다.

제4조 (서비스의 제공)
① 서비스는 이용자에게 전시 방명록 작성, 전시 정보 등록 및 관리 기능을 제공합니다.
② 서비스는 운영상 또는 기술상 필요한 경우 제공하는 서비스를 변경할 수 있습니다.

제5조 (이용자의 의무)
① 이용자는 서비스 이용 시 관계 법령과 본 약관을 준수해야 합니다.
② 이용자는 타인의 권리를 침해하거나 서비스의 정상적인 운영을 방해해서는 안 됩니다.

제6조 (면책조항)
서비스는 천재지변, 전쟁, 기타 불가항력적 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.`,
  },
  {
    key: "isPrivacyPolicyAgreed",
    label: "개인정보 수집·이용 동의",
    required: true,
    modalContent: `개인정보 처리방침

forgather(이하 "서비스")는 이용자의 개인정보를 중요시하며, 개인정보 보호법 등 관련 법령을 준수합니다.

1. 수집하는 개인정보 항목
- 필수: 이메일 주소, 작가명
- 선택: 프로필 이미지

2. 개인정보 수집 및 이용 목적
- 서비스 제공 및 회원 관리
- 전시 방명록 서비스 운영

3. 개인정보 보유 및 이용 기간
- 회원 탈퇴 시까지 보유하며, 탈퇴 후 즉시 파기합니다.
- 단, 관련 법령에 따라 일정 기간 보존이 필요한 경우 해당 기간 동안 보관합니다.

4. 개인정보의 제3자 제공
서비스는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.

5. 이용자의 권리
이용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제할 수 있습니다.`,
  },
  {
    key: "isMarketingAgreed",
    label: "광고·마케팅 및 개인정보 제3자 제공",
    required: false,
  },
];
