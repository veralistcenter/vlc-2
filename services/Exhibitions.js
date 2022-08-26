import { Body } from '@/services/Matrix'
import { ExhibitionQuery, EventQuery, featImage, PublicationQuery } from '@/services/Thumbs'

export const RecentExhibitions = `recentExhibitions: exhibitions(
  first: 150
  where: {orderby: {order: DESC, field: DATE}}
){
  edges {
    node {
      ${ExhibitionQuery}
    }
  }
}`

export const Exhibitions = `exhibitions(first: 150, where: {orderby: {order: DESC, field: DATE}}){
  edges {
    node {
      ${ExhibitionQuery}
    }
  }
}`

// divide into current, upcoming, past

export const Exhibition = slug => `exhibition (id: "${slug}", idType: SLUG) {
  
  title
  slug

  exhibitionTypes{
    edges{
      node{
        name
        slug
      }
    }
  }

  sitewideTags{
    edges{
      node{
        name
        slug
      }
    }
  }

  ${featImage}
  
  
  related{
    relatedPages{
      __typename
      ...on Event{
        ${EventQuery}
      }
      ...on Exhibition{
        ${ExhibitionQuery}
      }
      ... on Publication{
        ${PublicationQuery}
      }
    }
    relatedPagesSize
    relatedPagesTitle
  }
  
  networkRelation{
    associatedNetwork{
      ...on Network{
        title
        slug
      }
    }
  }
  
  pageInfo{
    date
    endDate
    timeStart
    timeEnd
    timeOverride
    
    previewInfo{
      primaryDescription
      secondaryDescription
      button{
        buttonLink
        buttonName
      }
      
      associatedBiennial{
        ...on Biennial{
          title
          slug
        }
      }
    }
    
  }

  ${ Body('Exhibition') }
}`