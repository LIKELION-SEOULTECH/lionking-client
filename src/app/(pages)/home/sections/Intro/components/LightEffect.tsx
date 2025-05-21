"use client";

import { motion } from "motion/react";

export default function LightEffect() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-10]">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
                className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-8 size-[250px] rounded-t-full blur-2xl"
                style={{
                    background:
                        "radial-gradient(circle at center center, rgba(225,255,255,1) 0%, rgba(255,118,16,0) 40%)",
                }}
            />

            <motion.div
                initial={{ scale: 0.5, opacity: 0.2 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
                className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-8 size-[800px] rounded-t-full blur-2xl"
                style={{
                    background:
                        "radial-gradient(circle at center center, rgba(225,119,16,1) 0%, rgba(21,21,21,0) 70%)",
                }}
            />

            <motion.div
                initial={{ width: "150px", opacity: 0.2 }}
                animate={{ width: "630px", opacity: 0.8 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 h-[2px] bg-orange-main"
            />

            <div className="absolute bottom-0 left-0 w-full h-8 bg-gray-8" />
            {/* <div className="absolute w-screen bottom-0 left-1/2 -translate-x-1/2 h-8 bg-gray-8 overflow-hidden">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0.2 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
                    className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-8 size-[800px] rounded-t-full blur-2xl"
                    style={{
                        background:
                            "radial-gradient(circle at center top, rgba(225,119,16,0.4) 0%, rgba(21,21,21,0) 70%)",
                    }}
                />
            </div> */}
        </div>
    );
}
