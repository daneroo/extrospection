// get Last n commits for each branch
export async function getCommits({
  endpoint,
  accessToken,
  owner,
  name,
  n = 1,
}) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetCommits($owner: String!, $name: String!,$n: Int!) {
        repository(owner: $owner, name: $name) {
          refs(
            refPrefix: "refs/heads/"
            orderBy: {direction: DESC, field: TAG_COMMIT_DATE}
            first: 100
          ) {
            edges {
              node {
                ... on Ref {
                  name
                  target {
                    ... on Commit {
                      history(first: $n) {
                        edges {
                          node {
                            ... on Commit {
                              committedDate
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`,
      variables: {
        owner,
        name,
        n,
      },
    }),
  });

  // console.error(response.status, response.statusText);

  const json = await response.json();
  // "data": {
  //   "repository": {
  //     "refs": {
  //       "edges": [
  //         {
  //           "node": {
  //             "name": "main",
  //             "target": {
  //               "history": {
  //                 "edges": [
  //                   {
  //                     "node": {
  //                       "committedDate": "2023-02-14T21:35:43Z"
  //                     }
  //                   },
  //                   {
  //                     "node": {
  //                       "committedDate": "2023-02-14T21:33:27Z"
  //                     }

  return json.data.repository.refs.edges.map((edge) => edge.node);
  // return json.data.search.edges.map((edge) => edge.node);
}
