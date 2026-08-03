interface ArtworkDetailMock {
  title: string;
  artistName: string;
  description: string;
  imageUrl: string;
  video: {
    title: string;
    youtubeVideoId: string;
  };
}

export const MOCK_ARTWORK_DETAIL: ArtworkDetailMock = {
  title:
    "작품 제목이 들어가는 텍스트입니다작품 제목이 들어가는 텍스트입니다작품 제목이 들",
  artistName: "김작가",
  description:
    "포게더는 우아한형제들의 교육 프로그램 우아한테크코스에서 전시에 진심인 학생 개발자들이 모여 만든 프로젝트입니다.\n\n졸업전시를 준비하는 학생분들의 작품이 더 많은 방문객에게 닿고, 더 따뜻한 메시지와 기록을 남길 수 있도록 기술을 통해 전시 경험을 확장하는 것을 목표로 하고 있습니다.\n\n포게더는 단지 작품을 보여주는 공간이 아니라, 누군가의 노력과 흔적, 마음이 쌓여 하나의 전시로 완성되는 과정을 함께 담고자 합니다.\n\n여러분의 시선과 참여 또한 이 전시의 한 부분이 됩니다.",
  imageUrl: "https://picsum.photos/328/200?random=20",
  video: {
    title: "작품 소개 영상",
    youtubeVideoId: "dQw4w9WgXcQ",
  },
};
