import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Comments from "../components/Comments";
import ReactMarkdown from "react-markdown";
import "../styles/pages/article.css";
import articleImg from "../assets/images/post1.jpg";
import communityImg from "../assets/images/community.jpg";
import authorImg from "../assets/images/person.jpg";
import profile from "../assets/images/profile.jpg";
import sendIcon from "../assets/icons/send.png";
import likesIcon from "../assets/icons/like.png";
import loadMoreImg from "../assets/icons/reload.png";
import userImg from "../assets/images/person.jpg";

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "dark",
            profile: profile,
            article: {
                date: "March 14, 2023",
                time: "20:34",
                articleImg: articleImg,
                communityName: "Iot Community",
                communityImg: communityImg,
                author: {
                    name: "Touahria Yacine",
                    img: authorImg,
                    stats: {
                        likes: "234k",
                        publications: "40"
                    }
                },
                fields: ["astronomy", "sky"],
                comments: [
                    {
                        user: {
                            name: "Touahria Yacine",
                            img: userImg,
                            stats: {
                                publications: "23",
                                likes: "40k"
                            }
                        },
                        date: "March 16, 2023",
                        time: "14:09",
                        text: "Vitae malesuada tortor pellentesque nec. Etiam consectetur risus non eros aliquam condimentum. Pellentesque mauris lorem, molestie cursus aliquet a, placerat sit amet arcu. Praesent luctus ex id ipsum porta sodales et et nulla."
                    },
                    {
                        user: {
                            name: "Touahria Yacine",
                            img: userImg,
                            stats: {
                                publications: "23",
                                likes: "40k"
                            }
                        },
                        date: "March 16, 2023",
                        time: "14:09",
                        text: "Vitae malesuada tortor pellentesque nec. Etiam consectetur risus non eros aliquam condimentum. Pellentesque mauris lorem, molestie cursus aliquet a, placerat sit amet arcu. Praesent luctus ex id ipsum porta sodales et et nulla."
                    },
                    {
                        user: {
                            name: "Touahria Yacine",
                            img: userImg,
                            stats: {
                                publications: "23",
                                likes: "40k"
                            }
                        },
                        date: "March 16, 2023",
                        time: "14:09",
                        text: "Vitae malesuada tortor pellentesque nec. Etiam consectetur risus non eros aliquam condimentum. Pellentesque mauris lorem, molestie cursus aliquet a, placerat sit amet arcu. Praesent luctus ex id ipsum porta sodales et et nulla.",
                    },
                ],
                text: `# Put your title here
## 1. Subtitle
**Lorem ipsum dolor** sit amet, consectetur adipiscing *elit*. ***Sed*** id augue sit amet nunc fermentum faucibus. Proin diam justo, vehicula sed nisl vel, posuere tempor massa. Praesent convallis sem nec risus faucibus, eget porttitor sapien vulputate. Integer euismod, dui sit amet pulvinar bibendum, nulla nibh congue est, vel luctus tellus nunc in ligula. Quisque sagittis urna quis ipsum pulvinar mollis. Vivamus hendrerit vestibulum tellus, sed blandit nisl. Donec ac nunc et neque lobortis lacinia. Donec bibendum sed dolor sed malesuada.

![This is my caption](https://nationaltoday.com/wp-content/uploads/2021/05/Astronomy.jpg)                

> This is my quote
---

## 2. Subtitle
Nullam nisl nisl, ornare et tellus in, sollicitudin pharetra arcu. Nulla sed purus id ipsum tristique laoreet sed vel velit. Maecenas quam turpis, dapibus vitae nunc vel, pharetra consequat tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse quis faucibus nunc, eu sollicitudin magna. Proin bibendum varius ligula, vitae malesuada tortor pellentesque nec. Etiam consectetur risus non eros aliquam condimentum. Pellentesque mauris lorem, molestie cursus aliquet a, placerat sit amet arcu. Praesent luctus ex id ipsum porta sodales et et nulla.

### 2.1. Subsubtitle

1. Write the press release
2. Update the website
3. Contact the media

\`\`\` language ="python">
    x = 3**2
    def do_something():
        print("hello world")
\`\`\`
![](https://media.npr.org/assets/img/2022/12/23/52439693830_b5cf75835f_k1_vert-53642887c9b1c32f22f111a79c2f6e0111a5a7b8-s1100-c50.jpg)
`,
            }

        };
    }
    createFields() {
        return this.state.article.fields.map(function (field) { return <span className="border border-light-pink text-light-pink text-xs font-medium py-1 px-2 rounded-[10px] mr-2">{field}</span> });
    }
    switchTheme(event) {
        let checkbox = event.target;
        checkbox.classList.toggle("checked");
        if (checkbox.classList.contains("checked")) { this.setState({ theme: "light" }) } else { this.setState({ theme: "dark" }); };
    }
    render() {
        return (
            <div className="bg-gradient-to-b from-page-light-dark to-page-dark relative text-white">
                <div className="relative z-10">
                    <div className="h-96 w-full">
                        <img src={this.state.article.articleImg} alt="article" className="object-cover w-full h-full" />
                    </div>
                    <div className="absolute top-0 left-0 right-0">
                        <NavBar></NavBar>
                    </div>
                    <div className="px-20 py-10 flex flex-row items-start justify-between gap-4">
                        <div className="flex flex-row gap-2 items-center justify-start">
                            <span className="block text-[18px] text-md font-semibold">A a</span>
                            <input className="block w-24" type="range" min="12" max="20" step="2" />
                        </div>
                        <div className="flex flex-row justify-start items-center gap-4">
                            <div className="relative">
                                <img src={this.state.article.communityImg} alt="community" className="h-[55px] w-[55px] rounded-[27.5px] object-cover" />
                                <img src={this.state.article.author.img} alt="author" className="h-[20px] w-[20px] rounded-[10px] absolute bottom-0 right-0 object-cover" />
                            </div>
                            <div className="flex flex-col gap-1 justify-start items-start">
                                <span className="block text-small-subtitle text-white font-semibold">{this.state.article.author.name} | {this.state.article.communityName}</span>
                                <span className="block text-mini-text text-subtitle font-medium">{this.state.article.author.stats.publications} publications, {this.state.article.author.stats.likes} likes</span>
                            </div>
                        </div>
                        <div className="translate-x-10">
                            <div class='toggle-switch'>
                                <label>
                                    <input type='checkbox' className="checked" onClick={event => this.switchTheme(event)} />
                                    <span class='slider'></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="px-20 flex flex-row justify-center items-center gap-2">
                        <img src={profile} alt="profile" className="h-[30px] w-[30px] object-cover rounded-full" />
                        <form action="">
                            <div className="flex flex-row gap-2 justify-start items-center pb-2 border-b-2 border-feed-border w-[400px]">
                                <input type="text" placeholder="Add comment" className="bg-transparent border-none outline-none text-mini-text w-full" />
                                <button><img src={sendIcon} alt="send" className="h-[20px] w-[20px]" /></button>
                            </div>
                        </form>
                    </div>
                    <div className="grid grid-cols-5 grid-rows-1 w-full mt-10 px-20 gap-4">
                        <div></div>
                        <div className="col-span-3">
                            <div className="mb-4">
                                {this.createFields()}
                            </div>
                            <span className="text-subtitle font-medium text-md mb-4 block">{this.state.article.date} {this.state.article.time}</span>
                            <div className="markdown">
                                <ReactMarkdown>{this.state.article.text}</ReactMarkdown>
                            </div>
                            <Comments comments={this.state.article.comments}></Comments>
                            <dir className="w-full flex justify-center items-center">
                                <button className="mt-8 flex flex-row items-center justify-center gap-4 border-2 px-4 py-2 rounded-md border-feed-border bg-load-more">
                                    <img className="h-4 w-4 opacity-70" src={loadMoreImg} alt="load more" />
                                    <span className="text-description font-semibold">Load more..</span>
                                </button>
                            </dir>
                        </div>
                        <div className="flex flex-row items-start justify-center gap-4">
                            <div className="flex flex-col justify-center items-center gap-2">
                                <img src={likesIcon} alt="dislike" className="rotate-180 h-[30px] w-[30px] opacity-75" />
                                <span className="text-description font-medium text-mini-text">5 dislikes</span>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <img src={likesIcon} alt="like" className="h-[30px] w-[30px] opacity-75" />
                                <span className="text-description font-medium text-mini-text">29 likes</span>
                            </div>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div >
        );
    }



}

export default Article;