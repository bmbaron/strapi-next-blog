import React from "react";
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'

type ArticleProps = {
    data: {
        title: string;
        description: string;
        content: any;
        image: {
            data: {
                attributes: {
                    url: string;
                }
            }
        };
        longContent: boolean;
    }
}

const Article = ({data}: ArticleProps) => {

    const {
        title,
        image,
        description,
        content,
        longContent
    } = data;

    const URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    return (
        <ArticleContainer>
            {!longContent &&
                <>
                    <Title>{title}</Title>
                    <img src={URL + image?.data?.attributes?.url} alt={'image'}/>
                    <SubTitle>{description}</SubTitle>
                </>
            }
            <TextContent rehypePlugins={[rehypeRaw]}>{content}</TextContent>
        </ArticleContainer>
    );
};

const ArticleContainer = styled('div')`
  margin: auto;
  text-align: center;
  max-width: 50%;
  @media(max-width: 1000px) {
    max-width: 90%;
  }
`

const Title = styled('h1')`
    
`

const SubTitle = styled('h2')`
    
`

const TextContent = styled(ReactMarkdown)`
  text-align: left;
  h1, a {
    text-align: center;
  }
  @media(max-width: 700px) {
    .iframe-video {
      transform: scale(0.8);
      margin-left: -50px;
    }  
  }  
`

export default Article;