import {
  featImage,
  PublicationQuery,
  EventQuery,
  ExhibitionQuery,
  AnnouncementQuery,
} from "@/services/Thumbs";

import { Body } from "@/services/Matrix";
import {
  attachPublicationFilters,
  buildPublicationFilterOptions,
} from "@/services/Filters";

export const sortPublicationsByDate = (publications) =>
  [...publications].sort((a, b) => {
    const aDate = a.pageInfo?.date || "1950-01-01";
    const bDate = b.pageInfo?.date || "1950-01-01";
    return bDate.localeCompare(aDate);
  });

export const PublicationOverview = `types: publicationTypes(first: 50){
    edges{
      node{
        ... on PublicationType{
          name
          slug
        }
      }
    }
  }

  formats: publicationFormats(first: 50){
    edges{
      node{
        ... on PublicationFormat{
          name
          slug
        }
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

	focus: biennialTaxonomies{
    edges{
      node{
        ...on BiennialTaxonomy{
          slug
          name
        }
      }
    }
  }

  publications: publications (
    first: 400
  ){
    edges{
      node{
        ...on Publication{
					${PublicationQuery}
        }
      }
    }
  }
`;

export const Publication = (
  slug
) => `publication (id: "${slug}", idType: SLUG) {
  title
  slug

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
        networkInformation{
          nameToBeAlphabetized
        }
      }
    }
  }

  pageInfo: publicationInfo{
    date

    showFeatured: hideFeatured
    featuredMedia{
      featIssuuIframe
      featAudioFile{
        mediaItemUrl
        altText
        title
        caption
      }
      featVideoFile

      featuredSlides20220816{

        slideImage{
          sourceUrl
          srcSet
          altText
          caption
          mediaDetails{
            sizes{
              name
              sourceUrl
            }
          }
        }

      }

    }

    previewInfo{
      primaryDescription
      secondaryDescription
      author
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

  publicationTypes{
    edges{
      node{
        name
        slug
      }
    }
  }

  publicationFormats{
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

  biennialTaxonomies{
    edges{
      node{
        name
        slug
      }
    }
  }

  ${Body("Publication")}
}`;

const mapEdges = (edges) => edges.map((e) => e.node);

export const fetchPublicationOverviewPage = async (
  { $axios, $Req, store, $Check, $CheckA, $moment },
  { typeSlug = null, paths = null } = {}
) => {
  const res = await $axios($Req(PublicationOverview));
  const data = res.data.data;

  const pages = [
    { title: "All", path: "/publications" },
    ...data.types.edges.map((e) => ({
      title: e.node.name,
      path: "/publications/type/" + e.node.slug,
      slug: e.node.slug,
    })),
  ];

  if (paths) {
    store.commit("updatePath", paths);
  } else {
    store.commit("updatePath", [
      { title: "Home", route: "/" },
      { title: "Publications", route: "/publications" },
    ]);
  }

  let publications = data.publications.edges.map((e) => {
    const pub = attachPublicationFilters(e.node, { $Check, $CheckA, $moment });
    pub.types = pub.publicationTypes?.edges?.map((edge) => edge.node.slug) || [];
    return pub;
  });

  if (typeSlug) {
    publications = publications.filter((pub) => pub.types.includes(typeSlug));
  }

  publications = sortPublicationsByDate(publications);

  const filterOptions = buildPublicationFilterOptions(publications, {
    $Check,
    $CheckA,
    $moment,
  });

  return {
    pages,
    publications,
    ...filterOptions,
  };
};
