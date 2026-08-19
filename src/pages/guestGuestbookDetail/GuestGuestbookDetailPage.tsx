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
import IcLeftArrow from "@/assets/icons/ic_left_arrow.svg?react";
import GuestbookAttachedPhoto from "@/components/@common/GuestbookAttachedPhoto/GuestbookAttachedPhoto";
import GuestbookDetailHeader from "@/components/@common/GuestbookDetailHeader/GuestbookDetailHeader";
import GuestHeader from "@/components/@common/GuestHeader/GuestHeader";
import ImageLightbox, {
  type LightboxImage,
} from "@/components/UI/ImageLightbox/ImageLightbox";
import SwiperAction from "@/components/UI/SwiperAction/SwiperAction";
import { getImageUrl } from "@/utils/getImageUrl";
import * as S from "./GuestGuestbookDetailPage.styles";

interface GuestGuestbookDetailPageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 현재 보고 있는 카드 ID */
  currentId: number;
  /** 뒤로가기(방명록 목록으로 이동) 핸들러 */
  onBack: () => void;
  /** 이전/다음 카드로 이동 핸들러 */
  onNavigate: (id: number) => void;
}

/** 사진은 목록 응답에 없어(containsPhoto만 제공) 화면에 보일 수 있는 현재/이전/다음 카드만 개별 조회합니다. 닉네임·메시지·작성일은 목록 응답에 이미 포함돼 있어 개별 조회를 기다릴 필요가 없습니다 */
const useGuestbookCardDetail = (spaceId: string, cardId: number | undefined) =>
  useReadCard<GuestBookCardResponse>(spaceId, cardId ?? -1, {
    query: {
      enabled: cardId !== undefined,
      select: (response) =>
        // TODO: 응답 content-type이 `*/*`로 내려와 orval이 실제 스키마 대신 Blob으로 추론함 — 백엔드가 application/json으로 명시하면 캐스팅 제거 가능
        (response as unknown as ApiResponseGuestBookCardResponse).data ?? {},
    },
  });

const GuestGuestbookDetailPage = ({
  spaceId,
  currentId,
  onBack,
  onNavigate,
}: GuestGuestbookDetailPageProps) => {
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

  const currentSimple = cards.find((card) => card.id === currentCardId);
  const nickname = currentSimple?.nickname ?? "";
  const createdAt = currentSimple?.createdAt
    ? new Date(currentSimple.createdAt)
    : undefined;

  return (
    <S.Wrapper>
      <GuestHeader />
      <S.DetailHeaderWrapper>
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
      </S.DetailHeaderWrapper>
      <S.ScrollArea>
        <SwiperAction
          activeIndex={currentIndex}
          fillHeight
          onIndexChange={(index) => {
            const targetId = cardIds[index];
            if (targetId !== undefined) onNavigate(targetId);
          }}
          swiperElement={cardIds.map((id) => {
            const detail = getDetail(id);
            const simple = cards.find((card) => card.id === id);

            if (!detail) {
              return (
                <S.SlideContent key={id}>
                  {simple?.containsPhoto && <S.SkeletonPhoto aria-hidden />}
                  <S.Message>{simple?.message}</S.Message>
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

      <S.BottomBar>
        <S.BackButton type="button" onClick={onBack}>
          <IcLeftArrow width={20} height={20} aria-hidden />
          뒤로 가기
        </S.BackButton>
      </S.BottomBar>

      <ImageLightbox
        key={lightboxCard?.openId}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxCard?.images ?? []}
      />
    </S.Wrapper>
  );
};

export default GuestGuestbookDetailPage;
