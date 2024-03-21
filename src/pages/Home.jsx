import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Animate from "../components/Animate";
import Loading from "../components/Loading";
import Carousel from "../components/Carousel";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        setLoading(true);
        if (authStatus) {
            appwriteService
                .getPosts([])
                .then((posts) => {
                    if (posts) {
                        setPosts(posts.documents);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [authStatus]);

    if (!authStatus) {
        return (
            <div className="flex items-center justify-center w-full min-h-screen">
                <div className="">
                    <h1 className="text-2xl text-slate-800 font-semibold">
                        Login to read posts
                    </h1>
                </div>
            </div>
        );
    }

    return !loading ? (
        <>
            <Animate>
                {posts.length && <Carousel posts={posts.slice(0, 10)} />}
                <Container className="w-[95%] max-w-[1200px] mx-auto py-10">
                    <h1 className="text-2xl font-semibold text-slate-800 mb-4 md:text-3xl">
                        Recent Blog Posts
                    </h1>
                    <div className="gap-4 md:max-h-[700px] md:grid md:grid-cols-4 md:grid-rows-2">
                        {posts.slice(0, 8).map((post, index) => (
                            <PostCard
                                key={post.$id}
                                {...post}
                                className={`rounded-lg h-[180px] first-of-type:col-span-2 first-of-type:row-span-2 ${
                                    index === 1 ? "col-span-2" : ""
                                } my-4 sm:h-[250px] md:my-0 md:h-auto`}
                                titleSize={index === 0 ? "md:text-4xl" : ""}
                            />
                        ))}
                    </div>
                    {posts.length > 8 && (
                        <Link
                            to="/all-posts"
                            className="block text-center p-2 bg-[#29ca8e] text-white rounded-full my-4 max-w-[200px] mx-auto duration-300 hover:bg-[#156748]"
                        >
                            View All
                        </Link>
                    )}
                </Container>
            </Animate>
        </>
    ) : (
        <Loading />
    );
}

export default Home;
