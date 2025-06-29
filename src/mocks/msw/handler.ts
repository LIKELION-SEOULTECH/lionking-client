import { http, HttpResponse } from "msw";

export const handlers = [
    http.post("http://localhost:3000/api/v1/auth/login", () => {
        return HttpResponse.json({
            code: "SUCCESS",
            message: "로그인 성공",
            data: {
                accessToken:
                    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwibWVtYmVySWQiOjEsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzUwMjMwNzM0LCJleHAiOjE3NTAyMzQzMzR9.8bkljArxBqWzJ2hQXDVEYCsdQl2LpYBWxIUqQt5vJoU",
                refreshToken:
                    "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTAyMzA3MzQsImV4cCI6MTc1MDMxNzEzNH0.nOwWdGMlJXjg8K27tCSB6y5Sf0Q-JRnpliwMrwIbKzg",
                userId: 1,
                memberId: 1,
                username: "김멋사",
            },
        });
    }),

    http.get("http://localhost:3000/api/v1/members", () => {
        return HttpResponse.json({
            code: "SUCCESS",
            message: "모든 멤버 조회 성공",
            data: [
                {
                    memberId: 1,
                    username: "김멋사",
                    profileImage: "https://your-bucket.s3.amazonaws.com/profile/sample-profile.png",
                    department: "컴퓨터공학과",
                    position: "BACKEND",
                    role: "USER",
                    descriptionTag: "#긍정적인, #열정적인, #창의적인",
                    description: "13기 멋사 백엔드 파트 아기사자 김멋사입니다.",
                    techStack: "JAVA, MYSQL, REDIS, DOCKER, AWS",
                    portfolioUrls:
                        "Github:https://github.com/Jeongh00, Github:https://github.com/dohyeoplim",
                },
            ],
        });
    }),

    http.get("http://localhost:3000/api/v1/members/:memberId", ({ params }) => {
        const { memberId } = params;
        return HttpResponse.json({
            code: "SUCCESS",
            message: "멤버 상세 조회 성공",
            data: {
                memberId: Number(memberId),
                username: "김멋사",
                profileImage: "https://your-bucket.s3.amazonaws.com/profile/sample-profile.png",
                department: "컴퓨터공학과",
                position: "BACKEND",
                role: "USER",
                descriptionTag: "#긍정적인, #열정적인, #창의적인",
                description: "13기 멋사 백엔드 파트 아기사자 김멋사입니다.",
                techStack: "JAVA, MYSQL, REDIS, DOCKER, AWS",
                portfolioUrls:
                    "Github:https://github.com/Jeongh00, Github:https://github.com/dohyeoplim",
            },
        });
    }),

    http.get("http://localhost:3000/api/v1/projects", () => {
        return HttpResponse.json({
            code: "SUCCESS",
            message: "프로젝트 리스트 조회 성공",
            data: [
                {
                    id: 0,
                    thumbnailurl: "https://example.com/thumbnail.png",
                    title: "AI 챗봇 프로젝트",
                    description: "사용자 맞춤형 AI 챗봇을 개발했습니다.",
                    projectType: "IDEATHON",
                    generation: 13,
                },
            ],
        });
    }),

    http.get("http://localhost:3000/api/v1/projects/:projectId", ({ params }) => {
        const { projectId } = params;
        return HttpResponse.json({
            code: "SUCCESS",
            message: "프로젝트 상세 조회 성공",
            data: {
                id: Number(projectId),
                title: "AI 챗봇 프로젝트",
                description: "사용자 맞춤형 AI 챗봇을 개발했습니다.",
                videoLink: "https://youtube.com/watch?v=dQw4w9WgXcQ",
                generation: 13,
                projectType: "IDEATHON",
                thumbnail: "https://example.com/thumbnail.png",
                participations: ["김멋사", "이멋사"],
                landingImages: ["https://example.com/image1.png", "https://example.com/image2.png"],
                retrospections: [
                    {
                        additionalProp1: "기획과 개발의 조화가 중요했습니다.",
                        additionalProp2: "새로운 기술을 적용하면서 많이 배웠습니다.",
                        additionalProp3: "협업의 중요성을 체감했습니다.",
                    },
                ],
            },
        });
    }),
];
