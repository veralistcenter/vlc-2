import { featImage } from '@/services/Thumbs'

export const FellowPages = `
fellowships{
  edges{
    node{
      title
      slug
      bodyField{
        body{
          __typename
          ... on Fellowship_Bodyfield_Body_RelatedNetwork{
            title
            network{
              __typename
              ...on Network{
                title
                slug
                networkTypes{
                  edges{
                    node{
                      name
                    }
                  }
                }
                ${featImage}
              }
            }
          }

          ... on Fellowship_Bodyfield_Body_Richtext{
            text
            title
          }
        }
      }
    }
  }
}`