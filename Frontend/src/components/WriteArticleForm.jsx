import titleIcon from "../assets/icons/titre.png";
import image from "../assets/icons/inserer-une-icone-dimage.png";
import paragraphe from "../assets/icons/paragraphe.png";
import tagImage from "../assets/icons/tag-forme-noire.png";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function createTags(tags) {
    return tags.map((tag) => {
        return <div key={tag + "_tag"} className="p-2 border border-light-pink rounded-full flex flex-row gap-2 items-center justify-center">
            <img src={tagImage} alt="tag" className="h-[15px] w-[15px]" />
            <input type="text" maxLength="15" name={`tag-${tag}`} value={tag} className="text-light-pink font-medium text-small-subtitle bg-transparent outline-none w-[60px]" />
        </div>
    });
}

function WriteArticleForm({ host, community }) {
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState("");
    const [inputs, setInputs] = useState({ community: community });
    const navigate = new useNavigate();
    const url = `${host}/articles`;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(url, inputs, {
            withCredentials: true,
        }).then(res => {
            if (res.data.errors) {
                console.log(res.data.errors);
            }
            if (res.status == 401 || res.status == 403) navigate("/login");
            if (res.status == 404) navigate("/E404");

            if (res.status === 200) {
                navigate("/home");
            }
        }).catch(err => { console.log(err); });
    }

    return (
        <form action="" onSubmit={handleSubmit} className="mb-10">
            <div className="mb-8">
                <label className="text-md text-white font-medium mb-2 block">Title*</label>
                <div className="w-full py-2 px-4 border border-border-grey rounded-md flex flex-row items-center justify-start">
                    <img src={titleIcon} alt="title" className="h-[20px] w-[20px]" />
                    <input name="title" maxLength="50" type="text" placeholder="Add title for your article" className="w-full ml-4 py-2 bg-transparent outline-none text-white" required onChange={(e) => setInputs({ ...inputs, "title": e.target.value })} />
                </div>
            </div>
            <div className="mb-8">
                <label className="text-md text-white font-medium mb-2 block">Cover*</label>
                <div className="w-full py-2 px-4 border border-border-grey rounded-md flex flex-row items-center justify-start">
                    <img src={image} alt="title" className="h-[20px] w-[20px]" />
                    <input name="cover" maxLength="200" title="An image URL" type="text" required placeholder="Add article's cover URL" className="w-full ml-4 py-2 bg-transparent outline-none text-white" onChange={(e) => setInputs({ ...inputs, "article_img": e.target.value })} />
                </div>
            </div>
            <div className="mb-8">
                <label className="text-md text-white font-medium mb-2 block">Description*</label>
                <div className="w-full py-2 px-4 border border-border-grey rounded-md flex flex-row items-start justify-start">
                    <img src={paragraphe} alt="title" className="h-[20px] w-[20px] mt-[10px]" />
                    <textarea name="description" maxLength="255" required placeholder="Give a brief description" className="w-full ml-4 py-2 bg-transparent outline-none text-white resize-none h-[100px]" onChange={e => setInputs({ ...inputs, "article_description": e.target.value })} />
                </div>
            </div>
            <div className="mb-8 flex flex-row items-center justify-start gap-4 flex-wrap">
                {createTags(tags)}
                <div className="p-2 border border-light-pink rounded-full flex flex-row gap-2 items-center justify-center">
                    <img src={tagImage} alt="tag" className="h-[15px] w-[15px]" />
                    <input type="text" maxLength="15" className="text-white placeholder:text-light-pink font-medium text-small-subtitle bg-transparent outline-none w-[60px]" placeholder="Add tag" onKeyDown={e => { if (e.key == " " && tags.length < 5) { setTags([...tags, e.target.value]); e.target.value = ''; setInputs({ ...inputs, "fields": tags }) } else if (tags.length > 5) { alert("you can't add more than 5 tags") } }} />
                </div>
            </div>
            <label className="text-md text-white font-medium mb-2 block">Content*</label>
            <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
                <textarea name="content" maxLength="65536" required className="w-full lg:w-1/2  h-[300px] lg:h-[500px] p-4 rounded-md text-white bg-transparent outline-none border border-border-grey resize-none" placeholder="Write something.." onChange={e => { setContent(e.target.value); setInputs({ ...inputs, "content": e.target.value }) }} />
                <div className="markdown w-full lg:w-1/2 h-[300px] lg:h-[500px] p-4 text-black bg-white rounded-md overflow-y-auto">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>

            </div>
            <div className="w-full flex flex-row justify-center lg:justify-end items-center mt-12">
                <input type="submit" className="w-full lg::w-[200px] py-4 rounded-md bg-dark-pink font-medium text-sm text-white cursor-pointer" value="publish" />
            </div>
        </form>
    );
}

export default WriteArticleForm;