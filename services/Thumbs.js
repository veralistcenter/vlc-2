export const featImage = `featImage {
    featuredImage {
      srcSet
      sizes
      sourceUrl
      altText
      title
      caption
    }

    slideshowImage{
      srcSet
      sourceUrl
      altText
      title
      caption 
    }

    imageCaption
  }`

export const EventQuery = `
__typename
title
slug
pageInfo{
  date
  endDate
  timeOverride
}
eventTypes{
  edges{
    node{
      name
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

${featImage}`

export const ExhibitionQuery = `__typename
title
slug
pageInfo{
  date
  endDate
  timeOverride
}
featImage {
  featuredImage {
    ... on MediaItem {
      srcSet
      sizes
      sourceUrl
      altText
      title
    }
  }
  slideshowImage {
    ... on MediaItem {
      srcSet
      sizes
      sourceUrl
      altText
      title
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

`

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
    }
  }
  slideshowImage {
    ... on MediaItem {
      srcSet
      sizes
      sourceUrl
      altText
      title
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
`

export const PublicationQuery = `__typename
title
slug

pageInfo: publicationInfo{
  date
}

sitewideTags{
  edges{
    node{
      slug
    }
  }
}

`

export const AnnouncementThumb = `... on Announcement {
  ${AnnouncementQuery}
}`

export const EventThumb = `... on Event {
  ${EventQuery}
}`


export const ExhibitionThumb = `... on Exhibition {
  ${ExhibitionQuery}
}`


export const PublicationThumb = `...on Publication{
  ${PublicationQuery}
}`