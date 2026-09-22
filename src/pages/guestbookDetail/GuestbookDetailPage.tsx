import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { withApiVersion } from "@/api/apiVersion";
import { customFetcher } from "@/api/customFetcher";
import {
  useReadCard,
  useReadUnreadGuestBookSuspense,
} from "@/api/generated/spaceguestbook-스페이스-방명록";
import type {
  ApiResponseGuestBookCardResponse,
  ApiResponseGuestBookResponse,
  GuestBookCardResponse,
  GuestBookResponse,
} from "@/api/model";
import IcVerticalDots from "@/assets/icons/ic_vertical_dots.svg?react";
import GuestbookAttachedPhoto from "@/components/@common/GuestbookAttachedPhoto/GuestbookAttachedPhoto";
import GuestbookDetailHeader from "@/components/@common/GuestbookDetailHeader/GuestbookDetailHeader";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import ImageLightbox, {
  type LightboxImage,
} from "@/components/UI/ImageLightbox/ImageLightbox";
import SwiperAction from "@/components/UI/SwiperAction/SwiperAction";
import { CONSTRAINTS } from "@/constants/constraints";
import { getImageUrl } from "@/utils/getImageUrl";
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

// TODO: 응답 content-type이 `*/*`로 내려와 orval이 실제 스키마 대신 Blob으로 추론함 — 백엔드가 application/json으로 명시하면 캐스팅 제거 가능
const selectGuestBookResponse = (response: unknown): GuestBookResponse =>
  (response as ApiResponseGuestBookResponse).data ?? {};

// OpenAPI 스펙에는 page/size 쿼리 파라미터가 문서화되어 있지 않지만, 실제 서버 응답은 이미 페이지네이션되어 내려온다(#186).
// 목록 페이지(GuestBookPage)와 동일한 queryKey를 사용해 캐시를 공유한다.
const fetchGuestBookPage = (spaceId: string, page: number) =>
  customFetcher<ApiResponseGuestBookResponse>(
    `/spaces/${spaceId}/guestbook?page=${page}&size=${CONSTRAINTS.GUEST_BOOK_LIST.PAGE_SIZE}`,
    withApiVersion(2),
  );

const GuestbookDetailPage = ({
  spaceId,
  currentId,
  onBack,
  onNavigate,
}: GuestbookDetailPageProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  // 닫힘 애니메이션 동안 Modal이 언마운트되지 않으므로, onClose에서 images를 비우면
  // 잠깐 "n / 0"처럼 잘못된 카운터가 보입니다. 닫을 때는 isOpen만 false로 바꾸고
  // 마지막으로 열었던 카드 데이터는 그대로 유지합니다.
  // openId는 열 때마다 증가시켜 ImageLightbox의 key로 사용합니다 — 같은 카드를 다시 열어도
  // 항상 리마운트되어 첫 번째 이미지부터 시작합니다.
  const lightboxOpenIdRef = useRef(0);
  const [lightboxCard, setLightboxCard] = useState<{
    openId: number;
    startIndex: number;
    images: LightboxImage[];
  } | null>(null);

  const {
    data: guestBookPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isGuestBookPending,
  } = useInfiniteQuery({
    queryKey: ["guestbook", spaceId, "list"],
    queryFn: ({ pageParam }) => fetchGuestBookPage(spaceId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      const totalPages = allPages.at(-1)?.data?.totalPages;
      if (totalPages === undefined || allPages.length >= totalPages) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
  const { data: unreadGuestBook } =
    useReadUnreadGuestBookSuspense<GuestBookResponse>(spaceId, {
      query: { select: selectGuestBookResponse },
    });

  const readCards = (guestBookPages?.pages ?? []).flatMap(
    (page) => page.data?.guestBookCards ?? [],
  );
  const cards = [...(unreadGuestBook.guestBookCards ?? []), ...readCards];
  const cardIds = Array.from(
    new Set(
      cards
        .map((card) => card.id)
        .filter((id): id is number => id !== undefined),
    ),
  );

  const foundIndex = cardIds.indexOf(currentId);
  const isCurrentLoaded = foundIndex !== -1;

  // currentId가 아직 로드되지 않은 페이지에 있을 수 있으므로, 찾을 때까지 다음 페이지를 계속 불러온다.
  // 그렇지 않으면 뒤쪽 페이지의 카드를 클릭했을 때 못 찾은 채로 맨 처음 카드가 보여버린다.
  useEffect(() => {
    if (isCurrentLoaded || isGuestBookPending) return;
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    isCurrentLoaded,
    isGuestBookPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  // 로드된 카드 목록의 끝에 가까워지면 미리 다음 페이지를 불러와, 스와이프로 계속 넘길 때
  // 페이지 경계에서 더 이상 못 넘어가는 문제를 방지한다.
  useEffect(() => {
    if (!isCurrentLoaded) return;
    const isNearEnd = foundIndex >= cardIds.length - 3;
    if (isNearEnd && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    isCurrentLoaded,
    foundIndex,
    cardIds.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  // 초기 로딩 중이거나, 아직 못 찾았지만 더 불러올 페이지가 남아있는 동안에는
  // 잘못된 카드(맨 처음)를 보여주는 대신 로딩 상태를 유지한다.
  const isResolved = !isGuestBookPending && (isCurrentLoaded || !hasNextPage);

  const currentIndex = isCurrentLoaded ? foundIndex : 0;
  const currentCardId = isResolved ? cardIds[currentIndex] : undefined;
  const prevId = isResolved ? cardIds[currentIndex - 1] : undefined;
  const nextId = isResolved ? cardIds[currentIndex + 1] : undefined;

  const prevQuery = useGuestbookCardDetail(spaceId, prevId);
  const currentQuery = useGuestbookCardDetail(spaceId, currentCardId);
  const nextQuery = useGuestbookCardDetail(spaceId, nextId);

  if (!isResolved || currentCardId === undefined) return null;

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
                  <S.Message>{simple?.message}</S.Message>
                  {simple?.containsPhoto && <S.SkeletonPhoto aria-hidden />}
                </S.SlideContent>
              );
            }

            const validPhotos = (detail.photos ?? []).filter(
              (photo): photo is typeof photo & { path: string } =>
                Boolean(photo.path),
            );

            return (
              <S.SlideContent key={id}>
                <S.Message>{detail.message}</S.Message>
                {validPhotos.length > 0 && (
                  <S.PhotoList>
                    {validPhotos.map((photo, index) => (
                      <GuestbookAttachedPhoto
                        key={photo.path}
                        imageUrl={getImageUrl(photo.path)}
                        onClick={() => {
                          lightboxOpenIdRef.current += 1;
                          setLightboxCard({
                            openId: lightboxOpenIdRef.current,
                            startIndex: index,
                            images: validPhotos.map((p) => ({
                              url: getImageUrl(p.path),
                              name: p.originalName,
                            })),
                          });
                          setIsLightboxOpen(true);
                        }}
                      />
                    ))}
                  </S.PhotoList>
                )}
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
        startIndex={lightboxCard?.startIndex}
      />
    </S.Wrapper>
  );
};

export default GuestbookDetailPage;
