import { useCallback, useEffect, useRef, useState } from "react";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import TextField from "@/components/@common/TextField/TextField";
import useInfiniteScroll from "@/hooks/@common/useInfiniteScroll";
import type { ExhibitionLocationValue } from "./exhibitionLocation";
import * as S from "./ExhibitionPlaceSearch.styles";
import useExhibitionPlaceSearch from "./useExhibitionPlaceSearch";

interface ExhibitionPlaceSearchProps {
  onSelect: (
    place: Pick<ExhibitionLocationValue, "placeId" | "placeUrl">,
  ) => void;
  onClose: () => void;
}

const ExhibitionPlaceSearch = ({
  onSelect,
  onClose,
}: ExhibitionPlaceSearchProps) => {
  const [keyword, setKeyword] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closedRef = useRef(false);
  const openerRef = useRef<HTMLElement | null>(null);
  const {
    places,
    isLoading,
    isLoadingMore,
    error,
    hasNext,
    loadMore,
    retry,
    cancel,
  } = useExhibitionPlaceSearch(isComposing ? "" : keyword);
  const { targetRef } = useInfiniteScroll({
    hasNextPage: hasNext && !error,
    isFetchingNextPage: isLoadingMore,
    onIntersect: loadMore,
  });

  const close = useCallback(() => {
    if (closedRef.current) return;
    closedRef.current = true;
    cancel();
    dialogRef.current?.close();
    openerRef.current?.focus();
    onClose();
  }, [cancel, onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    openerRef.current = opener;
    closedRef.current = false;
    dialog?.showModal();
    dialog?.querySelector<HTMLInputElement>("input")?.focus();
    return () => {
      closedRef.current = true;
      dialog?.close();
      opener?.focus();
    };
  }, []);

  return (
    <S.Dialog
      ref={dialogRef}
      aria-label="장소 검색"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={(event) => {
        if (!event.currentTarget.open) close();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && !event.nativeEvent.isComposing) {
          event.preventDefault();
          close();
        }
      }}
    >
      <S.Navigation>
        <NavigationBar title="장소 검색" onBackClick={close} />
      </S.Navigation>
      <S.Content>
        <TextField
          variant="search"
          aria-label="장소 검색어"
          autoFocus
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={(event) => {
            setKeyword(event.currentTarget.value);
            setIsComposing(false);
          }}
        />
        <S.Caption>검색 결과</S.Caption>
        {places.length > 0 && (
          <S.Results aria-label="검색 결과">
            {places.map((place) => {
              const address = place.roadAddress || place.address;
              return (
                <S.Result key={place.placeId}>
                  <S.Details>
                    <S.Name>{place.placeName}</S.Name>
                    {address && <S.Address>{address}</S.Address>}
                  </S.Details>
                  <S.SelectButton
                    type="button"
                    aria-label={`${place.placeName} 선택`}
                    disabled={!place.placeId || !place.placeUrl}
                    onClick={() => {
                      if (!place.placeId || !place.placeUrl) return;
                      cancel();
                      onSelect({
                        placeId: place.placeId,
                        placeUrl: place.placeUrl,
                      });
                      close();
                    }}
                  >
                    선택
                  </S.SelectButton>
                </S.Result>
              );
            })}
          </S.Results>
        )}
        {isLoading || isLoadingMore ? (
          <S.Caption role="status">검색 중입니다.</S.Caption>
        ) : null}
        {Boolean(error) && (
          <>
            <S.Caption role="alert">장소를 불러오지 못했습니다.</S.Caption>
            <S.RetryButton type="button" onClick={retry}>
              다시 시도
            </S.RetryButton>
          </>
        )}
        {!isComposing &&
        keyword.trim() &&
        !isLoading &&
        !error &&
        places.length === 0 ? (
          <S.Caption role="status">검색 결과가 없습니다.</S.Caption>
        ) : null}
        <S.Caption>검색 결과에서 장소를 선택해주세요.</S.Caption>
        <S.Sentinel ref={targetRef} aria-hidden="true" />
      </S.Content>
    </S.Dialog>
  );
};
export default ExhibitionPlaceSearch;
