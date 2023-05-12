import React from "react";
import Link from "next/link";
import NextImage from "./image";
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
    leftSide: boolean;
}

const Card = ({ article, leftSide }: ArticleProps) => {

    const isSm = useMediaQuery('(max-width: 600px)');

    console.log(article.attributes)
    return (
        <Link legacyBehavior href={`/posts/${article.attributes.slug}`}>
            <a className="uk-link-reset">
                <CardContainer className="uk-card uk-card-muted">
                    <ImageContainer className="uk-card-media-top">
                        <BlogImage width={leftSide || isSm ? 600 : 200} height={leftSide || isSm ? 300 : 100} isBig={leftSide} src={process.env.NEXT_PUBLIC_STRAPI_API_URL + article.attributes.image.data.attributes.url} />
                    </ImageContainer>
                    <CardDetails
                        style={{
                            flexDirection: isSm ? 'row' : 'column',
                            gap: isSm ? 20 : 0
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
            </a>
        </Link>
    );
};

const CardContainer = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const ImageContainer = styled('div')``

const BlogImage = styled(Image)`
    object-fit: ${props => props.isBig ? 'cover' : 'contain'};
`

const CardDetails = styled('div')`
    width: 100%;
    height: 50px;
    margin: 0;
    padding: 0;
    margin-bottom: 40px;
    display: flex;
`
const CardText = styled('h5')`
    margin: 0;
    padding: 0;
    align-items: center;
`


export default Card;