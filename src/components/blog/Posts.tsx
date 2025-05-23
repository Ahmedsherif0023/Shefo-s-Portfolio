import { getPosts } from '@/app/utils/utils';
import { Grid } from '@/once-ui/components';
import Post from './Post';

interface PostsProps {
    range?: [number, number] | [number];
    columns?: '1' | '2' | '3';
    thumbnail?: boolean;
    direction?: 'row' | 'column';
}

export function Posts({
    range,
    columns = '1',
    thumbnail = false,
    direction
}: PostsProps) {
    // 1. Safe data fetching
    interface PostMetadata {
      publishedAt?: string;
      [key: string]: any;
    }

    interface BlogPost {
      slug?: string;
      metadata?: PostMetadata;
      [key: string]: any;
    }

    let allBlogs: BlogPost[] = [];
    try {
        const posts = getPosts(['src', 'app', 'blog', 'posts']);
        allBlogs = Array.isArray(posts) ? posts : [];
    } catch (error) {
        console.error('Error loading posts:', error);
        allBlogs = [];
    }

    // 2. Filter and sort with validation
    const sortedBlogs = allBlogs
        .filter(post => post?.metadata?.publishedAt)
        .sort((a, b) => {
            const bDate = new Date(b.metadata?.publishedAt ?? 0).getTime();
            const aDate = new Date(a.metadata?.publishedAt ?? 0).getTime();
            return bDate - aDate;
        });

    // 3. Safe range handling
    const displayedBlogs = (() => {
        if (!range || !sortedBlogs.length) return sortedBlogs;
        
        const startIdx = Math.max(0, range[0] - 1);
        const endIdx = range.length === 2 
            ? Math.min(sortedBlogs.length, range[1])
            : sortedBlogs.length;
            
        return sortedBlogs.slice(startIdx, endIdx);
    })();

    // 4. Safe rendering
    return (
        <>
            {displayedBlogs.length > 0 && (
                <Grid columns={columns} mobileColumns="1" fillWidth marginBottom="40" gap="12">
                    {displayedBlogs.map((post) => (
                        post?.slug && (
                            <Post
                                key={post.slug}
                                post={post}
                                thumbnail={thumbnail}
                                direction={direction}
                            />
                        )
                    ))}
                </Grid>
            )}
        </>
    );
}