import { BlogContent } from "@/types";
import BlogContentRenderer from "./components/BlogContentRenderer";
import BlogShareButton from "./components/BlogShareButton";
import BlogSuggestion from "./components/BlogSuggestion";

export default async function BlogDetailPage({ params }: { params: Promise<{ blogId: string }> }) {
    const { blogId } = await params;

    // const blog = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`, {
    //     next: { revalidate: 60 },
    // }).then((res) => res.json());

    const blog: BlogContent = {
        blogId: blogId,
        title: "PM이 알아야 할 기초 지식! 3분 만에 톺아보기",
        author: {
            id: 1,
            name: "김사자",
            position: "프론트엔드",
            role: "아기사자",
        },
        thumbnail: "/static/images/placeholder_thumbnail.png",
        content: `
        <h2>코딩이란?</h2>
        <p>지금 무엇으로 이 글을 읽고 계신가요? PC? 스마트폰? 형태는 조금씩 다르지만, 컴퓨터로 보고 계실 것 같습니다. 여기에서부터 시작해 보죠.<br/>컴퓨터는 복잡해 보이지만, 결국엔 여러 부품들을 모아둔 기계들의 집합체입니다. 이 기계들을 제어하기 위해 필요한 것이 운영체제입니다. 컴퓨터와 소통하게 만들어주는 기반이죠. 윈도우, 갤럭시의 안드로이드가, 아이폰의 iOS같은 것들이 모두 운영체제입니다. 그리고 이 운영체제에 명령을 내리는 행위가 바로 코딩입니다.<br/>프로그래밍이라는 말도 많이 들어보셨을 텐데요, 코딩과 동의어로 봐도 큰 무리는 없습니다. 엑셀, 파워포인트 같은 프로그램은 결국엔 동일하게 작동하도록 미리 짜둔 코드의 집합이기 때문입니다. 코딩이란 결국 프로그램을 짜는 일이므로, ‘코딩=프로그래밍’으로 이해해도 큰 무리는 없는 것이죠. 뭐 하냐고 물었을 때 ‘요리한다’고 답하는 것과, ‘밥한다’고 답하는 것이 크게 차이 나지 않는 것처럼요</p>
        <ul>
            <li>어쩌구 리스트 1</li>
            <li>어쩌구 리스트 2</li>
            <li>어쩌구 리스트 3</li>
        </ul>

        <h2>코딩 공부 방법</h2>
        <p>지금 무엇으로 이 글을 읽고 계신가요? PC? 스마트폰? 형태는 조금씩 다르지만, 컴퓨터로 보고 계실 것 같습니다. 여기에서부터 시작해 보죠.<br/>컴퓨터는 복잡해 보이지만, 결국엔 여러 부품들을 모아둔 기계들의 집합체입니다. 이 기계들을 제어하기 위해 필요한 것이 운영체제입니다. 컴퓨터와 소통하게 만들어주는 기반이죠. 윈도우, 갤럭시의 안드로이드가, 아이폰의 iOS같은 것들이 모두 운영체제입니다. 그리고 이 운영체제에 명령을 내리는 행위가 바로 코딩입니다.<br/>프로그래밍이라는 말도 많이 들어보셨을 텐데요, 코딩과 동의어로 봐도 큰 무리는 없습니다. 엑셀, 파워포인트 같은 프로그램은 결국엔 동일하게 작동하도록 미리 짜둔 코드의 집합이기 때문입니다. 코딩이란 결국 프로그램을 짜는 일이므로, ‘코딩=프로그래밍’으로 이해해도 큰 무리는 없는 것이죠. 뭐 하냐고 물었을 때 ‘요리한다’고 답하는 것과, ‘밥한다’고 답하는 것이 크게 차이 나지 않는 것처럼요</p>
        <blockquote>어쩌구 저쩌구 인용!</blockquote>
        <img src="https://images.unsplash.com/photo-1748367959778-12d026a20a99?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Editor Preview" />

        끝~
    `,
        createdAt: new Date("2025-06-23"),
        updatedAt: new Date("2025-06-23"),
        blogType: "article",
        goal: [
            "코딩? Java? 프레임워크? 모르는 데 아는 척했던 말들을 이해할 수 있어요.",
            "코딩 공부, 어디서부터 시작하면 좋을지 알 수 있어요.",
        ],
        summary: ["어쩌구 요약 1", "어쩌구 요약 2", "어쩌구 요약 3"],
    };

    return (
        <>
            <BlogContentRenderer blog={blog} />

            <BlogShareButton
                currentBlogId={blogId}
                title={blog.title}
                description={blog.summary[0]}
            />

            <div className="relative w-full">
                <div className="absolute left-1/2 -translate-x-1/2 w-screen h-5 bg-gray-1" />
            </div>

            <BlogSuggestion currentBlogId={blogId} />
        </>
    );
}
