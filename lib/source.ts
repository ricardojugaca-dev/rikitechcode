import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { docs, meta } from '@/.source';

const mdxSource = createMDXSource(docs, meta);

type MDXSource = typeof mdxSource;

const runtimeSource = mdxSource as unknown as {
  files:
    | MDXSource['files']
    | (() => MDXSource['files']);
};

export const blog = loader({
  baseUrl: '/blog',
  source: {
    files:
      typeof runtimeSource.files === 'function'
        ? runtimeSource.files()
        : runtimeSource.files,
  },
});