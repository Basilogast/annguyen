export default {
    name: 'blog',
    type: 'document',
    title: 'Blog',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title of blog article',
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug of your blog article',
        options: {
          source: 'title',
          maxLength: 200,
        },
      },
      {
        name: 'titleImage',
        type: 'image',
        title: 'Title Image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'smallDescription',
        type: 'text',
        title: 'Small Description',
      },
      {
        name: 'content',
        type: 'array',
        title: 'Content Blocks',
        of: [
          {
            type: 'block',
          },
          {
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
      },
    ],
  };
  