import {useRouter} from "next/router";

const URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;



const Blog = (data) => {
    return (
        <>
            <h1>{data.title}</h1>
            <h2>{data.description}</h2>
            <p>{data.content}</p>
        </>
    )
}


export async function getStaticPaths() {
    console.log('getting paths...');
    const fetchParams = {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `{
              articles{
                data{
                  attributes{
                    slug
                  }
                }
              }
            }    
            `
        })
    }
    const resArticles = await fetch(`${URL}/graphql`, fetchParams);
    const articlesData = await resArticles.json();
    console.log(articlesData.data.articles.data)
    const paths = articlesData.data.articles.data.map((article) => {
        return { params: {slug: article.attributes.slug }}
    })
    return {
        paths: [],
        fallback: true,
    }
}

export async function getStaticProps({params}) {
    const fetchParams = {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `{
                articles(filters: { slug : {contains: "${params.slug}" }} )
                {
                    data{
                        attributes{ 
                            slug
                            title
                            description
                            content
                        }
                    }
                }                    
            }    
            `
        })
    }
    const resArticle = await fetch(`${URL}/graphql`, fetchParams);
    const articleData = await resArticle.json();

    console.log(articleData)

    return {
        props: articleData.data.articles.data[0].attributes,
        revalidate: 10
    }
}



export default Blog