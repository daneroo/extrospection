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
  // {
  //   "data": {
  //     "search": {
  //       "repositoryCount": 29,
  //       "edges": [
  //         {
  //           "node": {
  //             "id": "R_kgDOIdKvng",
  //             "nameWithOwner": "PHACDataHub/django-htmx-autocomplete",
  //             "description": "A Django autocomplete component powered by htmx",
  //             "url": "https://github.com/PHACDataHub/django-htmx-autocomplete"
  //           }
  //         },

  return json.data.search.edges.map((edge) => edge.node);
}
