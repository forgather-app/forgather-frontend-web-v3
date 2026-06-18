import { useMemo, useState } from "react";

import TextField from "@/components/@common/TextField/TextField";
import { CONSTRAINTS } from "@/constants/constraints";
import { validateArtistName } from "@/pages/signUp/validate/validateArtistName";
import ItemLayout from "@/shared/funnel/ItemLayout";
import * as S from "./ArtistNameStep.styles";

interface ArtistNameStepProps {
  onNext: (data: { artistName: string }) => void;
}

const ArtistNameStep = ({ onNext }: ArtistNameStepProps) => {
  const [artistName, setArtistName] = useState("");

  const isValid = useMemo(() => validateArtistName(artistName), [artistName]);

  return (
    <ItemLayout
      text="다음"
      disabled={!isValid}
      onClick={() => onNext({ artistName: artistName.trim() })}
    >
      <S.FieldGroup>
        <S.Label>닉네임</S.Label>
        <TextField
          variant="count"
          value={artistName}
          maxCount={CONSTRAINTS.SIGN_UP.ARTIST_NAME_MAX_LENGTH}
          placeholder="닉네임을 입력해주세요"
          onChange={(e) => setArtistName(e.target.value)}
          aria-label="닉네임"
          autoFocus
        />
      </S.FieldGroup>
    </ItemLayout>
  );
};

export default ArtistNameStep;
