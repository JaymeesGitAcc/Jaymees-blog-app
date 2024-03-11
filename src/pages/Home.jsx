import React from "react";
import appwriteService from "../appwrite/config";
import { useState } from "react";
import { useEffect } from "react";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";
import Animate from "../components/Animate";
import Loading from "../components/Loading";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        setLoading(true);
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
    }, []);

    if (!authStatus) {
        return (
            <div className="w-full min-h-screen">
                <Container>
                    <div className="flex flex-wrap">
                        <h1>Login to read posts</h1>
                    </div>
                </Container>
            </div>
        );
    }

    // if (authStatus && !posts.length) {
    //     return (
    //         <div className="w-full py-8">
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     <h1>No Posts...</h1>
    //                 </div>
    //             </Container>
    //         </div>
    //     );
    // }

    return !loading ? (
        <Animate className="w-[95%] max-w-[1200px] mx-auto py-8">
            <h1 className="text-2xl font-semibold text-slate-800 text-center">
                Latest Blog posts
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

export default Home;
