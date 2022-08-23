import { 
  AnnouncementQuery,
	EventQuery,
	ExhibitionQuery,
	PublicationQuery
} from '@/services/Thumbs'

export const Archive = `exhibitions(first: 150, where: {orderby: {order: ASC, field: DATE}}){
  edges {
    node {
      ${ExhibitionQuery}
    }
  }
}

events(first: 200, where: {orderby: {order: DESC, field: DATE}}){
  
  pageInfo {
    hasNextPage
    endCursor
  }

  edges {
    node {
      ${EventQuery}
    }
  }
}

publications(first: 400, where: {orderby: {order: ASC, field: TITLE}}){
  edges {
    node {
      ${PublicationQuery}
    }
  }
}

announcements(first: 200, where: {orderby: {order: ASC, field: TITLE}}){
  edges {
    node {
      ${AnnouncementQuery}
    }
  }
}

taxonomy: sitewideTags(first: 150){
  edges{
    node{
      ... on SitewideTag{
        name
        slug
      }
    }
  }
}
`

export const ArchiveMoreEvents = cursor => `events(first: 400, after: "${cursor}", where: {orderby: {order: DESC, field: DATE}}){
  pageInfo {
    hasNextPage
    endCursor
  }
  edges {
    node {
      ${EventQuery}
    }
  }
}`

export const FeaturedArchive = `

  events(first: 200){
    edges{
      node{
        ${EventQuery}
      }
    }
  }

  publications(first: 40 ){
    edges{
      node{
        ${PublicationQuery}
      }
    }
  }

  exhibitions(first: 40 ){
    edges{
      node{
        ${ExhibitionQuery}
      }
    }
  }`