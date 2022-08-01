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
}`


export const AdditionalNetwork = cursor => `moreNetwork: networks(first: 200, after: "${cursor}", where: {orderby: {order: ASC, field: DATE}}){
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
}`