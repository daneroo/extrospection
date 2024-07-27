export async function getProjects({ endpoint, accessToken, org }) {
  const org_qy = `org:${org}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetRepositories($org_qy: String!) {
        search(query: $org_qy, type: REPOSITORY, first: 100) {
          repositoryCount
          edges {
            node {
              ... on Repository {
                id
                name
                nameWithOwner
                description
                url
              }
            }
          }
        }
      }`,
      variables: { org_qy },
    }),
  });

  // console.error(response.status, response.statusText);

  const json = await response.json();
  // console.error(JSON.stringify(json, null, 2));
  // {
  //   "data": {
  //     "search": {
  //       "repositoryCount": 164,
  //       "edges": [
  //         {
  //           "node": {
  //             "id": "MDEwOlJlcG9zaXRvcnkyMjY0NTYwNTc=",
  //             "name": "gphotos-puppeteer",
  //             "nameWithOwner": "daneroo/gphotos-puppeteer",
  //             "description": "Download Google Photos with puppeteer",
  //             "url": "https://github.com/daneroo/gphotos-puppeteer"
  //           }
  //         },

  return json.data.search.edges.map((edge) => edge.node);
}
