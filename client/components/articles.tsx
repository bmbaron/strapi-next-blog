import React, {useEffect, useRef, useState} from "react";
import Card from "./card";
import styled from "styled-components";
import {useMediaQuery} from "usehooks-ts";

type ArticlesProps = {
    articles: [
        {
            length: number,
            attributes: {
                title: string;
                slug: string;
                image: any;
                category: {
                    data: {
                        attributes: {
                            name: string;
                        }
                    }
                }
            },
        }
    ]
}

const Articles = ({ articles }: any) => {
    const isSm = useMediaQuery('(max-width: 600px)');
    const [bigIndex, setBigIndex] = useState(0);
    return (
        <ArticlesContainer
            style={{paddingBottom: isSm ? '20%' : '30%'}}
        >
            {articles.data.map((article, index) => {
                return (
                    <Card
                        article={article}
                        showBig={bigIndex === index}
                        key={`article__${article.attributes.slug}`}
                        index={index}
                        setBigIndex={setBigIndex}
                    />
                );
            })}
        </ArticlesContainer>
    );
};

const ArticlesContainer = styled('div')`
    margin: auto;
    padding-top: 10%;
    text-align: center;
`

export default Articles;