export const SupportPages = `supportPages: supports{
  edges{
    node{
      
      title
      slug
      
      bodyField{
        body{
        	__typename
          ...on Support_Bodyfield_Body_Footnotes{
            text
          }
        }
      }
    }
  }
}`