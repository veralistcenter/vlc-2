export const Events = `events {
  edges {
    node {
      title
      pageInfo {
        date
        endDate
        timeEnd
      }
    }
  }
}`

export const Event = slug => `event (id: "${slug}", idType: SLUG) {
	edges {
		node {
			title
		}
	}
}`