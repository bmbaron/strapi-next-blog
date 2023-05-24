import React from "react";
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'

type CategoryProps = {
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

const Category = ({data}) => {

    // const {
    //     title,
    //     image,
    //     description,
    //     content,
    //     longContent
    // } = data;

    const URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    console.log(data)
    return (
        <CategoryContainer>
            {data.name}
            <br />
            {data.articles.data.map((article) => (<ArticleCard key={Math.random()}>{article.attributes.title}</ArticleCard>))}
        </CategoryContainer>
    );
};

const CategoryContainer = styled('div')`
  margin-top: 100px;
  text-align: center;
`

const ArticleCard = styled('div')`
    margin: auto;
    text-align: center;
    background-color: lightgrey;
    height: 100px;
    width: 200px;
    margin-top: 30px;
    padding: 20px;
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

export default Category;