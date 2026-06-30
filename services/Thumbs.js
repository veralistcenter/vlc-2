export const featImage = `featImage {
  subtitle
  featuredImage {
    srcSet
    sizes
    sourceUrl
    altText
    title
    caption
    mediaDetails{
      sizes{
        name
        sourceUrl
      }
    }
  }
  slideshowImage{
    srcSet
    sourceUrl
    altText
    title
    caption
    mediaDetails{
      sizes{
        name
        sourceUrl
      }
    }
  }
  imageCaption
}`;

export const EventQuery = `
__typename
title
slug
pageInfo{
  date
  endDate
  timeOverride
}
archiveSelection {
  selectedArchiveEvent
}
eventTypes{
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
sitewideTags{
  edges{
    node{
      slug
    }
  }
}
biennialTaxonomies{
  edges{
    node{
      slug
    }
  }
}
${featImage}`;

export const ExhibitionQuery = `__typename
  title
  slug
  pageInfo{
    date
    endDate
    timeOverride
  }
  exhibitionArchiveSelection{
    selectedArchiveExhibition
  }
  featImage {
    featuredImage {
      ... on MediaItem {
        srcSet
        sizes
        sourceUrl
        altText
        title
        mediaDetails{
          sizes{
            name
            sourceUrl
          }
        }
      }
    }
    slideshowImage {
      ... on MediaItem {
        srcSet
        sizes
        sourceUrl
        altText
        title
        mediaDetails{
          sizes{
            name
            sourceUrl
          }
        }
      }
    }
  }
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
        slug
      }
    }
  }
  biennialTaxonomies{
    edges{
      node{
        slug
      }
    }
  }
`;

export const AnnouncementQuery = `__typename
title
slug
pageInfo: announcementFields{
  date
  previewInfo{
    description
    button{
      buttonLink
      buttonName
    }
  }
}
featImage {
  featuredImage {
    ... on MediaItem {
      srcSet
      sizes
      sourceUrl
      altText
      title
      mediaDetails{
        sizes{
          name
          sourceUrl
        }
      }
    }
  }
  slideshowImage {
    ... on MediaItem {
      srcSet
      sizes
      sourceUrl
      altText
      title
      mediaDetails{
        sizes{
          name
          sourceUrl
        }
      }
    }
  }
}
sitewideTags{
  edges{
    node{
      slug
    }
  }
}
biennialTaxonomies{
  edges{
    node{
      slug
    }
  }
}
announcementTypes{
  edges{
    node{
      name
      slug
    }
  }
}
`;

export const PublicationQuery = `__typename
title
slug
featImage {
  imageCaption
  subtitle
  featuredImage {
    ... on MediaItem {
      srcSet
      sizes
      sourceUrl
      altText
      title
      mediaDetails{
        sizes{
          name
          sourceUrl
        }
      }
    }
  }
  slideshowImage {
    ... on MediaItem {
      srcSet
      sizes
      sourceUrl
      altText
      title
      mediaDetails{
        sizes{
          name
          sourceUrl
        }
      }
    }
  }
}
archiveSelectionPublication{
  selectedArchivePublication
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
  previewInfo{
    author
    primaryDescription
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
`;

export const AnnouncementThumb = `... on Announcement {
  ${AnnouncementQuery}
}`;

export const EventThumb = `... on Event {
  ${EventQuery}
}`;

export const ExhibitionThumb = `... on Exhibition {
  ${ExhibitionQuery}
}`;

export const PublicationThumb = `...on Publication{
  ${PublicationQuery}
}`;
