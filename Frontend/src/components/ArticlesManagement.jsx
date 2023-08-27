import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@material-tailwind/react";
import { motion } from 'framer-motion';
import ArticleDialog from './ArticleDialog';
import Dialog from './Dialog';
import { TiInfoOutline } from 'react-icons/ti'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { IoAddSharp } from 'react-icons/io5'
import axios from 'axios';
import Alert from './Alert';
import DeleteConfirmationDialog from './DeleteConfirmationDialog'
import ArticleAddDialog from './ArticleAddDialog';
import AdminTablesHeader from './AdminTablesHeader';
import Pagination from './Pagination';
import ArticleDeleteDialog from './ArticleDeleteDialog';
import TableSearchBar from './TableSearchBar';
import ActionsFilters from './ActionsFilters';
import ArticleEditDialog from './ArticleEditDialog';

const ArticlesManagement = () => {

    const [articles, setArticles] = useState([]);
    const [showAlert, setShowAlert] = useState(false)
    const host = "http://localhost:5000";
    const picturesUrl = `${host}/picture/`;
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedArticle, setArticle] = useState({});
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const articleColumns = ['Id', 'Title', 'Author', 'Creation or last update', 'Community', 'Likes', 'Actions'];
    const [alertMessage, setAlertMessage] = useState('')
    const [allArticles, setAllArticles] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const articleFields = ['id', 'title', 'author', 'community_name', 'nb_likes']

    const openAddDialog = (user) => {
        setIsAddDialogOpen(true);
    };

    const closeAddDialog = () => {
        setIsAddDialogOpen(false);
    };



    const openDeleteDialog = (article) => {
        setIsDeleteDialogOpen(true);
        setArticle(article)
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    const openEditDialog = (article) => {
        setIsEditDialogOpen(true);
        setArticle(article)
    };

    const closeEditDialog = () => {
        setIsEditDialogOpen(false);
    };



    const openDialog = (article) => {
        setIsDialogOpen(true);
        setArticle(article)
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };



    useEffect(() => {
        const fetchArticles = async () => {
            var result = await fetch(`${host}/articles/all`, { credentials: "include" });
            if (result.status === 401 || result.status === 403) {
                const data = await fetch(`${host}/refresh`, { credentials: "include" });
                if (data.status === 401 || data.status === 403) {
                    navigate("/login");
                } else {
                    navigate("/home");
                }
            } else {
                if (result.status === 200) {

                    result.json().then(json => {
                        setArticles(json);
                        setAllArticles(json)
                    });

                } else {
                    navigate("/E404");
                }
            }
        };

        fetchArticles();

    }, []);


    return (

        <motion.div
            initial={ { opacity: 0, x: -20 } }
            animate={ { opacity: 1, x: 0 } }
            exit={ { opacity: 0, x: 20 } }
            transition={ { duration: 0.5 } }
        >
            { showAlert && <Alert message={ alertMessage } onClose={ () => setShowAlert(false) } /> }

            <section className='py-14'>
                <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div class="bg-white dark:bg-gray-800 relative shadow-2xl sm:rounded-2xl overflow-hidden">
                        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <TableSearchBar allData={ allArticles } tableData={ articles } setTableData={ setArticles } fields={ articleFields } />
                            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button onClick={ () => { openAddDialog('') } } type="button" class="flex items-center justify-center text-white bg-[#7e4efc] hover:bg-primary-800 gap-2 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    <IoAddSharp className='text-white h-5 w-5' />
                                    Add article
                                </button>

                                <ArticleAddDialog
                                    isOpen={ isAddDialogOpen }
                                    onClose={ closeAddDialog }
                                    setArticles={ setArticles }
                                    setShowAlert={ setShowAlert }
                                    setAlertMessage={ setAlertMessage }
                                    setAllArticles={ setAllArticles }
                                />

                                <ActionsFilters />
                            </div>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <AdminTablesHeader columns={ articleColumns } />
                                <tbody>
                                    { console.log(articles) }
                                    { articles.slice(startIndex, endIndex).map(article => {
                                        return (
                                            <tr key={ article.id } class="border-b dark:border-gray-700 hover:bg-gray-50 ">
                                                <td class="w-4 p-4">
                                                    <div class="flex items-center">
                                                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                                <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{ article.id }</th>

                                                <td class="px-4 py-3">
                                                    <Tooltip
                                                        className='bg-transparent'
                                                        content={
                                                            <div className='flex flex-row justify-center items-center rounded-md'>
                                                                <img className='w-auto h-36 rounded-lg' src={ picturesUrl + article.article_img } alt='' />
                                                            </div>
                                                        }
                                                        animate={ {
                                                            mount: { scale: 1, y: 0 },
                                                            unmount: { scale: 0, y: 25 },
                                                        } }
                                                    >
                                                        { article.title }
                                                    </Tooltip>
                                                </td>


                                                <td class=" px-4 py-3 flex items-center font-medium text-gray-900 ">
                                                    <Tooltip
                                                        className='bg-transparent'
                                                        content={
                                                            <div className='flex flex-row justify-center items-center rounded-md'>
                                                                <img className='w-auto h-36 rounded-lg' src={ picturesUrl + article.profile_pic } alt='' />
                                                            </div>
                                                        }
                                                        animate={ {
                                                            mount: { scale: 1, y: 0 },
                                                            unmount: { scale: 0, y: 25 },
                                                        } }
                                                    >
                                                        <img className='rounded-full w-10 h-10 mr-3' src={ picturesUrl + article.profile_pic } alt='' />
                                                    </Tooltip>
                                                    <Tooltip
                                                        className=''
                                                        content={
                                                            <div className='flex flex-col justify-center items-center rounded-md'>
                                                                <h1>{ article.username }</h1>
                                                                <h1>{ article.user_id }</h1>
                                                            </div>
                                                        }
                                                        animate={ {
                                                            mount: { scale: 1, y: 0 },
                                                            unmount: { scale: 0, y: 25 },
                                                        } }
                                                    >
                                                        { article.email }
                                                    </Tooltip>
                                                </td>
                                                <td class="px-4 py-3">{ article.date_time }</td>
                                                <td class="px-4 py-3 flex items-center font-medium text-gray-900 ">
                                                    <Tooltip
                                                        className='bg-transparent'
                                                        content={
                                                            <div className='flex flex-row justify-center items-center rounded-md'>
                                                                <img className='w-auto h-36 rounded-lg' src={ picturesUrl + article.community_pic } alt='' />
                                                            </div>
                                                        }
                                                        animate={ {
                                                            mount: { scale: 1, y: 0 },
                                                            unmount: { scale: 0, y: 25 },
                                                        } }
                                                    >
                                                        <img className='rounded-full w-10 h-10 mr-3' src={ picturesUrl + article.community_pic } alt='' />
                                                    </Tooltip>
                                                    <Tooltip
                                                        className=''
                                                        content={
                                                            <div className='flex flex-row justify-center items-center rounded-md'>
                                                                <h1><article>{ article.community_id }</article></h1>
                                                            </div>
                                                        }
                                                        animate={ {
                                                            mount: { scale: 1, y: 0 },
                                                            unmount: { scale: 0, y: 25 },
                                                        } }
                                                    >
                                                        { article.community_name }
                                                    </Tooltip>
                                                </td>
                                                <td class="px-4 py-3">{ article.nb_likes }</td>
                                                <td class="px-4 py-3 flex items-center justify-start gap-4">
                                                    
                                                    <a onClick={ () => { openEditDialog(article) } } href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                                    <ArticleEditDialog
                                                        isOpen={ isEditDialogOpen }
                                                        onClose={ closeEditDialog }
                                                        setArticles={ setArticles }
                                                        setShowAlert={ setShowAlert }
                                                        setAlertMessage={ setAlertMessage }
                                                        setAllArticles={ setAllArticles }
                                                        allArticles={allArticles}   
                                                        articles={articles}
                                                        selectedArticle={selectedArticle}
                                                    />

                                                    <a href="#" onClick={ () => { openDeleteDialog(article) } } class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
                                                    <ArticleDeleteDialog
                                                        isOpen={ isDeleteDialogOpen }
                                                        onClose={ closeDeleteDialog }
                                                        selectedArticle={ selectedArticle }
                                                        setArticles={ setArticles }
                                                        setShowAlert={ setShowAlert }
                                                        articles={ articles }
                                                        allArticles={ allArticles }
                                                        setAllArticles={ setAllArticles }
                                                        setAlertMessage={ setAlertMessage }
                                                    />

                                                    <a href="#" onClick={ () => { openDialog(article) } } class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                                    <ArticleDialog article={ selectedArticle } isOpen={ isDialogOpen } onClose={ closeDialog } />

                                                </td>
                                            </tr>
                                        )
                                    }) }
                                </tbody>
                            </table>
                        </div>
                        <Pagination totale={ articles.length } currentPage={ currentPage } totalPages={ Math.ceil(articles.length / itemsPerPage) } onPageChange={ setCurrentPage } />
                    </div>
                </div>
            </section>


        </motion.div>


    )
}

export default ArticlesManagement