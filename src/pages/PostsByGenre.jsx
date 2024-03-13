import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import service from "../appwrite/config";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";
import Animate from "../components/Animate";
import Container from "../components/container/Container";

function PostsByGenre({ className = "", ...props }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { genre } = useParams();

    const filteredPosts = posts
        ? posts.filter((post) => post.genre == genre)
        : [];

    useEffect(() => {
        service
            .getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                    setLoading(false);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const title = filteredPosts.length ? (
        <h1 className="text-2xl font-semibold text-slate-800 text-center">
            All Posts Related to <br />
            <b className="uppercase">{genre}</b>
        </h1>
    ) : (
        <h1 className="text-2xl font-semibold text-slate-800 text-center">
            No Posts Related to <br />
            <b className="uppercase">{genre}</b>
        </h1>
    );

    return !loading ? (
        <main className="min-h-screen">
            <Animate className="w-[95%] max-w-[1200px] mx-auto py-8" {...props}>
                {title}
                <Container>
                    <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                </Container>
            </Animate>
        </main>
    ) : (
        <Loading />
    );
}

export default PostsByGenre;
