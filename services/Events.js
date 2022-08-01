import { Body } from '@/services/Matrix'

import { 
  EventQuery, 
  featImage
} from '@/services/Thumbs'

export const Events = `currentEvents: events(
  first: 40
  where: {orderby: {order: ASC, field: DATE}}
){
  edges {
    node {
      ${EventQuery}
    }
  }
}
series: eventSeries{
  edges{
    node{
      name
      slug
      ongoingSeries{
        pinSeries
      }
      
      events{
        edges{
          node{
            ${EventQuery}
          }
        }
      }
      
    }
  }
}`


export const PastEvents = `pastEvents: events(first: 100, where: {orderby: {order: ASC, field: DATE}}){
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

export const PastEventsNextQuery = cursor => `pastEvents: events(first: 50, after: "${cursor}", where: {orderby: {order: ASC, field: DATE}}){
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

export const EventTabs = `eventTabs: eventsubs{
  edges{
    node{
      title
      slug
      ${ Body('Eventsub') }
    }
  }
}`

export const Event = slug => `event (id: "${slug}", idType: SLUG) {
	title
  slug

  ${ Body('Event') }
}`