import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import styled from 'styled-components';
import {useMediaQuery} from "usehooks-ts";

type ArticleProps = {
    article: {
        attributes: {
            title: string;
            slug: string;
            image: {
                data: {
                    attributes: {
                        url: string;
                    }
                }
            };
            category: {
                data: {
                    attributes: {
                        name: string;
                    }
                }
            }
        },
    },
    index: number;
    showBig: boolean;
    bigIndex: number;
    setBigIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Card = ({ article, showBig, setBigIndex, index }: ArticleProps) => {
    const isSm = useMediaQuery('(max-width: 600px)');
    const cardRef = useRef<HTMLDivElement>();
    const [isHovered, setIsHovered] = useState(false);

    if (isSm) {
        showBig = true;
    }
    useEffect(() => {

    }, [isSm])


    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const onScroll = () => {
        if (cardRef?.current) {
            //@ts-ignore
            const {top: top} = cardRef?.current?.getBoundingClientRect();
            if(top < 500 && top > 0) {
                setBigIndex(index);
            }
        }
    }

    return (
        <CardContainer
            className="uk-card uk-card-muted"
            ref={isSm ? null : cardRef}
            style={{filter: showBig ? 'none' : 'blur(4px)',}}
        >
            <ImageContainer className="uk-card-media-top">
                <Link legacyBehavior href={`/articles/${article.attributes.slug}`}>
                    <a className="uk-link-reset">
                        <BlogImage
                            alt="hello"
                            width={showBig || isSm ? 600 : 200}
                            height={showBig || isSm ? 300 : 100}
                            src={process.env.NEXT_PUBLIC_STRAPI_API_URL + article.attributes.image.data.attributes.url}
                            onMouseOver={() => setIsHovered(true)}
                            onMouseOut={() => setIsHovered(false)}
                        />
                        {isHovered && showBig && <HelperText>Click to read more</HelperText>}
                    </a>
                </Link>
            </ImageContainer>
            <CardDetails
                style={{
                    flexDirection: isSm ? 'row' : 'column',
                    gap: isSm ? 20 : 0,
                }}
                className="uk-card-body">
                <CardText id="category">
                    {article.attributes.category.data.attributes.name}
                </CardText>
                <CardText id="title" className="uk-text-large">
                    {article.attributes.title}
                </CardText>
            </CardDetails>
        </CardContainer>
    );
};

const CardContainer = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const CardDetails = styled('div')`
    width: 100%;
    height: auto;
    margin-bottom: 40px;
    padding: 10px;
    display: flex;
    background: none;
`

const CardText = styled('h5')`
    margin: 0;
    padding: 0;
    align-items: center;
`

const ImageContainer = styled('div')``

const HelperText = styled('div')`
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 90px;
  background: rgba(0,0,0,0.7);
  border-radius: 20px;
  width: 300px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 30px;
  color: white;
  pointer-events: none;
`


const BlogImage = styled(Image)`
    object-fit: cover;
    border-radius: 20px;
    transition: all 0.1s ease-in-out;
`

export default Card;