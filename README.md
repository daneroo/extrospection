# Extrospection

Use the GitHub GraphQL API to introspect a set of repositories

## Astro subproject

- `npm create astro@latest`

## GraphQL Examples

```graphql
query GetRepositories {
  search(query: "org:PHACDataHub", type: REPOSITORY, first: 100) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          id
          nameWithOwner
          description
          url
        }
      }
    }
  }
}
```

````graphql
query GetRepository {
  repository(owner: "PHACDataHub", name: "node-microservices-demo"){
    id
    nameWithOwner
    description
    url
  }
}
```

```graphql
query GetOwnerRepositoryCount {
  repositoryOwner(login: "daneroo") {
    id
    repositories {
      totalCount
    }
  }
}
```


## References

- [GitHub GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer)
- [Introduction to GraphQL with GitHub API](https://medium.com/swlh/introduction-to-graphql-with-github-api-64ee8bb11630)

- [Astro with GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Astro with Nx](https://leosvel.dev/blog/creating-my-personal-website-with-astro-tailwindcss-and-nx/)
````
