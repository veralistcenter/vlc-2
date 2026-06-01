export default ({ app, $moment }, inject) => {
  /* plugin to structure titles, dates, etc */

  const fullRange = (start, end) => {
    const startDate =
      $moment(start).format("MMM") + " " + $moment(start).format("D");
    const endDate =
      $moment(end).format("MMM") +
      " " +
      $moment(end).format("D") +
      ", " +
      $moment(end).format("YYYY");

    if ($moment(start).format("YYYY") !== $moment(end).format("YYYY")) {
      return startDate + ", " + $moment(start).format("YYYY") + "–" + endDate;
    } else {
      return startDate + "–" + endDate;
    }
  };

  inject("Dated", (params) => {
    const { start, end } = params;

    if (start == null || start === undefined) {
      return "";
    }

    if (end === null || end === undefined) {
      return (
        $moment(start).format("MMM") +
        " " +
        $moment(start).format("D") +
        ", " +
        $moment(start).format("YYYY")
      );
    } else if ($moment().isBefore($moment(start))) {
      return fullRange(start, end);
    } else if ($moment().isBefore($moment(end))) {
      return fullRange(start, end);
    } else {
      return fullRange(start, end);
    }
  });

  inject("IsCurrent", (params) => {
    const { start, end } = params;

    if (start == null || start === undefined) {
      return false;
    } else if ($moment(start).isSame($moment(), "day")) {
      return true;
    } else if ($moment().isBefore($moment(start))) {
      return true;
    } else if (
      $moment().isBefore($moment(end)) ||
      $moment(end).isSame($moment(), "day")
    ) {
      return true;
    } else {
      return false;
    }
  });

  inject("SourceUrl", (image, targetSize) => {
    if (
      image.mediaDetails &&
      image.mediaDetails.sizes !== null &&
      image.mediaDetails.sizes.length > 0
    ) {
      const sizes = image.mediaDetails.sizes;

      let size =
        targetSize !== null && targetSize !== undefined
          ? targetSize
          : "medium_large";
      const filtered = sizes.filter((s) => s.name === size);

      if (filtered.length > 0) {
        return filtered[0].sourceUrl;
      } else if (image.sourceUrl) {
        return image.sourceUrl;
      }
    } else if (image.sourceUrl) {
      return image.sourceUrl;
    }
  });
};
