"use client";

import { useEffect, useState } from "react";

export default function WithMockServer({ children }: { children?: React.ReactNode }) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const shouldMock = process.env.NODE_ENV === "development";

        if (!shouldMock) {
            setReady(true);
            return;
        }

        const init = async () => {
            const initMsw = await import("./index").then((res) => res.initMsw);
            await initMsw();
            setReady(true);
        };

        if (!ready) {
            init();
        }
    }, [ready]);

    if (!ready) {
        return <p className="text-sm text-gray-500">🧪 Mock server initializing...</p>;
    }

    return <>{children}</>;
}
