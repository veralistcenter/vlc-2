export default (context, inject) => {
  /* plugin to keep all request formats centralized */

  var testUrl =
    context.app.$config.wpURL !== null && context.app.$config.wpURL
      ? context.app.$config.wpURL
      : "http://localhost:8888";

  const req = (query) => {
    return {
      url: `${testUrl}/graphql`,
      method: "post",
      data: {
        query: `query{ ${query} }`,
      },
    };
  };

  const reqwrest = (query) => {
    return {
      url: `${testUrl}/wp-json/wp/v2${query}`,
      method: "get",
    };
  };

  const reqwvars = (query, param, v) => {
    return {
      url: `${testUrl}/graphql`,
      method: "post",
      data: {
        query: `query(${param}) { ${query} }`,
        variables: v,
      },
    };
  };

  inject("Req", req);
  inject("ReqWVars", reqwvars);
  inject("ReqWREST", reqwrest);

  context.$Req = req;
  context.$ReqWVars = reqwvars;
  context.$ReqWREST = reqwrest;
};
