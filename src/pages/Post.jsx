import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import appwriteService from "../appwrite/config";
import Button from "../components/Button";
import Container from "../components/container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

import { FaUser } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import Card from "../components/Card";
import Animate from "../components/Animate";
import Loading from "../components/Loading";

function Post() {
    const [post, setPost] = useState(null);
    const [allPosts, setAllPosts] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    const genreList = allPosts?.reduce((acc, curr) => {
        if (!acc.includes(curr["genre"])) acc.push(curr["genre"]);
        return acc;
    }, []);

    const sameGenrePosts = allPosts?.filter(
        (postItem) =>
            postItem.genre === post?.genre &&
            postItem.featuredImage !== post?.featuredImage
    );

    let otherPosts =
        post && allPosts
            ? allPosts.filter((item) => item.title !== post.title).slice(0, 5)
            : null;

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setAllPosts(posts.documents);
            }
        });
    }, []);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    const dateObj = new Date(post?.$createdAt);
    const addedOn = `${dateObj.getDate()}/${
        dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;

    return post ? (
        <Animate className="py-10 max-w-[1250px] mx-auto md:flex flex-wrap grow">
            <main className="md:w-[77%] grow">
                <article className="p-4">
                    <div className="font-semibold">
                        <h1 className="text-2xl text-slate-800 sm:text-3xl md:text-4xl">
                            {post.title}
                        </h1>
                        <div className="flex items-center flex-wrap gap-4 my-4 text-slate-500 text-sm md:text-xl">
                            <div className="flex items-center">
                                <Link
                                    to={`/`}
                                    className="text-[#29ca8e] first-letter:uppercase hover:underline"
                                >
                                    {post.genre}
                                </Link>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaUser />
                                <h3>{post.author}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCalendarAlt />
                                <h3>{addedOn}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 relative overflow-hidden max-h-[500px]">
                        <img
                            src={appwriteService.getFilePreview(
                                post.featuredImage
                            )}
                            alt={post.title}
                            className="object-cover mx-auto h-full"
                        />
                    </div>
                    <div className="text-slate-700 text-sm sm:text-md md:text-xl">
                        {parse(post.content)}
                    </div>
                </article>
                <Container>
                    {isAuthor && (
                        <div className="absolute-right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    <FaEdit />
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                <MdDelete />
                            </Button>
                        </div>
                    )}
                </Container>

                {sameGenrePosts?.length > 0 && (
                    <Container>
                        <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                            You may also like
                        </h2>
                        {sameGenrePosts.map((post) => (
                            <Card
                                key={post.featuredImage}
                                {...post}
                                className="flex items-center my-4"
                                widthFull={false}
                            />
                        ))}
                    </Container>
                )}
            </main>

            <div className="p-4 md:w-[23%]">
                {otherPosts?.length > 0 && (
                    <aside>
                        {genreList.length && (
                            <div className="my-8">
                                <h3 className="text-slate-800 text-xl font-semibold">
                                    Genres
                                </h3>
                                <ul className="flex gap-4 flex-wrap my-2">
                                    {genreList.map((genre) => (
                                        <li key={genre} className="grow">
                                            <Link
                                                to={"/"}
                                                className="block text-white text-sm text-center bg-[#29ca8e] px-2 py-1 rounded-xl duration-300 hover:bg-[#156748]"
                                            >
                                                {genre}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <h2 className="text-2xl text-slate-800 font-semibold mb-4">
                            Other posts
                        </h2>
                        <ul>
                            {otherPosts?.map((post) => (
                                <li key={post.$id} className="mb-8">
                                    <Card {...post} />
                                </li>
                            ))}
                        </ul>
                        {otherPosts.length > 0 ? (
                            <Link
                                to={`/all-posts`}
                                className="block text-[#29ca8e] text-center border-[1px] border-[#29ca8e] p-2 rounded-full duration-300 hover:bg-[#29ca8e] hover:text-white"
                            >
                                Read all
                            </Link>
                        ) : null}
                    </aside>
                )}
            </div>
        </Animate>
    ) : (
        <Loading />
    );
}

export default Post;
