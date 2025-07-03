import type { NoticeMock } from "@/__mocks__/noticeMock";
import ImportantBanner from "./ImportantBanner";
import NormalBanner from "./NormalBanner";

interface Props {
    notice: NoticeMock;
}

export default function NoticeBanner({ notice }: Props) {
    return notice.isImportant ? (
        <ImportantBanner notice={notice} />
    ) : (
        <NormalBanner notice={notice} />
    );
}
