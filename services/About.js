export const AboutPages = `aboutPages: abouts{
  edges{
    node{
      
      title
      slug
      
      bodyField{
        body{
        	__typename
          ...on About_Bodyfield_Body_Footnotes{
            text
          }
        }
      }
    }
  }
}`