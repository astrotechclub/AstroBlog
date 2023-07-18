import React from "react";
import topArticlesIcon from "../assets/icons/trophy.png";
import articleImg from "../assets/images/post1.jpg";
import secondArticleImg from "../assets/images/post2.jpg";
import thirdArticleImg from "../assets/images/post3.jpg";
import { toHash } from "ajv/dist/compile/util";

class TopArticles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topArticle: {
                img: articleImg,
                fields: ["astronomy", "sky"],
                date: "March 14, 2023",
                time: "20:34",
                comments: "234",
                reviews: "10k",
                title: "Put your title here",
                description: "Vivamus ornare velit eget eros rutrum, a venenatis purus egestas. Ut auctor porttitor libero, non suscipit mi rutrum non. Integer erat neque, sodales ac faucibus vitae..."
            },
            secondArticle: {
                img: secondArticleImg,
                fields: ["astronomy", "sky"],
                date: "March 14, 2023",
                time: "20:34",
                title: "Your second title here",
            },
            thirdArticle: {
                img: thirdArticleImg,
                fields: ["quantum", "physics", "science"],
                date: "March 14, 2023",
                time: "20:34",
                title: "Your third title here",
            }
        };
    }
    render() {
        return (
            <div className="px-20 py-8">
                <div className="pb-4 border-b-2 border-feed-border flex flex-row justify-start items-center gap-4">
                    <img src={topArticlesIcon} alt="top articles" className="h-7 w-7" />
                    <h2 className="font-semibold text-big-title text-white">Top Articles</h2>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-10 mt-6">
                    <div className="w-full h-full row-span-2 cursor-pointer">
                        <div className="relative">
                            <img src={this.state.topArticle.img} alt="article" className="h-64 w-full object-cover" />
                            <div className="absolute bottom-3 left-5 flex flex-row gap-2">
                                {this.state.topArticle.fields.map(function (field) { return <span key={field} className="border border-light-pink text-light-pink text-xs font-medium py-1 px-2 rounded-[10px]">{field}</span>; })}
                            </div>
                        </div>
                        <div className="my-3 flex flex-row items-center justify-between">
                            <span className="text-subtitle font-medium text-xs">{this.state.topArticle.date} {this.state.topArticle.time}</span>
                            <span className="text-subtitle font-medium text-xs">{this.state.topArticle.comments}comments, {this.state.topArticle.reviews}reviews</span>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-xl mb-2">{this.state.topArticle.title}</h3>
                            <p className="text-description text-base">{this.state.topArticle.description}</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-row items-start justify-between gap-4 cursor-pointer">
                        <img src={this.state.secondArticle.img} alt="article" className="h-48 w-1/2 object-cover" />
                        <div className="h-full w-1/2">
                            <span className="text-subtitle font-medium text-xs">{this.state.secondArticle.date} {this.state.secondArticle.time}</span>
                            <h3 className="text-white font-semibold text-lg my-4">{this.state.secondArticle.title}</h3>
                            <div className="flex flex-row items-center justify-start gap-2">
                                {this.state.secondArticle.fields.map(function (field) { return <span key={field} className="border border-light-pink text-light-pink text-xs font-medium py-1 px-2 rounded-[10px]">{field}</span>; })}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row items-start justify-between gap-4 cursor-pointer">
                        <img src={this.state.thirdArticle.img} alt="article" className="h-48 w-1/2 object-cover" />
                        <div className="h-full w-1/2">
                            <span className="text-subtitle font-medium text-xs">{this.state.thirdArticle.date} {this.state.thirdArticle.time}</span>
                            <h3 className="text-white font-semibold text-lg my-4">{this.state.thirdArticle.title}</h3>
                            <div className="flex flex-row items-center justify-start gap-2">
                                {this.state.thirdArticle.fields.map(function (field) { return <span key={field} className="border border-light-pink text-light-pink text-xs font-medium py-1 px-2 rounded-[10px]">{field}</span>; })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TopArticles;