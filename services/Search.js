import {
  ExhibitionQuery,
  EventQuery,
  AnnouncementQuery,
  PublicationQuery,
} from "@/services/Thumbs";

export const Search = (term) => `
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
`;

export const SearchIds = (ids) => `
	networks(first: 100 where: {in: [${ids}]}){
		edges{
			node{
				title
	      slug
	      networkInformation{
	        type
	      }
			}
		}
	}
	events(first: 200 where: {in: [${ids}]}){
		edges{
			node{
				${EventQuery}
			}
		}
	}
	publications(first: 40 where: {in: [${ids}]}){
		edges{
			node{
				${PublicationQuery}
			}
		}
	}
	exhibitions(first: 40 where: {in: [${ids}]}){
		edges{
			node{
				${ExhibitionQuery}
			}
		}
	}
	announcements(first: 40 where: {in: [${ids}]}){
		edges{
			node{
				${AnnouncementQuery}
			}
		}
	}`;
