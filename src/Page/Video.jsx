import { Link } from "react-router-dom"; 
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useFetch from "../utils/useFetch";
import AuthContext from "../utils/authContext";

function Video() {
    const { data, error, loading } = useFetch("http://localhost:6500/api/videos");
    const params = useParams();
    const { userName } = useContext(AuthContext);

    const [video, setVideo] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedComment, setEditedComment] = useState("");

    useEffect(() => {
        if (data) {
            const selectedVideo = data.find((video) => video._id === params.id);
            if (selectedVideo) {
                setVideo(selectedVideo);
                setComments(selectedVideo.comments || []);
            }
        }
    }, [data, params.id]);

    if (error) return <p>Error in Loading...</p>;
    if (loading) return <p>Loading...</p>;
    if (!video) return <p>Video not found!</p>;

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

    function handleAddComment() {
        if (newComment.trim() === "") return;

        const newCommentObj = {
            personLogo: userName ? userName.charAt(0).toUpperCase() : "U",
            personEmail: userName || "Unknown User",
            commentTime: "Just now",
            personComment: newComment,
        };

        setComments([newCommentObj, ...comments]);
        setNewComment("");
    }

    // Filter out the current video from suggestions
    const suggestedVideos = data?.filter((video) => video._id !== params.id);

    return (
        <div className="flex py-7 pl-24 gap-4 bg-white pt-[90px] font-sans">
            <div className="flex w-full gap-6">
                <div className="flex flex-col w-full max-w-[870px]">
                    <div className="w-full">
                        <iframe
                            src={video.videoUrl}
                            width="850"
                            height="480"
                            allow="autoplay"
                            className="rounded-2xl"
                        ></iframe>
                    </div>
                    <div className="flex flex-col mt-4">
                        <h1 className="text-[22px] font-semibold">{video.title}</h1>
                        <div className="flex justify-between mt-[10px]">
                            <div className="flex gap-4">
                                <img src={video.videoOwnerLogo} alt="logo" className="w-[35px] h-[35px] rounded-full" />
                                <div>
                                    <h3 className="font-medium">{video.channelName}</h3>
                                    <p className="text-sm">1M subscribers</p>
                                </div>
                                <button className="rounded-3xl bg-black text-white px-4 flex justify-center items-center h-9 font-semibold ml-3">Subscribe</button>
                            </div>
                        </div>
                    </div>

                    {/* Video Description Section */}
                    <div className="mt-7 bg-[#f0f0f0] font-medium p-3 flex flex-col gap-2 rounded-2xl">
                        <div className="flex gap-3">
                            <span>{video.views} views</span>
                            <span>{video.posted}</span>
                        </div>
                        <p className="font-[400] text-[15px]">{video.description}</p>
                    </div>

                    {/* Comments Section */}
                    <div>
                        <h2 className="ml-2">{comments.length} Comments</h2>
                        <div className="flex mt-2.5 gap-2.5">
                            {/* Logged-in user's profile (First Letter) */}
                            <div className="w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-xl">
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

                        {/* Mapping Comments */}
                        <div>
                            {comments.map((comment, commentIndex) => (
                                <div key={commentIndex} className="flex gap-3 items-center mb-6">
                                    {/* Profile Image or First Letter */}
                                    {comment.personLogo.length > 1 ? (
                                        <img src={comment.personLogo} alt="Commenter" className="w-[40px] h-[40px] rounded-full" />
                                    ) : (
                                        <div className="w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-xl">
                                            {comment.personLogo}
                                        </div>
                                    )}
                                    <div className="flex flex-col w-full">
                                        <div className="flex gap-2.5 items-center">
                                            <p className="text-[14px] font-medium">{comment.personEmail}</p>
                                            <p className="text-sm">{comment.commentTime}</p>
                                        </div>
                                        <div className="mt-2.5 flex justify-between items-center w-full">
                                            {editingIndex === commentIndex ? (
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
                                                {editingIndex === commentIndex ? (
                                                    <button onClick={() => handleSave(commentIndex)} className="text-blue-500 font-medium background">Save</button>
                                                ) : (
                                                    <button onClick={() => handleEdit(commentIndex)} className="text-gray-700 background">Edit</button>
                                                )}
                                                <button onClick={() => handleDelete(commentIndex)} className="text-red-500 background">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Video Suggestions Section */}
                <div className="w-[30%] flex flex-col gap-4 ">
                    {suggestedVideos.map((video) => (
                        <Link key={video._id} to={`/watch/${video._id}`} className="flex gap-3">
                            <img src={video.thumbnail} alt="Video Thumbnail" className="w-[160px] h-[90px] rounded-lg" />
                            <div>
                                <h3 className="font-semibold text-sm">{video.title}</h3>
                                <p className="text-xs">{video.channelName}</p>
                                <p className="text-xs">{video.views} views • {video.posted}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Video;
