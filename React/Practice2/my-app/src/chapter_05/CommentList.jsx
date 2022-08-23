import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "하성운",
        comment: "안녕하세요. 하성운입니다."
    },
    {
        name: "옹성우",
        comment: "안녕하세요. 옹성우입니다."
    },
    {
        name: "박우진",
        comment: "안녕하세요. 박우진입니다."
    }
]

function CommentList(props) {
    return (
        <div>
            {comments.map((comment) => {
                return (
                    <Comment name={comment.name} comment={comment.comment} />
                );
            })}
        </div>
    );
}

export default CommentList;