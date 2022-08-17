import { ExhibitionQuery, EventQuery, AnnouncementQuery, PublicationQuery} from '@/services/Thumbs'

export const Search = term => `

	events(where: {search: "${term}"}){
		edges{
			node{
				${EventQuery}
			}
		}
	}

	publications(where: {search: "${term}"}){
		edges{
			node{
				${PublicationQuery}
			}
		}
	}

	exhibitions(where: {search: "${term}"}){
		edges{
			node{
				${ExhibitionQuery}
			}
		}
	}

	announcements(where: {search: "${term}"}){
		edges{
			node{
				${AnnouncementQuery}
			}
		}
	}

	networks(where: {search: "${term}"}){
		edges{
			node{
				title
				slug
			}
		}
	}

	biennials(where: {search: "${term}"}){
		edges{
			node{
				title
				slug
			}
		}
	}

`