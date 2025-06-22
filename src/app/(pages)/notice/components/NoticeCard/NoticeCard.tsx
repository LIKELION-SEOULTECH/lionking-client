interface Notice {
    id: number;
    title: string;
    createdAt: string;
}

export default function NoticeCard({ notice }: { notice: Notice }) {
    return (
        <tr className="border-b">
            <td className="py-2">{notice.id}</td>
            <td className="py-2">{notice.title}</td>
            <td className="py-2">{notice.createdAt}</td>
        </tr>
    );
}
