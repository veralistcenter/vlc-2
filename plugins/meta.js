export default (context, inject) => {
  const metatags = (info) => {
    const { title, description, image } = info;

    const settings = context.store.getters.getSettings;

    const realTitle =
      title !== undefined ? `${title} | Vera List Center` : "Vera List Center";
    const realDescription =
      !description || description === ""
        ? "The Vera List Center for Art and Politics is a research center and a public forum for art, culture, and politics."
        : description;
    const realImage =
      !image || image === "" || image === undefined || image === null
        ? "/site_image.png"
        : image;

    return {
      title: realTitle,
      meta: [
        { hid: "description", name: "description", content: realDescription },
        {
          hid: "itemprop-description",
          itemprop: "description",
          content: realDescription,
        },
        { hid: "image", itemprop: "image", content: realImage },
        { hid: "twitter-card", name: "twitter:card", content: "summary" },
        { hid: "twitter-image", name: "twitter:image", content: realImage },
        { hid: "twitter-title", name: "twitter:title", content: realTitle },
        {
          hid: "twitter-description",
          property: "twitter:description",
          content: realDescription,
        },
        { hid: "og-type", name: "og:type", content: "website" },
        { hid: "og-image", property: "og:image", content: realImage },
        { hid: "og-title", property: "og:title", content: realTitle },
        { hid: "og-sitename", property: "og:site_name", content: realTitle },
        {
          hid: "og-url",
          property: "og:url",
          content: "https://veralistcenter.org" + context.route.path,
        },
        {
          hid: "og-description",
          property: "og:description",
          content: realDescription,
        },
      ],
    };
  };

  const metatagsImg = (image) => {
    const seoImage = "site_image.png";
    const realImage = !image || image === "" ? seoImage : image;

    return {
      meta: [
        { hid: "image", itemprop: "image", content: realImage },
        { hid: "twitter-image", name: "twitter:image", content: realImage },
        { hid: "og-image", property: "og:image", content: realImage },
      ],
    };
  };

  inject("metatags", metatags);
  context.$metatags = metatags;
  inject("metatagsImg", metatagsImg);
  context.$metatagsImg = metatagsImg;
};
