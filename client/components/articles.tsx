import React from "react";
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
    const leftArticlesCount = Math.ceil(articles.data.length / 5);
    const leftArticles = articles.data.slice(0, leftArticlesCount);
    const rightArticles = articles.data.slice(leftArticlesCount, articles.length);

    return (
        <div>
            <ArticlesContainer className="uk-child-width-1-2@s" data-uk-grid="true">
                <div>
                    {leftArticles.map((article, i) => {
                        return (
                            <Card
                                article={article}
                                leftSide={true}
                                key={`article__left__${article.attributes.slug}`}
                            />
                        );
                    })}
                </div>
                <div>
                    <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid="true">
                        {rightArticles.map((article, i) => {
                            return (
                                <Card
                                    article={article}
                                    leftSide={false}
                                    key={`article__left__${article.attributes.slug}`}
                                />
                            );
                        })}
                    </div>
                </div>
            </ArticlesContainer>
        </div>
    );
};

const ArticlesContainer = styled('div')`
    margin: auto;
    text-align: center;
`

export default Articles;