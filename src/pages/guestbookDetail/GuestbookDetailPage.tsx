import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  getReadCardQueryKey,
  getReadGuestBookV2QueryKey,
  getReadUnreadGuestBookQueryKey,
  useDeleteCard,
  useReadCard,
  useReadGuestBookV2Suspense,
  useReadUnreadGuestBookSuspense,
} from "@/api/generated/spaceguestbook-스페이스-방명록";
import type {
  ApiResponseGuestBookCardResponse,
  ApiResponseGuestBookResponse,
  GuestBookCardResponse,
  GuestBookResponse,
} from "@/api/model";
import IcVerticalDots from "@/assets/icons/ic_vertical_dots.svg?react";
import Button from "@/components/@common/Button/Button";
import Dropdown from "@/components/@common/Dropdown/Dropdown";
import GuestbookAttachedPhoto from "@/components/@common/GuestbookAttachedPhoto/GuestbookAttachedPhoto";
import GuestbookDetailHeader from "@/components/@common/GuestbookDetailHeader/GuestbookDetailHeader";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import ImageLightbox, {
  type LightboxImage,
} from "@/components/UI/ImageLightbox/ImageLightbox";
import Modal from "@/components/UI/Modal/Modal";
import SwiperAction from "@/components/UI/SwiperAction/SwiperAction";
import useSnackBar from "@/hooks/@common/useSnackBar";
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
  /** 삭제 성공 후 호출되는 핸들러 (예: 목록으로 이동) */
  onDeleteSuccess?: () => void;
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

const GuestbookDetailPage = ({
  spaceId,
  currentId,
  onBack,
  onNavigate,
  onDeleteSuccess = () => {},
}: GuestbookDetailPageProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { showSnackBar } = useSnackBar();
  const queryClient = useQueryClient();
  const { mutate: deleteCard } = useDeleteCard();
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

  const { data: guestBook } = useReadGuestBookV2Suspense<GuestBookResponse>(
    spaceId,
    { query: { select: selectGuestBookResponse } },
  );
  const { data: unreadGuestBook } =
    useReadUnreadGuestBookSuspense<GuestBookResponse>(spaceId, {
      query: { select: selectGuestBookResponse },
    });

  const cards = [
    ...(unreadGuestBook.guestBookCards ?? []),
    ...(guestBook.guestBookCards ?? []),
  ];
  const cardIds = Array.from(
    new Set(
      cards
        .map((card) => card.id)
        .filter((id): id is number => id !== undefined),
    ),
  );

  const currentIndex = Math.max(cardIds.indexOf(currentId), 0);
  const currentCardId = cardIds[currentIndex];
  const prevId = cardIds[currentIndex - 1];
  const nextId = cardIds[currentIndex + 1];

  const prevQuery = useGuestbookCardDetail(spaceId, prevId);
  const currentQuery = useGuestbookCardDetail(spaceId, currentCardId);
  const nextQuery = useGuestbookCardDetail(spaceId, nextId);

  if (currentCardId === undefined) return null;

  const handleConfirmDelete = () => {
    deleteCard(
      { spaceCode: spaceId, guestBookCardId: currentCardId },
      {
        onSuccess: () => {
          setIsDeleteConfirmOpen(false);
          showSnackBar("방명록을 삭제했어요", "alert");
          // 목록/상세 캐시를 무효화해 뒤로가기 등으로 재접근해도 삭제된 상태가 바로 반영되게 한다
          queryClient.invalidateQueries({
            queryKey: getReadGuestBookV2QueryKey(spaceId),
          });
          queryClient.invalidateQueries({
            queryKey: getReadUnreadGuestBookQueryKey(spaceId),
          });
          queryClient.invalidateQueries({
            queryKey: getReadCardQueryKey(spaceId, currentCardId),
          });
          onDeleteSuccess();
        },
        onError: () => {
          setIsDeleteConfirmOpen(false);
          showSnackBar("방명록 삭제에 실패했어요", "error");
        },
      },
    );
  };

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
      <S.NavWrapper>
        <NavigationBar
          onBackClick={onBack}
          rightContent={
            <IcVerticalDots width={24} height={24} aria-hidden="true" />
          }
          rightAriaLabel="더보기"
          onRightClick={() => setIsMenuOpen((prev) => !prev)}
        />
        <Dropdown
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          items={[
            {
              label: "삭제하기",
              onClick: () => setIsDeleteConfirmOpen(true),
            },
          ]}
        />
      </S.NavWrapper>
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
      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
      >
        <Modal.Overlay />
        <Modal.Content>
          <S.ConfirmBody>
            <S.ConfirmTextGroup>
              <S.ConfirmTitle>방명록을 삭제할까요?</S.ConfirmTitle>
              <S.ConfirmSubtitle>삭제하면 되돌릴 수 없어요</S.ConfirmSubtitle>
            </S.ConfirmTextGroup>
            <S.ConfirmActions>
              <Button
                variant="tertiary"
                text="취소"
                onClick={() => setIsDeleteConfirmOpen(false)}
                style={{ flex: 1 }}
              />
              <Button
                variant="danger"
                text="삭제하기"
                onClick={handleConfirmDelete}
                style={{ flex: 1 }}
              />
            </S.ConfirmActions>
          </S.ConfirmBody>
        </Modal.Content>
      </Modal>
    </S.Wrapper>
  );
};

export default GuestbookDetailPage;
