import { useRef, useState } from "react";
import {
  useReadCard,
  useReadGuestBookV2Suspense,
} from "@/api/generated/spaceguestbook-스페이스-방명록";
import type {
  ApiResponseGuestBookCardResponse,
  ApiResponseGuestBookResponse,
  GuestBookCardResponse,
  GuestBookResponse,
} from "@/api/model";
import IcVerticalDots from "@/assets/icons/ic_vertical_dots.svg?react";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import ImageLightbox, {
  type LightboxImage,
} from "@/components/UI/ImageLightbox/ImageLightbox";
import SwiperAction from "@/components/UI/SwiperAction/SwiperAction";
import { getImageUrl } from "@/utils/getImageUrl";
import GuestbookAttachedPhoto from "./components/guestbookAttachedPhoto/GuestbookAttachedPhoto";
import GuestbookDetailHeader from "./components/guestbookDetailHeader/GuestbookDetailHeader";
import * as S from "./GuestbookDetailPage.styles";

interface GuestbookDetailPageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 현재 보고 있는 카드 ID */
  currentId: number;
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 이전/다음 카드로 이동 핸들러 */
  onNavigate: (id: number) => void;
}

/** 카드 상세(메시지·사진)는 화면에 보일 수 있는 현재/이전/다음 카드만 개별 조회합니다 */
const useGuestbookCardDetail = (spaceId: string, cardId: number | undefined) =>
  useReadCard<GuestBookCardResponse>(spaceId, cardId ?? -1, {
    query: {
      enabled: cardId !== undefined,
      select: (response) =>
        // TODO: 응답 content-type이 `*/*`로 내려와 orval이 실제 스키마 대신 Blob으로 추론함 — 백엔드가 application/json으로 명시하면 캐스팅 제거 가능
        (response as unknown as ApiResponseGuestBookCardResponse).data ?? {},
    },
  });

const GuestbookDetailPage = ({
  spaceId,
  currentId,
  onBack,
  onNavigate,
}: GuestbookDetailPageProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const lightboxOpenIdRef = useRef(0);
  const [lightboxCard, setLightboxCard] = useState<{
    openId: number;
    images: LightboxImage[];
  } | null>(null);

  const { data: guestBook } = useReadGuestBookV2Suspense<GuestBookResponse>(
    spaceId,
    {
      query: {
        select: (response) =>
          (response as unknown as ApiResponseGuestBookResponse).data ?? {},
      },
    },
  );

  const cards = guestBook.guestBookCards ?? [];
  const cardIds = cards
    .map((card) => card.id)
    .filter((id): id is number => id !== undefined);

  const currentIndex = Math.max(cardIds.indexOf(currentId), 0);
  const currentCardId = cardIds[currentIndex];
  const prevId = cardIds[currentIndex - 1];
  const nextId = cardIds[currentIndex + 1];

  const prevQuery = useGuestbookCardDetail(spaceId, prevId);
  const currentQuery = useGuestbookCardDetail(spaceId, currentCardId);
  const nextQuery = useGuestbookCardDetail(spaceId, nextId);

  if (currentCardId === undefined) return null;

  const getDetail = (id: number): GuestBookCardResponse | undefined => {
    if (id === prevId) return prevQuery.data;
    if (id === currentCardId) return currentQuery.data;
    if (id === nextId) return nextQuery.data;
    return undefined;
  };

  const nickname =
    cards.find((card) => card.id === currentCardId)?.nickname ?? "";
  const createdAt = currentQuery.data?.createdAt
    ? new Date(currentQuery.data.createdAt)
    : undefined;

  return (
    <S.Wrapper>
      <NavigationBar
        onBackClick={onBack}
        rightIcon={<IcVerticalDots width={24} height={24} />}
        rightIconAriaLabel="더보기"
        // TODO: 케밥 메뉴(수정/삭제/신고 등) 액션 연동 필요
        onRightIconClick={() => {}}
      />
      <GuestbookDetailHeader
        nickname={nickname}
        createdAt={createdAt}
        onPrevClick={
          prevId !== undefined ? () => onNavigate(prevId) : undefined
        }
        onNextClick={
          nextId !== undefined ? () => onNavigate(nextId) : undefined
        }
      />
      <S.ScrollArea>
        <SwiperAction
          activeIndex={currentIndex}
          onIndexChange={(index) => {
            const targetId = cardIds[index];
            if (targetId !== undefined) onNavigate(targetId);
          }}
          swiperElement={cardIds.map((id) => {
            const detail = getDetail(id);

            if (!detail) {
              const simple = cards.find((card) => card.id === id);
              return (
                <S.SlideContent key={id}>
                  {simple?.containsPhoto && <S.SkeletonPhoto aria-hidden />}
                  <S.SkeletonLine aria-hidden style={{ width: "100%" }} />
                  <S.SkeletonLine aria-hidden style={{ width: "90%" }} />
                  <S.SkeletonLine aria-hidden style={{ width: "60%" }} />
                </S.SlideContent>
              );
            }

            const photos = detail.photos ?? [];

            return (
              <S.SlideContent key={id}>
                {photos.length > 0 && (
                  <GuestbookAttachedPhoto
                    imageUrl={
                      photos[0]?.path ? getImageUrl(photos[0].path) : undefined
                    }
                    currentIndex={1}
                    totalCount={photos.length}
                    onClick={() => {
                      lightboxOpenIdRef.current += 1;
                      setLightboxCard({
                        openId: lightboxOpenIdRef.current,
                        images: photos
                          .filter(
                            (photo): photo is typeof photo & { path: string } =>
                              Boolean(photo.path),
                          )
                          .map((photo) => ({
                            url: getImageUrl(photo.path),
                            name: photo.originalName,
                          })),
                      });
                      setIsLightboxOpen(true);
                    }}
                  />
                )}
                <S.Message>{detail.message}</S.Message>
              </S.SlideContent>
            );
          })}
        />
      </S.ScrollArea>
      <ImageLightbox
        key={lightboxCard?.openId}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxCard?.images ?? []}
      />
    </S.Wrapper>
  );
};

export default GuestbookDetailPage;
