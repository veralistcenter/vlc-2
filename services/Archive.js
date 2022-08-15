import { 
  AnnouncementQuery,
	EventQuery,
	ExhibitionQuery,
	PublicationQuery
} from '@/services/Thumbs'

export const Archive = `exhibitions(first: 400, where: {orderby: {order: ASC, field: DATE}}){
  edges {
    node {
      ${ExhibitionQuery}
    }
  }
}

events(first: 400, where: {orderby: {order: DESC, field: DATE}}){
  
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

announcements(first: 400, where: {orderby: {order: ASC, field: DATE}}){
  edges {
    node {
      ${AnnouncementQuery}
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

taxonomy: sitewideTags(first: 400){
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