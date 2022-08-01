export const featImage = `featImage {
    featuredImage {
      srcSet
      sizes
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
}`

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
}`

export const EventThumb = `... on Event {
  ${EventQuery}
}`


export const ExhibitionThumb = `... on Exhibition {
  ${ExhibitionQuery}
}`


export const PublicationThumb = `...on Publication{
	title
	slug

}`