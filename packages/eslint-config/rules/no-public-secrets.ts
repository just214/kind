// Prepends from various frameworks that make environmental variables available client side. Remix does not allow client-side env variables: https://remix.run/docs/en/v1/guides/envvars#browser-environment-variables
const clientSidePrepends = [
  // Astro: https://docs.astro.build/en/guides/environment-variables/
  "PUBLIC_",
  // NextJS
  "NEXT_PUBLIC_",
  // Vite
  "VITE_",
  // Gatsby: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/#accessing-environment-variables-in-the-browser
  "GATSBY_",
];

const startsWithClientSidePrepend = (name: string) =>
  clientSidePrepends.some((prepend) => name.startsWith(prepend));

const containsSecretKeyword = (name: string) =>
  /(_(SECRET|PASSWORD|PW)_?)|(_(SECRET|PASSWORD|PW)$)/i.test(name);

export const noPublicSecrets = {
  meta: {
    messages: {
      noPublicSecrets: "Do not expose secrets to the browser.",
    },
  },
  create(context: any) {
    return {
      Identifier(node: { name: string }) {
        if (
          startsWithClientSidePrepend(node.name) &&
          containsSecretKeyword(node.name)
        ) {
          context.report({ node, messageId: "noPublicSecrets" });
        }
      },
    };
  },
};
