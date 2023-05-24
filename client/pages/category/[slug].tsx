import Category from "@/components/category";

const URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const Blog = (data) => {
    return (
        <Category data={data} />
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
                categories{
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
    const resCategories = await fetch(`${URL}/graphql`, fetchParams);
    const categoryData = await resCategories.json();
    const paths = categoryData.data.categories.data.map((category) => {
        return { params: {slug: category.attributes.slug }}
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
                categories(filters: { slug : {contains: "${params.slug}" }} )
                {
                    data{
                        attributes{ 
                            name
                            slug
                            articles{
                                data{
                                    attributes{
                                        title
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
    const resCategories = await fetch(`${URL}/graphql`, fetchParams);
    const categoriesData = await resCategories.json();

    return {
        props: categoriesData?.data?.categories?.data[0]?.attributes || {test: true},
        revalidate: 10
    }
}



export default Blog