import { 
  ExhibitionQuery,
  AnnouncementQuery, 
  AnnouncementThumb,
  EventQuery, 
  EventThumb, 
  ExhibitionThumb, 
  PublicationThumb,
  featImage
  
} from '@/services/Thumbs'

import { Network100 } from '@/services/Network'

import { Body } from '@/services/Matrix'


export const RecentEvents = `recentEvents: events(
  first: 30
  where: {orderby: {order: DESC, field: DATE}}
){
  edges {
    node {
      ${EventQuery}
    }
  }
}`


export const RecentExhibitions = `recentExhibitions: exhibitions(
  first: 30
  where: {orderby: {order: DESC, field: DATE}}
){
  edges {
    node {
      ${ExhibitionQuery}
    }
  }
}`


export const RecentAnnouncements = `recentAnnouncements: announcements(
  first: 30
  where: {orderby: {order: DESC, field: DATE}}
){
  edges {
    node {
      ${AnnouncementQuery}
    }
  }
}`

export const Biennials = `biennials{
    edges{
      node{
        title
        slug
        featImage{
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
        }
        biennialInfo{
          biennialDescriptionPreview
          dateRange{
            startingYear
            endingYear
          }
        }
      }
    }
  }`

export const Home = `
${RecentEvents}
${RecentExhibitions}
${RecentAnnouncements}
${Biennials}
${Network100}

acfOptions: acfOptions {

  homepage {
    previewSections{
      __typename

      ...on AcfOptions_Homepage_PreviewSections_HomepageMarquee{
        marqueeContent
        homepageMarqueeSpeed
      }

      ... on AcfOptions_Homepage_PreviewSections_HomepageGallery {
        homepageGallery {
          ${EventThumb}
          ${ExhibitionThumb}
          ${AnnouncementThumb}
          ${PublicationThumb}
        }
      }
      ... on AcfOptions_Homepage_PreviewSections_Recently {
        cardSize
        recently {
          ... on AcfOptions_Homepage_PreviewSections_Recently_Recently {
            __typename
            title
            displayOptions
          }
        }
      }
      ... on AcfOptions_Homepage_PreviewSections_Archive {
        archive {
          archiveTitle
          displayAmount
          displayMethod
        }
      }
      ... on AcfOptions_Homepage_PreviewSections_Manual {
        cardSize
        manual {
          ... on AcfOptions_Homepage_PreviewSections_Manual_Manual {
            __typename
            title
            manualAddition {
              ${EventThumb}
              ${ExhibitionThumb}
            }
          }
        }
      }

      ...on AcfOptions_Homepage_PreviewSections_NetworkPreview{
       __typename
        networkPreviewGroup{
          title
          show
        }
      }
      
      ...on AcfOptions_Homepage_PreviewSections_HomepageText{
        text
      }
      
      ...on AcfOptions_Homepage_PreviewSections_BiennialFocus{
        biennialTitle          
      }
      
      ... on AcfOptions_Homepage_PreviewSections_Current {
        cardSize
        current {
          ... on AcfOptions_Homepage_PreviewSections_Current_Current {
            __typename
            title
          }
        }
      }
    }


    gallery {
      __typename
      ${ExhibitionThumb}
      ${EventThumb}
      ${PublicationThumb}
    }

  }

}`

/*

[ ] get current modules

[ ] get upcoming events
[ ] get upcoming exhibitions
[ ] get recent events/announcements/books
[ ] get themes
[ ] get network

*/




export const Global = `acfOptions {
  menu{
    pLeftColumn{
      text
      link
      internalLink{
        __typename
        ...on Page{
          slug
        }
        ...on Post{
          slug
        }
        ...on Event{
          slug
        }
        ...on Publication{
          slug
        }
        ...on Exhibition{
          slug
        }
        ...on Biennial{
          slug
        }
        ...on Network{
          slug
        }
        ...on Announcement{
          slug
        }
        ...on About{
          slug
        }
      }
      linkToggle
    }
    
    pRightColumn{
      text
      link
      internalLink{
        __typename
        ...on Page{
          slug
        }
        ...on Post{
          slug
        }
        ...on Event{
          slug
        }
        ...on Publication{
          slug
        }
        ...on Exhibition{
          slug
        }
        ...on Biennial{
          slug
        }
        ...on Network{
          slug
        }
        ...on Announcement{
          slug
        }
        ...on About{
          slug
        }
      }
      linkToggle
    }

    address

    marquee{
      displayMarquee
      speedOfMarquee
      content
    }

    menuSocialLinks{
      text
      link
    }
  }
  footer{
    columnOne
    columnTwo
    columnThree
  }
}`


export const AllPages = `pages(first: 20) {
  edges {
    node {
      title
      slug

      pageIntroduction{
        introductionText
      }

      gradient{
        gradientPicker{
          ...on Gradient{
            name
            slug
            gradientPicker{
              topColor
              bottomColor
            }
          }
        }
      }

      ${ Body('Page') }
      
      fellows {
        currentFellows {
          title
          titleSlug
          cfellows {
            ... on Network {
              __typename
              title
              slug
              networkTypes{
                edges{
                  node{
                    name
                  }
                }
              }
              ${featImage}
            }
          }
        }
        pastFellows {
          title
          titleSlug
          fellows {
            ... on Network {
              __typename
              title
              slug
              networkTypes{
                edges{
                  node{
                    name
                  }
                }
              }
              ${featImage}
            }
          }
        }
      }
    }
  }
}`