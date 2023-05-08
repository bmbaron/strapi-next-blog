import { getStrapiMedia } from "../lib/media";
import NextImage from "next/image";

declare type ImageProps = {
    image: {
        data: {
            attributes: {
                alternativeText: string;
                width: number;
                height: number;
            }
        }
    }
}

const Image = ({ image }: ImageProps) => {
    const { alternativeText, width, height } = image.data.attributes;

    return (
        <NextImage
            layout="responsive"
            width={width}
            height={height}
            objectFit="contain"
            src={getStrapiMedia(image)}
            alt={alternativeText || ""}
        />
    );
};

export default Image;