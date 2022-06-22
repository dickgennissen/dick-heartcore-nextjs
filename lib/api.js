const UMB_PROJECT_ALIAS = 'dicks-amiable-koala';

const fetcher = async (endpoint) => {
  const result = await fetch(`https://cdn.umbraco.io/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'umb-project-alias': UMB_PROJECT_ALIAS,
      'Accept-Language': 'en-US'
    }
  });

  return await result.json();
};

export async function getArtistsOverviewPage() {
  const result = await fetcher(`content`);
  const root = result._embedded.content[0];
  const artists = await getAllArtists();

  return {
    content: {
      title: root.title,
      text: root.text
    },
    artists
  };
}

export async function getAllArtists() {
  const result = await fetcher(`content/type?contentType=artist`);
  const content = result._embedded.content;

  return content.map((artist) => ({
    id: artist._id,
    url: artist._url,
    title: artist.name,
    image: artist.image,
    imageCredits: artist.imageCredits
  }));
}

export async function getArtistByUrl(url) {
  const content = await fetcher(`content/url?url=${url}`);

  return {
    title: content.name,
    biography: content.biography,
    image: content.image,
    imageCredits: content.imageCredits
  };
}