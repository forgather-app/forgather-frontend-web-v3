import { useInfiniteQuery } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { withApiVersion } from "@/api/apiVersion";
import { customFetcher } from "@/api/customFetcher";
import { useReadCard } from "@/api/generated/spaceguestbook-스페이스-방명록";
import type {
  ApiResponseGuestBookCardResponse,
  ApiResponseGuestBookResponse,
  GuestBookCardResponse,
} from "@/api/model";
import IcLeftArrow from "@/assets/icons/ic_left_arrow.svg?react";
import GuestbookAttachedPhoto from "@/components/@common/GuestbookAttachedPhoto/GuestbookAttachedPhoto";
import GuestbookDetailHeader from "@/components/@common/GuestbookDetailHeader/GuestbookDetailHeader";
import GuestHeader from "@/components/@common/GuestHeader/GuestHeader";
import ImageLightbox, {
  type LightboxImage,
} from "@/components/UI/ImageLightbox/ImageLightbox";
import SwiperAction from "@/components/UI/SwiperAction/SwiperAction";
import { CONSTRAINTS } from "@/constants/constraints";
import { getImageUrl } from "@/utils/getImageUrl";
import { throwIfRoutableError } from "@/utils/throwIfRoutableError";
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

// OpenAPI 스펙에는 page/size 쿼리 파라미터가 문서화되어 있지 않지만, 실제 서버 응답은 이미 페이지네이션되어 내려온다(#186).
// 목록 페이지(GuestGuestBookPage)와 동일한 queryKey를 사용해 캐시를 공유한다.
const fetchGuestBookPage = (spaceId: string, page: number) =>
  customFetcher<ApiResponseGuestBookResponse>(
    `/spaces/${spaceId}/guestbook?page=${page}&size=${CONSTRAINTS.GUEST_BOOK_LIST.PAGE_SIZE}`,
    withApiVersion(2),
  );

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
    startIndex: number;
    images: LightboxImage[];
  } | null>(null);

  const {
    data: guestBookPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isGuestBookPending,
    error: guestBookError,
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

  const cards = (guestBookPages?.pages ?? []).flatMap(
    (page) => page.data?.guestBookCards ?? [],
  );
  const cardIds = cards
    .map((card) => card.id)
    .filter((id): id is number => id !== undefined);

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

  // NOTE: 목록 API는 200으로 정상 응답했지만(HTTP 에러 아님) 모든 페이지를 다 뒤져도
  // currentId를 못 찾은 경우 — 존재하지 않는 카드다. 이 경우 cardIds[0](첫 카드)로
  // fallback하지 않고 명시적으로 404 처리한다. currentQuery는 이미 이 엉뚱한 첫 카드
  // 기준으로 나갔을 수 있으므로, 그 에러를 아래에서 참고하기 전에 먼저 걸러낸다.
  if (isResolved && !isCurrentLoaded) throw notFound();

  // NOTE: 목록 조회(useInfiniteQuery)는 fetchNextPage()가 실패해도 error/isError가
  // 함께 바뀐다. 이미 첫 페이지를 로드한 뒤라면(guestBookPages 존재) 위 두 useEffect가
  // 시도하는 배경 페이지네이션 실패로 상세 화면 전체가 죽어선 안 되므로 초기 로드
  // 실패일 때만 전역 에러로 넘긴다. prev/next는 스와이프 미리보기용이라 실패해도
  // 페이지 전체를 막지 않고, 지금 보고 있는 카드(current)가 404/5xx일 때만 공통
  // 처리로 넘긴다.
  throwIfRoutableError(
    guestBookPages ? undefined : guestBookError,
    currentQuery.error,
  );

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
        startIndex={lightboxCard?.startIndex}
        allowSave={false}
      />
    </S.Wrapper>
  );
};

export default GuestGuestbookDetailPage;
