export async function upload_to_s3(file: File, prefix: string = "uploads") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("prefix", prefix);

    const res = await fetch("/api/s3", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error("파일 업로드에 실패했습니다.");
    }

    const { publicUrl } = await res.json();

    return publicUrl;
}
