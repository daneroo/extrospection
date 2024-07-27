import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import { getCommits } from "./github/getCommits.js";
import { getProjects } from "./github/getProjects.js";

dotenv.config();

export const endpoint = "https://api.github.com/graphql";
export const accessToken = process.env.GITHUB_TOKEN;

await showProjects("ottawajs");
await showProjects("daneroo");

await showCommits("ottawajs", "ottawajs.github.com");
await showCommits("daneroo", "extrospection");

async function showCommits(owner, name) {
  const commits = await getCommits({
    endpoint,
    accessToken,
    owner,
    name,
  });
  console.log(`Commits for ${owner}/${name}:`);
  // console.log(JSON.stringify(commits, null, 2));
  const branches = commits.map((c) => [
    c.name,
    c.target.history.edges.map((e) => e.node.committedDate),
  ]);
  console.log(
    `Branches: (${branches.length})`,
    JSON.stringify(branches, null, 2)
  );
}

async function showProjects(org) {
  const projects = await getProjects({
    endpoint,
    accessToken,
    org,
  });
  console.log(`Projects for ${org}: (${projects.length})`);
  console.log(
    JSON.stringify(
      projects.map((p) => p.name),
      null,
      2
    )
  );
}
