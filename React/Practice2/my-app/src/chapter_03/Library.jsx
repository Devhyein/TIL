import React from "react";
import Book from "./Book";

function Library(props) {
    return (
        <div>
            <Book name="처음 만난 파이썬" numOfPage={400}></Book>
            <Book name="책2" numOfPage={300}></Book>
            <Book name="라인이 보고 싶다" numOfPage="500"></Book>
        </div>
    );
}

export default Library;