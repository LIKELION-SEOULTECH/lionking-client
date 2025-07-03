import ArchiveProjectsBanner from "./components/ArchiveProjectsBanner";
import ProjectCardGrid from "./components/ProjectCardGrid/ProjectCardGrid";

export const revalidate = 60;

export default function ArchiveProjectsPage() {
    return (
        <div className="w-full">
            <ArchiveProjectsBanner />
            <ProjectCardGrid />
        </div>
    );
}
