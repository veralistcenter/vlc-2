import {
  AnnouncementQuery,
  EventQuery,
  ExhibitionQuery,
  PublicationQuery,
} from "@/services/Thumbs";

export {
  filterByGroups,
  filterByGroups as filterArchivePosts,
} from "@/services/Filters";

export const Archive = `exhibitions(first: 150, where: {orderby: {order: ASC, field: DATE}}){
    edges {
      node {
        ${ExhibitionQuery}
      }
    }
  }
  events(first: 150, where: {orderby: {order: DESC, field: DATE}}){
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
  publications(first: 200, where: {orderby: {order: ASC, field: TITLE}}){
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
  biennialTaxonomies: biennialTaxonomies{
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
`;

export const ArchiveMoreEvents = (
  cursor
) => `events(first: 400, after: "${cursor}", where: {orderby: {order: DESC, field: DATE}}){
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
  }`;

const mapEdges = (edges) => edges.map((e) => e.node);

export const ARCHIVE_TYPE_PATHS = {
  Exhibition: "exhibitions",
  Announcement: "announcement",
  Event: "events",
  Publication: "publications",
};

export const ARCHIVE_POST_TYPES = [
  { name: "Exhibition", slug: "exhibitions" },
  { name: "Event", slug: "events" },
  { name: "Publication", slug: "publications" },
  { name: "Announcement", slug: "announcement" },
];

export const getArchivePostPath = (type) => ARCHIVE_TYPE_PATHS[type] || type;

export const getArchivePostTypeSlug = (post) =>
  ARCHIVE_TYPE_PATHS[post.__typename] || post.__typename?.toLowerCase();

export const attachArchivePostFilters = (post) => {
  const tagSlugs = post.sitewideTags?.edges?.map((e) => e.node.slug) || [];
  const focusSlugs =
    post.biennialTaxonomies?.edges?.map((e) => e.node.slug) || [];

  post.filters = [
    getArchivePostTypeSlug(post),
    ...tagSlugs,
    ...focusSlugs,
  ].filter(Boolean);

  return post;
};

export const getArchivePostDate = (post) =>
  post?.pageInfo?.date || "2000-01-01";

export const getArchivePostYear = (post) => {
  const date = post?.pageInfo?.date;
  if (!date) {
    return "Unsorted";
  }

  const year = date.slice(0, 4);
  return /^\d{4}$/.test(year) ? year : "Unsorted";
};

export const getArchivePostLetter = (post) => {
  const title = (post?.title || "").replace(/[^a-z]/gi, "");
  return (title[0] || "A").toUpperCase();
};

export const groupPostsByYear = (posts) => {
  const groups = new Map();

  [...posts]
    .sort((a, b) => getArchivePostDate(b).localeCompare(getArchivePostDate(a)))
    .forEach((post) => {
      const year = getArchivePostYear(post);
      if (!groups.has(year)) {
        groups.set(year, []);
      }
      groups.get(year).push(post);
    });

  return [...groups.entries()]
    .sort(([yearA], [yearB]) => yearB.localeCompare(yearA))
    .map(([year, posts]) => ({ year, posts }));
};

export const groupPostsByLetter = (posts) => {
  const groups = new Map();

  [...posts]
    .sort((a, b) =>
      getArchivePostLetter(a).localeCompare(getArchivePostLetter(b))
    )
    .forEach((post) => {
      const letter = getArchivePostLetter(post);
      if (!groups.has(letter)) {
        groups.set(letter, []);
      }
      groups.get(letter).push(post);
    });

  return [...groups.entries()].map(([letter, posts]) => ({ letter, posts }));
};

export const fetchArchivePage = async ({ $axios, $Req, store }) => {
  const res = await $axios($Req(Archive));
  const data = res.data.data;

  store.commit("updatePath", [
    { title: "Home", route: "/" },
    { title: "Archive", route: "/archive" },
  ]);

  const withFilters = (edges) => mapEdges(edges).map(attachArchivePostFilters);

  return {
    exhibitions: withFilters(data.exhibitions.edges),
    events: withFilters(data.events.edges),
    eventInfo: data.events.pageInfo,
    publications: withFilters(data.publications.edges),
    announcements: withFilters(data.announcements.edges),
    biennialTaxonomies: mapEdges(data.biennialTaxonomies.edges),
    sitewideTags: mapEdges(data.sitewideTags.edges),
    postTypes: ARCHIVE_POST_TYPES,
  };
};
