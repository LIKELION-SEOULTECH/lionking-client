import { http, HttpResponse } from "msw";
import news from "./data/news.json";

export const handlers = [
    http.get("/api/v1/member", () => {
        return HttpResponse.json({
            data: [
                {
                    id: 1,
                    name: "김사자",
                    major: "컴퓨터공학과",
                    userTags: ["프론트엔드", "운영진", "학술부"],
                },
                {
                    id: 2,
                    name: "김어흥",
                    major: "시각디자인학과",
                    userTags: ["디자인", "운영진", "홍보부"],
                },
                {
                    id: 3,
                    name: "김야옹",
                    major: "금속공예디자인학과",
                    userTags: ["기획", "아기사자"],
                },
                {
                    id: 4,
                    name: "김호랭",
                    major: "컴퓨터공학과",
                    userTags: ["백엔드", "아기사자"],
                },
                {
                    id: 5,
                    name: "김뀨뀨",
                    major: "인공지능학과",
                    userTags: ["프론트엔드", "아기사자"],
                },
            ],
        });
    }),
    http.get("/api/gallery/news", () => {
        return HttpResponse.json(news);
    }),

    http.get("/api/gallery/news/:id", ({ params }) => {
        const { id } = params;
        const item = news.find((n) => n.id === id);
        return item ? HttpResponse.json(item) : new HttpResponse(null, { status: 404 });
    }),
];
