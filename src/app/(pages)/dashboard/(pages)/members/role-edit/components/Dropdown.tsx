// src/app/(pages)/dashboard/(pages)/members/role-edit/components/Dropdown.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";

import ChevronDownGray from "@/assets/icons/chevron-down-gray.svg";

interface Props {
    value: string;
    options: string[];
    onSelect: (v: string) => void;
    width: number; // 버튼 너비(px)
    textColor: string; // 글자색
    showIcon?: boolean; // 드롭다운 화살표 표시 여부 (기본 true)
}

export default function Dropdown({
    value,
    options,
    onSelect,
    width,
    textColor,
    showIcon = true,
}: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative" style={{ width }}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={
                    "w-full h-[41px] bg-[#E9E9E9] rounded-full flex items-center justify-center" +
                    (showIcon ? " gap-[6px]" : "")
                }
            >
                <span className="body4_m" style={{ color: textColor }}>
                    {value}
                </span>
                {showIcon && <ChevronDownGray className="w-4 h-4" />}
            </button>

            {open && (
                <ul className="absolute left-0 top-full mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden z-10">
                    {options.map((opt) => (
                        <li key={opt}>
                            <button
                                type="button"
                                onClick={() => {
                                    onSelect(opt);
                                    setOpen(false);
                                }}
                                className="w-full px-3 py-2 text-left body4_m hover:bg-gray-100"
                            >
                                {opt}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
