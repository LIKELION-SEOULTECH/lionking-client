import { PostPreviewMetadata } from "./../types/index";

const posts: PostPreviewMetadata[] = [
    {
        postId: 1,
        postType: "article",
        part: "디자인",
        title: "피그마 고인물처럼 보이는 법",
        description: "피그마 기본부터 심화까지",
        date: "2025.05.23",
        authorName: "김사자",
        authorId: "1",
    },
    {
        postId: 2,
        postType: "article",
        part: "백엔드",
        title: "우리 동아리 들어올려면 이건 알아야함",
        description: "RESTful API 설계하기",
        date: "2025.05.13",
        authorName: "김어흥",
        authorId: "2",
    },
    {
        postId: 3,
        postType: "session",
        part: "백엔드",
        title: "도커 잘쓴다는 소리 듣고싶나요",
        description: "Docker를 활용한 CI/CD 파이프라인 구축하기",
        date: "2025.05.09",
        authorName: "김냥냥",
        authorId: "3",
    },
    {
        postId: 4,
        postType: "session",
        part: "프론트엔드",
        title: "바벨이 뭔지는 아시나요",
        description: "자바스크립트 컴파일러 이해하기",
        date: "2025.05.20",
        authorName: "김어흥",
        authorId: "2",
    },
    {
        postId: 5,
        postType: "article",
        part: "디자인",
        title: "애플은 어떻게 디자인하는가",
        description: "HIG 하나씩 뜯어보기",
        date: "2025.05.15",
        authorName: "김사자",
        authorId: "1",
    },
];

export default posts;
