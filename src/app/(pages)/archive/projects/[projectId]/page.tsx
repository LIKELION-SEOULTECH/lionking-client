import ProjectDetailMeta from "./components/ProjectDetailMeta";
import ProjectDetailImages from "./components/ProjectDetailImages";
import ProjectDetailRecap, { ProjectDetailRecapItemProps } from "./components/ProjectDetailRecap";

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = await params;

    // const project = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
    //     next: { revalidate: 60 },
    // }).then((res) => res.json());

    const projectName = `서비스 ${projectId}`; // 임시

    const images = [
        "/static/images/placeholder_thumbnail.png",
        "/static/images/placeholder_thumbnail.png",
        "/static/images/placeholder_thumbnail.png",
    ]; // 임시

    const mockRecaps: ProjectDetailRecapItemProps[] = [
        {
            author: { id: 1, name: "김사자", position: "디자인", role: "아기사자" },
            content:
                "역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상 등 회고적는",
        },
        {
            author: { id: 2, name: "김어흥", position: "프론트엔드", role: "아기사자" },
            content:
                "역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상 등 회고적는",
        },
        {
            author: { id: 3, name: "김야옹", position: "백엔드", role: "아기사자" },
            content:
                "역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공드간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상.. 등 회고를 적는 공간입니다. 역할에 대한 ..프로젝트에 대한 감상 등 회고적는",
        },
    ];

    return (
        <>
            <ProjectDetailMeta projectName={projectName} />

            <ProjectDetailImages images={images} />

            <ProjectDetailRecap recaps={mockRecaps} />
        </>
    );
}
