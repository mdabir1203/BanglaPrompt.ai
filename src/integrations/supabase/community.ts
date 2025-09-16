export const COMMUNITY_IDENTITY_HEADER = "x-community-identity";

export const withCommunityIdentity = <T extends { headers: Headers }>(
  builder: T,
  identity?: string | null,
): T => {
  if (identity) {
    builder.headers.set(COMMUNITY_IDENTITY_HEADER, identity);
  }

  return builder;
};
