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

export const PastEventsFilters = `biennialTaxonomies: biennialTaxonomies{
  edges{
    node{
      ...on BiennialTaxonomy{
        slug
        name
      }
    }
  }
}
sitewideTags: sitewideTags(first: 400){
  edges{
    node{
      ... on SitewideTag{
        name
        slug
      }
    }
  }
}
eventTypes: eventTypes{
  edges{
    node{
      name
      slug
    }
  }
}
series: eventSeries{
  edges{
    node{
      name
      slug
    }
  }
}
`;

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

const mapEdges = (edges) => edges.map((e) => e.node);

export const attachEventsPostFilters = (post) => {
  const typeSlugs = post.eventTypes?.edges?.map((e) => e.node.slug) || [];
  const seriesSlugs = post.series?.edges?.map((e) => e.node.slug) || [];
  const tagSlugs = post.sitewideTags?.edges?.map((e) => e.node.slug) || [];
  const focusSlugs =
    post.biennialTaxonomies?.edges?.map((e) => e.node.slug) || [];

  post.filters = [
    ...typeSlugs,
    ...seriesSlugs,
    ...tagSlugs,
    ...focusSlugs,
  ].filter(Boolean);

  return post;
};

export const isPastEvent = (event, $moment) =>
  $moment().isAfter($moment(event.pageInfo?.date)) &&
  (event.pageInfo?.endDate === null ||
    $moment().isAfter($moment(event.pageInfo.endDate)));

export const fetchPastEventsPage = async ({ $axios, $Req, store, $moment }) => {
  const res = await $axios(
    $Req(`${PastEvents} ${EventTabs} ${PastEventsFilters}`)
  );
  const data = res.data.data;

  store.commit("updatePath", [
    { title: "Home", route: "/" },
    { title: "Events", route: "/events" },
    { title: "Past", route: "/events/past" },
  ]);

  const pages = [
    { title: "Current", path: "/events" },
    { title: "Past", path: "/events/past" },
    ...data.eventTabs.edges.map((e) => ({
      title: e.node.title,
      path: `/events/tab/${e.node.slug}`,
    })),
  ];

  const events = mapEdges(data.pastEvents.edges)
    .filter((event) => isPastEvent(event, $moment))
    .map(attachEventsPostFilters);

  return {
    pages,
    events,
    pageInfo: data.pastEvents.pageInfo,
    eventTypes: mapEdges(data.eventTypes.edges),
    series: mapEdges(data.series.edges),
    biennialTaxonomies: mapEdges(data.biennialTaxonomies.edges),
    sitewideTags: mapEdges(data.sitewideTags.edges),
  };
};
