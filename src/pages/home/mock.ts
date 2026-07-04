export const MOCK_CURRENT_SPACES = [
  {
    id: 1,
    spaceName: "포게더 : 작가와 방문객이 연결되는 곳",
    thumbnailUrl: "https://picsum.photos/400/300?random=10",
    linkedExhibition: {
      name: "포게더 시각 디자인 전시회",
      url: "",
      period: {
        startDate: new Date("2026-02-08"),
        endDate: new Date("2026-02-10"),
      },
      location: "홍익대학교 OO관",
    },
  },
  {
    id: 2,
    spaceName: "두 번째 스페이스",
    thumbnailUrl: "https://picsum.photos/400/300?random=11",
    linkedExhibition: {
      name: "봄 그룹 전시회",
      url: "",
      period: {
        startDate: new Date("2026-03-01"),
        endDate: new Date("2026-03-15"),
      },
      location: "서울 갤러리",
    },
  },
];

export const MOCK_SPACES = [
  {
    id: 1,
    title: "포게더 : 작가와 방문객이 연결되는 곳",
    exhibitionName: "포게더 시각 디자인 전시회",
    guestCount: 12,
    backgroundImageUrl: "https://picsum.photos/400/200?random=1",
    isPinned: false,
  },
  {
    id: 2,
    title: "포게더 : 작가와 방문객이 연결되는 곳",
    exhibitionName: "포게더 시각 디자인 전시회",
    guestCount: 8,
    backgroundImageUrl: "https://picsum.photos/400/200?random=2",
    isPinned: false,
  },
  {
    id: 3,
    title: "포게더 : 작가와 방문객이 연결되는 곳",
    exhibitionName: "포게더 시각 디자인 전시회",
    guestCount: 5,
    backgroundImageUrl: "https://picsum.photos/400/200?random=3",
    isPinned: false,
  },
];
