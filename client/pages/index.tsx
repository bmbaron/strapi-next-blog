import React from "react";
import Articles from "../components/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { fetchAPI } from "../lib/api";
import {useMediaQuery} from "usehooks-ts";
import styled from "styled-components";

type IndexProps = {
    articles: any,
    categories: any;
    homepage: any;
}
const Home = ({articles, categories, homepage}: IndexProps) => {

    const isSm = useMediaQuery('(max-width: 600px)');

    return (
        <Layout categories={categories}>
            <Seo seo={homepage.data.attributes.seo} />
            <div className="uk-section">
                <ArticlesWrapper style={{textAlign: isSm ? 'center' : 'unset'}} className="uk-container uk-container-large">
                    <h1 style={{fontSize: isSm ? 30 : 70}}>{homepage.data.attributes.hero.title}</h1>
                    <Articles articles={articles} />
                </ArticlesWrapper>
            </div>
        </Layout>
    );
};

const URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
export async function getStaticProps() {
    const fetchArticlesParams = {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `{
              articles{
                data{
                  attributes{
                    title
                    description
                    content
                    slug
                    image{
                      data{
                        attributes{
                          url
                        }
                      }
                    }
                    category{
                        data{
                           attributes{
                            name
                           }
                        }  
                    }
                  }
                }
              }
            }    
            `
        })
    }
    const resArticles = await fetch(`${URL}/graphql`, fetchArticlesParams);
    const articlesData = await resArticles.json();

    const fetchCategoriesParams = {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `{
                categories{
                    data{
                        id
                        attributes{
                          name
                          slug
                        }
                    }
                }
            }    
            `
        })
    }
    const resCategories = await fetch(`${URL}/graphql`, fetchCategoriesParams);
    const categoriesData = await resCategories.json();

    const fetchHomeParams = {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `{
              homepage{
                data{
                  id
                  attributes{
                    seo{
                      metaTitle
                      metaDescription
                      shareImage{
                        data{
                          attributes{
                            url
                          }
                        }
                      }
                    }
                    hero{
                      title
                    }
                  }
                }
              }
            }    
            `
        })
    }
    const resHome = await fetch(`${URL}/graphql`, fetchHomeParams);
    const homeData = await resHome.json();

    return {
        props: {
            articles: articlesData.data.articles,
            categories: categoriesData.data.categories,
            homepage: homeData.data.homepage,
        }
    }
}

const ArticlesWrapper = styled('div')`

    
`

export default Home;