import { useParams } from "react-router-dom";
import { useState } from "react";
import data from "../utils/data";

function Video() {
    const params = useParams();
    const video = data.filter(video => video.id == params.id);

    const [comments, setComments] = useState(video[0]?.comments || []);
    const [newComment, setNewComment] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedComment, setEditedComment] = useState("");

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
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);
    }

    function handleAddComment() {
        if (newComment.trim() === "") return;
        const newCommentObj = {
            personLogo: "https://cdn-icons-png.flaticon.com/512/847/847969.png", // Placeholder user logo
            personEmail: "user", // Temporary user name
            commentTime: "Just now",
            personComment: newComment,
        };
        setComments([newCommentObj, ...comments]);
        setNewComment("");
    }

    return (
        <div className="flex py-7 pl-20 gap-4 bg-white pt-[90px] font-sans">
            {video.map((video) => (
                <div key={video.id} className="flex w-full">
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
                            <div className="text-[22px] font-semibold">
                                <h1>{video.title}</h1>
                            </div>

                            <div className="flex justify-between mt-[10px]">
                                <div className="flex gap-4">
                                    <div className="w-[35px] h-[35px] cursor-pointer mt-1">
                                        <img src={video.videoOwnerLogo} alt="logo" className="w-full h-full rounded-full" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium Roboto">{video.channelName}</h3>
                                        <p className="text-sm">1M subscribers</p>
                                    </div>
                                    <button className="rounded-3xl bg-black text-white px-4 flex justify-center items-center h-9 font-semibold cursor-pointer ml-3">Subscribe</button>
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
                            <p className="font-[400] text-[15px] font-sans">{video.description}</p>
                        </div>

                        {/* Comments Section */}
                        <div>
                            <h2 className="ml-2">{comments.length} Comments</h2>
                            <div className="flex mt-2.5 gap-2.5">
                                <img src={video.videoOwnerLogo} alt="logo" className="w-[40px] h-[40px] cursor-pointer ml-3.5 rounded-full" />
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        placeholder="Add a Comment..."
                                        className="w-full bg-white h-9 border-b-1 focus:outline-0"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    />
                                    <div className="flex justify-end gap-3.5 mt-2.5">
                                        <button className="background">Cancel</button>
                                        <button className="background" onClick={handleAddComment}>Comment</button>
                                    </div>
                                </div>
                            </div>

                            {/* Mapping Comments */}
                            <div>
                                {comments.map((comment, commentIndex) => (
                                    <div key={commentIndex} className="flex gap-3 items-center mb-6">
                                        <img src={comment.personLogo} alt="Commenter Logo" className="w-[40px] h-[40px] cursor-pointer ml-3.5 rounded-full" />
                                        <div className="flex flex-col w-full">
                                            <div className="flex gap-2.5 items-center">
                                                <p className="text-[14px] font-medium">{comment.personEmail}</p>
                                                <p className="text-sm font-normal">{comment.commentTime}</p>
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
                                                        <button onClick={() => handleSave(commentIndex)} className="text-blue-500 font-medium cursor-pointer">Save</button>
                                                    ) : (
                                                        <button onClick={() => handleEdit(commentIndex)} className="background">Edit</button>
                                                    )}
                                                    <button onClick={() => handleDelete(commentIndex)} className="background">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border w-[38%]">
                        Video Suggestion
                    </div>
                </div>
            ))}

        </div>
    );
}

export default Video;
