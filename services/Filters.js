export const uniqueBySlug = (items) => {
  const seen = new Set();

  return items.filter((item) => {
    if (!item?.slug || seen.has(item.slug)) {
      return false;
    }

    seen.add(item.slug);
    return true;
  });
};

export const collectTaxonomyFromEdges = (items, field) =>
  uniqueBySlug(
    items.flatMap((item) =>
      item[field]?.edges?.length
        ? item[field].edges.map((edge) => edge.node)
        : []
    )
  );

export const compareContributorNames = (a, b) => {
  const alpha = (person) => {
    const names = person.name.split(" ");
    const lastName = names[names.length - 1];
    const custom = person.nameToBeAlphabetized;

    return custom !== null && custom !== undefined && custom !== ""
      ? custom
      : lastName;
  };

  return alpha(a).localeCompare(alpha(b));
};

export const filterByGroups = (items, activeFilters = [], filterTypes = []) => {
  if (!activeFilters.length) {
    return items;
  }

  const activeByGroup = filterTypes
    .map((type) => ({
      slugs: activeFilters
        .filter((filter) =>
          type.list?.some((item) => item.slug === filter.slug)
        )
        .map((filter) => filter.slug),
    }))
    .filter((group) => group.slugs.length);

  if (!activeByGroup.length) {
    return items;
  }

  return items.filter((item) =>
    activeByGroup.every((group) =>
      group.slugs.some((slug) => item.filters?.includes(slug))
    )
  );
};

export const getPostDate = (post) => post?.pageInfo?.date || "2000-01-01";

export const getPostYear = (post) => {
  const date = post?.pageInfo?.date;
  if (!date) {
    return "Unsorted";
  }

  const year = date.slice(0, 4);
  return /^\d{4}$/.test(year) ? year : "Unsorted";
};

export const getPostLetter = (post) => {
  const title = (post?.title || "").replace(/[^a-z]/gi, "");
  return (title[0] || "A").toUpperCase();
};

export const groupPostsByYear = (posts) => {
  const groups = new Map();

  [...posts]
    .sort((a, b) => getPostDate(b).localeCompare(getPostDate(a)))
    .forEach((post) => {
      const year = getPostYear(post);
      if (!groups.has(year)) {
        groups.set(year, []);
      }
      groups.get(year).push(post);
    });

  return [...groups.entries()]
    .sort(([yearA], [yearB]) => yearB.localeCompare(yearA))
    .map(([year, posts]) => ({ year, posts }));
};

export const groupPostsByLetter = (posts) => {
  const groups = new Map();

  [...posts]
    .sort((a, b) => getPostLetter(a).localeCompare(getPostLetter(b)))
    .forEach((post) => {
      const letter = getPostLetter(post);
      if (!groups.has(letter)) {
        groups.set(letter, []);
      }
      groups.get(letter).push(post);
    });

  return [...groups.entries()].map(([letter, posts]) => ({ letter, posts }));
};

export const attachPublicationFilters = (pub, { $Check, $CheckA, $moment }) => {
  const formats =
    pub.publicationFormats?.edges?.map((edge) => edge.node.slug) || [];
  const years = $Check(pub.pageInfo?.date)
    ? [$moment(pub.pageInfo.date).format("YYYY")]
    : [];
  const themes =
    pub.biennialTaxonomies?.edges?.map((edge) => edge.node.slug) || [];
  const contributors = $CheckA(pub.networkRelation?.associatedNetwork)
    ? pub.networkRelation.associatedNetwork.map((network) => network.slug)
    : [];
  const tags = $CheckA(pub.sitewideTags?.edges)
    ? pub.sitewideTags.edges.map((edge) => edge.node.slug)
    : [];

  pub.filters = [...formats, ...years, ...themes, ...contributors, ...tags];
  return pub;
};

export const buildPublicationFilterOptions = (
  publications,
  { $Check, $CheckA, $moment }
) => {
  const years = uniqueBySlug(
    publications
      .filter((pub) => $Check(pub.pageInfo?.date))
      .map((pub) => {
        const slug = $moment(pub.pageInfo.date).format("YYYY");
        return { name: slug, slug };
      })
  ).sort((a, b) => b.slug.localeCompare(a.slug));

  const contributors = uniqueBySlug(
    publications.flatMap((pub) =>
      $CheckA(pub.networkRelation?.associatedNetwork)
        ? pub.networkRelation.associatedNetwork.map((network) => ({
            name: network.title,
            nameToBeAlphabetized:
              network.networkInformation?.nameToBeAlphabetized,
            slug: network.slug,
          }))
        : []
    )
  ).sort(compareContributorNames);

  return {
    formats: collectTaxonomyFromEdges(publications, "publicationFormats"),
    themes: collectTaxonomyFromEdges(publications, "biennialTaxonomies"),
    tags: collectTaxonomyFromEdges(publications, "sitewideTags"),
    years,
    contributors,
  };
};
