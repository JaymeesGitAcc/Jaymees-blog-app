import React from "react";
import appwriteService from "../appwrite/config";
import { useState } from "react";
import { useEffect } from "react";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import Animate from "../components/Animate";
import Loading from "../components/Loading";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService
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

    return !loading ? (
        <Animate className="w-[95%] max-w-[1200px] mx-auto py-8">
            <h1 className="text-2xl font-semibold text-slate-800 text-center">
                All Blog Posts
            </h1>
            <Container>
                <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </Animate>
    ) : (
        <Loading />
    );
}

export default AllPosts;
