import { Body } from "@/services/Matrix";
import {
  ExhibitionQuery,
  EventQuery,
  featImage,
  PublicationQuery,
  AnnouncementQuery,
} from "@/services/Thumbs";

export const RecentExhibitions = `recentExhibitions: exhibitions(
  first: 150
  where: {orderby: {order: DESC, field: DATE}}
){
  edges {
    node {
      ${ExhibitionQuery}
    }
  }
}`;

export const Exhibitions = `exhibitions(first: 150, where: {orderby: {order: DESC, field: DATE}}){
  edges {
    node {
      ${ExhibitionQuery}
    }
  }
}`;

export const PastExhibitionsFilters = `biennialTaxonomies: biennialTaxonomies{
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
exhibitionTypes: exhibitionTypes{
  edges{
    node{
      name
      slug
    }
  }
}`;

// divide into current, upcoming, past

export const Exhibition = (slug) => `exhibition (id: "${slug}", idType: SLUG) {
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
  ${Body("Exhibition")}
}`;

const mapEdges = (edges) => edges.map((e) => e.node);

export const attachExhibitionsPostFilters = (post) => {
  const typeSlugs = post.exhibitionTypes?.edges?.map((e) => e.node.slug) || [];
  const tagSlugs = post.sitewideTags?.edges?.map((e) => e.node.slug) || [];
  const focusSlugs =
    post.biennialTaxonomies?.edges?.map((e) => e.node.slug) || [];
  post.filters = [...typeSlugs, ...tagSlugs, ...focusSlugs].filter(Boolean);

  return post;
};

export const isPastExhibition = (exhibition, $moment) =>
  $moment().isAfter($moment(exhibition.pageInfo?.date)) &&
  (exhibition.pageInfo?.endDate === null ||
    $moment().isAfter($moment(exhibition.pageInfo.endDate)));

export const fetchPastExhibitionsPage = async ({
  $axios,
  $Req,
  store,
  $moment,
}) => {
  const res = await $axios($Req(`${Exhibitions} ${PastExhibitionsFilters}`));
  const data = res.data.data;

  store.commit("updatePath", [
    { title: "Home", route: "/" },
    { title: "Exhibitions", route: "/exhibitions" },
    { title: "Past", route: "/exhibitions/past" },
  ]);

  const pages = [
    { title: "Current", path: "/exhibitions" },
    { title: "Past", path: "/exhibitions/past" },
  ];

  const exhibitions = mapEdges(data.exhibitions.edges)
    .filter((exhibition) => isPastExhibition(exhibition, $moment))
    .map(attachExhibitionsPostFilters);

  return {
    pages,
    exhibitions,
    exhibitionTypes: mapEdges(data.exhibitionTypes.edges),
    biennialTaxonomies: mapEdges(data.biennialTaxonomies.edges),
    sitewideTags: mapEdges(data.sitewideTags.edges),
  };
};
