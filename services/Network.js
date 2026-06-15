import {
  EventQuery,
  featImage,
  ExhibitionQuery,
  PublicationQuery,
  AnnouncementQuery,
} from "@/services/Thumbs";

export const Network100 = `networks: networks(where: {orderby: {field: MODIFIED, order: ASC}}, first: 100) {
  edges {
    node {
      title
      slug
      networkInformation{
        type
        externalLink{
          makeExternalLink
          externalLinkUrl
        }
      }
    }
  }
}`;

export const Network = `networks(first: 200, where: {orderby: {order: ASC, field: TITLE}}){
    pageInfo{
      hasNextPage
      endCursor
    }

    edges{
      node{
        title
        slug
        networkInformation{
          type
          nameToBeAlphabetized
          externalLink{
            makeExternalLink
            externalLinkUrl
          }
        }
        networkTypes{
          edges{
            node{
              name
              slug
            }
          }
        }
      }
    }
  }

  taxonomy: networkTypes(first: 150){
    edges{
      node{
        ... on NetworkType{
          name
          slug
        }
      }
    }
  }

`;

export const AdditionalNetwork = (
  cursor
) => `moreNetwork: networks(first: 200, after: "${cursor}", where: {orderby: {order: ASC, field: TITLE}}){
  pageInfo {
    hasNextPage
    endCursor
  }
  edges {
    node {
      title
      slug

      networkInformation{
        type
        nameToBeAlphabetized
        externalLink{
          makeExternalLink
          externalLinkUrl
        }
      }

      networkTypes{
        edges{
          node{
            name
            slug
          }
        }
      }
    }
  }
}`;

export const Item = (slug) => `network (id: "${slug}", idType: SLUG) {
  title
  slug

  ${featImage}

  networkTypes{
    edges{
      node{
        name
        slug
      }
    }
  }
  networkInformation{
    networkList{
      name
      slug
    }
    type
    externalLink{
      networkRelatedPages
      makeExternalLink
      externalLinkUrl
    }
  }

  networkPreview{
    subtitle
    description
    button{
      buttonLink
      buttonName
    }
  }

  pageFormat{
    pageLength
    shortBody
    body{
      __typename
      ...on Network_Pageformat_Body_Button{
        buttonFile{
          sourceUrl
        }
        buttonLink
        buttonName
      }

      ...on Network_Pageformat_Body_Gallery{
        title
        slide{
          slideTitle
          caption
          audioFile{
            sourceUrl
          }
          video
          image{
            sourceUrl
            altText
            srcSet
            caption
          }
        }
      }

      ...on Network_Pageformat_Body_Richtext{
        title
        text
      }

      ...on Network_Pageformat_Body_Accordian{
        title
        section{
          sectionText
          sectionImage{
            sourceUrl
            srcSet
            altText
            caption
          }
          sectionTitle
          sectionSubtitle
        }
      }

      ...on Network_Pageformat_Body_AudioPlayer{
        audioFile{
          sourceUrl
        }
      }

      ...on Network_Pageformat_Body_VideoPlayer{
        title
        caption
        vimeoUrl
      }

      ...on Network_Pageformat_Body_RelatedPages{
        title
        relatedPagesTitle
        relatedPagesSize
        relatedPages{
          __typename
          ... on Event{
            ${EventQuery}
          }
          ... on Exhibition{
            ${ExhibitionQuery}
          }
          ... on Publication{
            ${PublicationQuery}
          }
        }
      }
    }
  }

  related{
    relatedPagesSize
    relatedPagesTitle
    relatedPages{
      __typename
      ...on Publication{
        ${PublicationQuery}
      }
      ...on Exhibition{
        ${ExhibitionQuery}
      }
      ...on Event{
        ${EventQuery}
      }
      ...on Announcement{
        ${AnnouncementQuery}
      }
    }
  }
}`;

export const NETWORK_NAV_PAGES = [
  { title: "All", path: "/network" },
  { title: "Individuals", path: "/network/individuals" },
  { title: "Organizations", path: "/network/organizations" },
];

export const NETWORK_LETTER_LIST = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "Y",
  "Z",
];

export const getNetworkAlphaName = (node) => {
  const custom = node.networkInformation?.nameToBeAlphabetized;
  if (custom !== null && custom !== undefined && custom !== "") {
    return custom;
  }
  const names = node.title.split(" ");
  return names[names.length - 1];
};

export const compareNetworkNodes = (a, b) => {
  return getNetworkAlphaName(a).localeCompare(getNetworkAlphaName(b));
};

export const filterNetworkNodesByTags = (nodes, activeFilters) => {
  if (!activeFilters.length) {
    return nodes;
  }

  return nodes.filter((node) => {
    const edges = node.networkTypes?.edges;
    if (!edges?.length) {
      return false;
    }

    return edges.some(
      (edge) => edge?.node && activeFilters.includes(edge.node.slug)
    );
  });
};

export const filterNetworkNodesByType = (nodes, type) => {
  if (!type) {
    return nodes;
  }

  return nodes.filter((n) => n.networkInformation?.type === type);
};

export const groupNetworkNodesByLetter = (nodes) => {
  const groups = new Map();

  [...nodes].sort(compareNetworkNodes).forEach((node) => {
    const letter = getNetworkAlphaName(node)[0].toUpperCase();
    if (!groups.has(letter)) {
      groups.set(letter, []);
    }
    groups.get(letter).push(node);
  });

  return [...groups.entries()].map(([letter, nodes]) => ({ letter, nodes }));
};

export const buildNetworkByNames = (
  nodes,
  { activeFilters = [], type = null } = {}
) => {
  let filtered = filterNetworkNodesByTags(nodes, activeFilters);
  filtered = filterNetworkNodesByType(filtered, type);
  return groupNetworkNodesByLetter(filtered);
};

export const fetchNetworkListPage = async (
  { $axios, $Req, store },
  { breadcrumb }
) => {
  const res = await $axios($Req(Network));

  store.commit("updatePath", [
    { title: "Home", route: "/" },
    { title: "Network", route: "/network" },
    breadcrumb,
  ]);

  return {
    pages: NETWORK_NAV_PAGES,
    networks: res.data.data.networks.edges.map((e) => e.node),
    pageInfo: res.data.data.networks.pageInfo,
    taxonomy: res.data.data.taxonomy.edges.map((e) => e.node),
  };
};
