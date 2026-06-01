import { Body } from "@/services/Matrix";

import {
  EventQuery,
  ExhibitionQuery,
  PublicationQuery,
  AnnouncementQuery,
  featImage,
} from "@/services/Thumbs";

export const Events = `currentEvents: events(
  first: 40
  where: {orderby: {order: DESC, field: DATE}}
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
}`;

export const PastEvents = `pastEvents: events(first: 200, where: {orderby: {order: DESC, field: DATE}}){
  pageInfo {
    hasNextPage
    endCursor
  }
  edges {
    node {
      ${EventQuery}
    }
  }
}`;

export const PastEventsNextQuery = (
  cursor
) => `pastEvents: events(first: 250, after: "${cursor}", where: {orderby: {order: DESC, field: DATE}}){
  pageInfo {
    hasNextPage
    endCursor
  }
  edges {
    node {
      ${EventQuery}
    }
  }
}`;

export const EventTabs = `eventTabs: eventsubs{
  edges{
    node{
      title
      slug
      ${Body("Eventsub")}
    }
  }
}`;

export const Event = (
  slug,
  preview
) => `event (id: "${slug}", idType: SLUG ${preview}) {
	title
  slug

  eventTypes{
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
  
  livestreamIframe{
    displayLivestreamIframe
    iframeCode
  }
  
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
      ... on Announcement{
        ${AnnouncementQuery}
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

      associatedProject{
        ...on Project{
          title
          slug
        }
      }
    }
    
  }

  ${Body("Event")}
}`;
