"use client";

import { useState } from "react";
import BlogTypeSelector from "./components/BlogTypeSelector";
import { BlogTypeFilters } from "@/types";

export default function BlogList() {
    const [selectedBlogType, setSelectedBlogType] = useState<BlogTypeFilters>("세션");

    return (
        <>
            <BlogTypeSelector selectedBlogType={selectedBlogType} onChange={setSelectedBlogType} />

            {selectedBlogType}
        </>
    );
}
