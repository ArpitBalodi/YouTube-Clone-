import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useFetch from "../utils/useFetch";
import AuthContext from "../utils/authContext";
import { addComment } from "../utils/api";

function Video() {
    const { data, error, loading } = useFetch("http://localhost:6500/api/videos");
    const params = useParams();
    const { userName } = useContext(AuthContext);

    const [video, setVideo] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedComment, setEditedComment] = useState("");

    // Fetching the selected video and its comments
    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            const selectedVideo = data.find((vid) => vid._id === params.id);
            if (selectedVideo) {
                setVideo(selectedVideo);
                setComments(selectedVideo.comments || []);
            }
        }
    }, [data, params.id]);

    if (error) return <p>Error in Loading...</p>;
    if (loading) return <p>Loading...</p>;
    if (!video) return <p>Video not found!</p>;

    async function handleAddComment() {
        if (newComment.trim() === "") return;

        const newCommentObj = {
            personEmail: userName || "Unknown User",
            personComment: newComment,
        };

        try {
            const response = await addComment(video._id, newCommentObj);
            if (response.status === 200) {
                setComments([newCommentObj, ...comments]);
                setNewComment("");
            } else {
                console.error("Failed to add comment:", response.data.message);
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    }

    function handleEdit(index) {
        setEditingIndex(index);
        setEditedComment(comments[index].personComment);
    }

    function handleSave(index) {
        const updatedComments = [...comments];
        updatedComments[index].personComment = editedComment;
        setComments(updatedComments);
        setEditingIndex(null);
        setEditedComment("");
    }

    function handleDelete(index) {
        setComments(comments.filter((_, i) => i !== index));
    }

    // Filtering suggested videos (excluding the currently viewed one)
    const suggestedVideos = Array.isArray(data) ? data.filter((vid) => vid._id !== params.id) : [];

    return (
        <div className="flex flex-col md:flex-row pr-7 pl-10 md:pl-[90px] gap-4 bg-white pt-[90px] font-sans">
            {/* Left Side - Video Section */}
            <div className="flex flex-col w-full max-w-[870px] ">
                <div className="w-full">
                    <iframe
                        src={video.videoUrl}
                        className="rounded-2xl w-full h-[300px] md:h-[480px]"
                        allow="autoplay"
                    ></iframe>
                </div>
                <div className="flex flex-col mt-4">
                    <h1 className="text-[18px] md:text-[22px] font-semibold">{video.title}</h1>
                    <div className="flex justify-between mt-[10px]">
                        <div className="flex gap-4">
                            <img src={video.videoOwnerLogo} alt="logo" className="w-[30px] md:w-[35px] h-[30px] md:h-[35px] rounded-full" />
                            <div>
                                <h3 className="font-medium">{video.channelName}</h3>
                                <p className="text-sm">{video.subscribers} subscribers</p>
                            </div>
                            <button className="rounded-3xl bg-black text-white px-4 flex justify-center items-center h-9 font-semibold ml-3">Subscribe</button>
                        </div>

                        <div className="flex w-[46%] items-center gap-2">
                            <div className="flex items-center">
                                <button className="flex gap-2 bg-[#f0f0f0] hover:bg-[#e1e0e0] px-3.5 rounded-l-2xl py-2 cursor-pointer">
                                    <img src="https://cdn-icons-png.flaticon.com/128/126/126473.png" alt="like" className="h-5" />
                                    <p className="text-sm">{video.likes}</p>
                                </button>
                                <button className="flex px-3.5 bg-[#f0f0f0] hover:bg-[#e1e0e0] rounded-r-2xl py-2 border-l-1 border-gray-400 cursor-pointer">
                                    <img src="https://cdn-icons-png.flaticon.com/128/126/126504.png" alt="dislike" className="h-5" />
                                </button>
                            </div>
                            <div className="flex cursor-pointer">
                                <button className="flex gap-2 hover:bg-[#e1e0e0] px-3.5 rounded-2xl py-2 items-center cursor-pointer bg-[#f0f0f0]">
                                    <img src="https://cdn-icons-png.flaticon.com/128/2958/2958783.png" alt="share" className="h-5" />
                                    <p className="text-sm">Share</p>
                                </button>
                            </div>
                            <div className="flex">
                                <button className="flex gap-2 hover:bg-[#e1e0e0] px-3.5 rounded-2xl py-2 items-center cursor-pointer bg-[#f0f0f0]">
                                    <img src="https://cdn-icons-png.flaticon.com/128/3502/3502477.png" alt="download" className="h-5" />
                                    <p className="text-sm">Download</p>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-7 bg-[#f0f0f0] font-medium p-3 flex flex-col gap-2 rounded-2xl">
                    <div className="flex gap-3">
                        <span>{video.views} views</span>
                        <span>{video.posted}</span>
                    </div>
                    <p className="font-[400] text-[14px] md:text-[15px]">{video.description}</p>
                </div>

                {/* Comments Section */}
                <div>
                    <h2 className="ml-2">{comments.length} Comments</h2>
                    <div className="flex mt-2.5 gap-2.5">
                        <div className="w-[35px] md:w-[40px] h-[35px] md:h-[40px] rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-xl">
                            {userName ? userName.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="flex flex-col w-full">
                            <input
                                type="text"
                                placeholder="Add a Comment..."
                                className="w-full bg-white h-9 border-b focus:outline-0"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <div className="flex justify-end gap-3.5 mt-2.5 mr-3">
                                <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-1 rounded-lg">Comment</button>
                            </div>
                        </div>
                    </div>

                    {/* Display Comments */}
                    <div>
                        {comments.map((comment, index) => (
                            <div key={index} className="flex gap-3 items-center mb-6">
                                <div className="w-[35px] md:w-[40px] h-[35px] md:h-[40px] rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-xl">
                                    {comment.personEmail.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col w-full">
                                    <div className="flex gap-2.5 items-center">
                                        <p className="text-[14px] font-medium">{comment.personEmail}</p>
                                    </div>
                                    <div className="mt-2.5 flex flex-col sm:flex-row justify-between w-full">
                                        {editingIndex === index ? (
                                            <input
                                                type="text"
                                                value={editedComment}
                                                onChange={(e) => setEditedComment(e.target.value)}
                                                className="border-b-2 border-gray-500 focus:outline-none w-full"
                                            />
                                        ) : (
                                            <p>{comment.personComment}</p>
                                        )}
                                        <div className="flex gap-2">
                                            {editingIndex === index ? (
                                                <button onClick={() => handleSave(index)} className="text-blue-500 font-medium background">Save</button>
                                            ) : (
                                                <button onClick={() => handleEdit(index)} className="text-gray-700 background">Edit</button>
                                            )}
                                            <button onClick={() => handleDelete(index)} className="text-red-500 background">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Suggested Videos */}
            <div className="w-full md:w-[50%] flex flex-col gap-4">
                {suggestedVideos.map((vid) => (
                    <Link key={vid._id} to={`/watch/${vid._id}`} className="flex gap-3 flex-col md:flex-col xl:flex-row sm:flex-row">
                        <img src={vid.thumbnail} alt="Video Thumbnail" className="w-[35%] h-[100px] rounded-lg" />
                        <div className="w-[50%]">
                            <h3 className="font-semibold text-sm">{vid.title}</h3>
                            <p className="text-xs">{vid.channelName}</p>
                            <p className="text-xs">{vid.views} views • {vid.posted}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Video;
