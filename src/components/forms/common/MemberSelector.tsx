import { useState, useRef, KeyboardEvent, useEffect } from "react";
import { useField } from "formik";
import { LoaderCircle, X } from "lucide-react";
import { Member } from "@/types";

export default function MemberSelector({ name }: { name: string }) {
    const [field, , helpers] = useField<Member[]>(name);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isComposing, setIsComposing] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [allMembers, setAllMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedMembers = field.value || [];

    const filteredMembers = allMembers.filter(
        (member) =>
            !selectedMembers.find((m) => m.id === member.id) &&
            (member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (member.position &&
                    member.position.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await fetch("/api/members", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const json: { data: Member[] } = await res.json();
                const members: Member[] = json.data;

                setAllMembers(members);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    useEffect(() => {
        setSelectedIndex(0);
    }, [searchTerm]);

    const addMember = (member: Member) => {
        helpers.setValue([...selectedMembers, member]);
        if (!isComposing) {
            setSearchTerm("");
        }
        inputRef.current?.focus();
    };

    const removeMember = (memberId: number) => {
        helpers.setValue(selectedMembers.filter((m) => m.id !== memberId));
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (isComposing) return;

        if (e.key === "Backspace" && searchTerm === "" && selectedMembers.length > 0) {
            e.preventDefault();
            const lastMember = selectedMembers[selectedMembers.length - 1];
            removeMember(lastMember.id);
            return;
        }

        if (!isOpen || filteredMembers.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) => (prev < filteredMembers.length - 1 ? prev + 1 : 0));
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredMembers.length - 1));
                break;
            case "Enter":
                e.preventDefault();
                if (filteredMembers[selectedIndex]) {
                    addMember(filteredMembers[selectedIndex]);
                }
                break;
            case "Escape":
                e.preventDefault();
                setIsOpen(false);
                setSearchTerm("");
                break;
        }
    };

    const handleContainerClick = (e: React.MouseEvent) => {
        if (
            e.target === e.currentTarget ||
            (e.target as HTMLElement).classList.contains("input-area")
        ) {
            inputRef.current?.focus();
        }
    };

    return (
        <div className="w-full relative" ref={containerRef}>
            <div
                className="min-h-[55px] px-7 py-3 border border-gray-2 rounded-[10px] focus-within:ring-1 focus-within:ring-orange-main focus-within:border-transparent transition-all duration-200 cursor-text flex items-center flex-wrap gap-2"
                onClick={handleContainerClick}
            >
                {selectedMembers.map((member) => (
                    <button
                        key={member.id}
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeMember(member.id);
                        }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] hover:bg-gray-1 border border-gray-2 cursor-pointer transition-colors duration-200 shrink-0"
                    >
                        <span className="text-sm text-gray-900">{member.name}</span>
                        <X className="w-4 h-4 text-black" />
                    </button>
                ))}

                <div className="input-area flex-1 min-w-[150px]">
                    <div className="flex items-center gap-2 w-full">
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setIsOpen(true);
                            }}
                            onCompositionStart={() => setIsComposing(true)}
                            onCompositionEnd={() => setIsComposing(false)}
                            onFocus={() => setIsOpen(true)}
                            onBlur={() => {
                                setTimeout(() => setIsOpen(false), 200);
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder={
                                selectedMembers.length === 0
                                    ? "한 명 이상의 사용자를 선택하세요"
                                    : ""
                            }
                            className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
                        />
                        {loading && <LoaderCircle className="animate-spin text-gray-4 size-6" />}
                    </div>
                </div>
            </div>

            {error && <p className="text-red-500 body5_r mt-2">{error}</p>}

            {!loading && !error && filteredMembers.length === 0 && (
                <p className="text-gray-4 body5_r mt-2">검색 결과가 없습니다.</p>
            )}

            {isOpen && filteredMembers.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredMembers.map((member, index) => (
                        <button
                            key={member.id}
                            type="button"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                addMember(member);
                            }}
                            className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left ${
                                index === selectedIndex ? "bg-gray-100" : ""
                            }`}
                        >
                            <div className="flex-1">
                                <span className="text-sm font-medium text-gray-900">
                                    {member.name}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">
                                    {member.position}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
