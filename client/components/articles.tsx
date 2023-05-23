import React, {useEffect, useRef, useState} from "react";
import Card from "./card";
import styled from "styled-components";

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
    const [bigIndex, setBigIndex] = useState(0);
    return (
        <ArticlesContainer>
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
    padding-bottom: 20%;
    text-align: center;
`

export default Articles;