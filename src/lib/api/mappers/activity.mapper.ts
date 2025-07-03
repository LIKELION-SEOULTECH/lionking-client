import { getFullS3Url } from "@/lib/utils";
import { GalleryFormValues } from "@/components/forms/configs/galleryFormConfig";
import { News } from "@/types";

export async function activityToGalleryFormValues(activity: News): Promise<GalleryFormValues> {
    return {
        title: activity.title,
        content: activity.content,
        photos: activity.contentMedia.map((media) => getFullS3Url(media.s3Key)),
    };
}
