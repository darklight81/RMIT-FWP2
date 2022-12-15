import {ReplyForm} from "./ReplyForm";
import Posts from "./Posts"
import {fireEvent, render} from "@testing-library/react";
import UserContext, {userContext} from "../contexts/userContext";
import {screen} from '@testing-library/dom'
import {BrowserRouter} from "react-router-dom";
import Signup from "../routes/signup";
import NavigationBar from "./NavigationBar";

const posts = [
    {
        postId: 1,
        user: {
            username: "ryan",
            password: "password",
            firstname: "Ryan",
            lastname: "Tyson-Hurley",
        },
        body: "This is the second post. 👏"
    },
    {
        postId: 2,
        user: {
            username: "ryan",
            password: "password",
            firstname: "Ryan",
            lastname: "Tyson-Hurley",
        },
        body: "This is the first post. 👀"
    }
]

const users = [
    {
        "userId": 1,
        "username": "igor",
        "password": "$argon2id$v=19$m=4096,t=3,p=1$2FCREpJO4MX9RxWcYmwwOw$NuwY9d8fFCtJtAFLu199lAkT5Rerz3c78yfujJfY2c4",
        "firstname": "Igor",
        "lastname": "Sulovsky",
        "bio": null,
        "createdAt": "2022-10-16T01:19:36.000Z",
        "updatedAt": "2022-10-16T01:19:36.000Z",
    },
    {
        username: "igor",
        password: "password",
        firstname: "Igor",
        lastname: "Sulovsky",
    },
    {
        username: "moshe",
        password: "password",
        firstname: "Moshe",
        lastname: "Stone",
    },
]

const comments = [
    {
        postId: 1,
        authorId: 2,
        body: "Woah so lovely! 🥰",
    },
    {
        postId: 1,
        authorId: 1,
        body: "Async functions always return a promise. If the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise.",
    },
    {
        postId: 1,
        parentId: 1,
        authorId: 1,
        body: "This is a nested comment.",
    },
]


test("Input value is empty", () => {
    // Render ReplyForm component.
    const getByTestId = render(
        <UserContext>
            <ReplyForm />
        </UserContext>
    );
    const input = screen.getByPlaceholderText("Write a reply...");
    expect(input.value).toBe("");
    })

test("Reply sent", () => {
    // Render ReplyForm component.
    const { getByTestId } = render(
        <UserContext>
            <ReplyForm authorComment={comments[0]} />
        </UserContext>
    );
    const input = screen.getByPlaceholderText("Write a reply...");
    fireEvent.change(input, { target: { value: "Hello" } });
    const btn = screen.getByTestId("reply-btn");
    fireEvent.click(btn);
    expect(input.value).toBe("");
})

test("Sign up button generated", () => {
    const login = render(
        <BrowserRouter>
            <UserContext>
                <Signup/>
            </UserContext>
        </BrowserRouter>
    );
    const submitBtn = screen.getByTestId("submit-btn");
    expect(submitBtn).toBeInTheDocument();

})

test("Posts generated", () => {
    const login = render(
        <BrowserRouter>
            <UserContext>
                <Posts posts={posts}/>
            </UserContext>
        </BrowserRouter>
    );
    const gatheredPosts = screen.getAllByLabelText("mypost")
    expect(gatheredPosts.length).toEqual(2)
})

test("Navbar login button generated", () =>{
    const login = render(
        <BrowserRouter>
            <UserContext>
                <NavigationBar/>
            </UserContext>
    </BrowserRouter>)
    const logoutBtn = screen.getByTestId("login-btn")
    expect(logoutBtn).toBeInTheDocument()
})

