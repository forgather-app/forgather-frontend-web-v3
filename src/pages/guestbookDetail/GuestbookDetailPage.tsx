import IcVerticalDots from "@/assets/icons/ic_vertical_dots.svg?react";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import SwiperAction from "@/components/UI/SwiperAction/SwiperAction";
import GuestbookAttachedPhoto from "./components/guestbookAttachedPhoto/GuestbookAttachedPhoto";
import GuestbookDetailHeader from "./components/guestbookDetailHeader/GuestbookDetailHeader";
import * as S from "./GuestbookDetailPage.styles";

export interface GuestbookPhotoInfo {
  /** 첨부 이미지 URL. 더미/미연동 상태에서는 생략됩니다. */
  imageUrl?: string;
  /** 현재 사진 순번 (1부터 시작) */
  currentIndex: number;
  /** 첨부된 전체 사진 개수 */
  totalCount: number;
}

export interface GuestbookCardDetail {
  /** 방명록 카드 ID */
  id: number;
  /** 방명록 작성자 닉네임 */
  nickname: string;
  /** 방명록 작성 일시 */
  createdAt: Date;
  /** 방명록 본문 메시지 */
  message: string;
  /** 첨부 사진 정보. 없으면 사진 미첨부 카드입니다. */
  photo?: GuestbookPhotoInfo;
}

interface GuestbookDetailPageProps {
  /** 이전/다음 이동 대상이 되는 방명록 카드 목록 */
  cards: GuestbookCardDetail[];
  /** 현재 보고 있는 카드 ID */
  currentId: number;
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 이전/다음 카드로 이동 핸들러 */
  onNavigate: (id: number) => void;
}

const GuestbookDetailPage = ({
  cards,
  currentId,
  onBack,
  onNavigate,
}: GuestbookDetailPageProps) => {
  const currentIndex = Math.max(
    cards.findIndex((card) => card.id === currentId),
    0,
  );
  const currentCard = cards[currentIndex];
  const prevCard = cards[currentIndex - 1];
  const nextCard = cards[currentIndex + 1];

  if (!currentCard) return null;

  return (
    <S.Wrapper>
      <NavigationBar
        onBackClick={onBack}
        rightContent={
          <IcVerticalDots width={24} height={24} aria-hidden="true" />
        }
        rightAriaLabel="더보기"
        // TODO: 케밥 메뉴(수정/삭제/신고 등) 액션 연동 필요
        onRightClick={() => {}}
      />
      <GuestbookDetailHeader
        nickname={currentCard.nickname}
        createdAt={currentCard.createdAt}
        onPrevClick={prevCard ? () => onNavigate(prevCard.id) : undefined}
        onNextClick={nextCard ? () => onNavigate(nextCard.id) : undefined}
      />
      <S.ScrollArea>
        <SwiperAction
          activeIndex={currentIndex}
          onIndexChange={(index) => {
            const target = cards[index];
            if (target) onNavigate(target.id);
          }}
          swiperElement={cards.map((card) => (
            <S.SlideContent key={card.id}>
              {card.photo && (
                <GuestbookAttachedPhoto
                  imageUrl={card.photo.imageUrl}
                  currentIndex={card.photo.currentIndex}
                  totalCount={card.photo.totalCount}
                />
              )}
              <S.Message>{card.message}</S.Message>
            </S.SlideContent>
          ))}
        />
      </S.ScrollArea>
    </S.Wrapper>
  );
};

export default GuestbookDetailPage;
