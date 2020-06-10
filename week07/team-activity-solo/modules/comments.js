//An array to hold all of our comments.
const commentList = [];

//addComment()

//renderCommentList()

//filterCommentsByName()

//a comment type to use as a key

//A comment should look something like this:
const newComment = {
    name: hikeName,
    date: new Date(),
    content: comment,
    type: "hike"
};

export default class Comments {
    //create a class constructor to act as the controller
    //the constructor should set a local property called type when the class is instantiated
    constructor() {
        this.name = hikeName;
        this.date = new Date();
        this.content = comment;
        this.type = "hike";
    }

    getAllComments() {
        return commentList;
    }

    showCommentsList() {
        let allComments = this.getAllComments();
        for (let i = 0; i < allComments.length; i++) {
            //document.getElementById(this.rootElementId).appendChild(renderOneHikeLight(allHikes[i]));
        }
        this.addCommentListener();
    }

    //A method to add an event listener to the submit button.
    //addCommentListener()
}