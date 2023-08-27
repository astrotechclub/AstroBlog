import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@material-tailwind/react";
import { motion } from 'framer-motion';
import CommentDialog from './CommentDialog';
import Dialog from './Dialog';
import { TiInfoOutline } from 'react-icons/ti'
import axios from 'axios';
import DeleteConfirmationDialog from './DeleteConfirmationDialog'
import AdminTablesHeader from './AdminTablesHeader';
import Pagination from './Pagination';
import CommentDeleteDialog from './CommentDeleteDialog';
import TableSearchBar from './TableSearchBar';
import ActionsFilters from './ActionsFilters';

const CommentsManagement = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedComment, setComment] = useState({});
    const [showAlert, setShowAlert] = useState(false)
    const [comments, setComments] = useState([]);
    const [alertMessage, setAlertMessage] = useState('')
    const [allComments, setAllComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const commentColumns = [
        'Id',
        'User',
        'Article',
        'Date',
        'Actions'
    ];
    const commentFields = ['id', 'user_id', 'username', 'article_id']

    const host = "http://localhost:5000";
    const picturesUrl = `${host}/picture/`;
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const navigate = useNavigate();

    const openDeleteDialog = (comment) => {
        setIsDeleteDialogOpen(true);
        setComment(comment)
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    const openDialog = (comment) => {
        setIsDialogOpen(true);
        setComment(comment)
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        const fetchComments = async () => {
            var result = await fetch(`${host}/comments/all`, { credentials: "include" });
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
                        setComments(json);
                        setAllComments(json)
                    });

                } else {
                    navigate("/E404");
                }
            }
        };

        fetchComments();

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
                            <TableSearchBar allData={ allComments } setTableData={ setComments } tableData={ comments } fields={ commentFields } />
                            <ActionsFilters />
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <AdminTablesHeader columns={ commentColumns } />
                                <tbody>
                                    { comments.slice(startIndex, endIndex).map(comment => {
                                        <tr key={ comment.id } class="border-b dark:border-gray-700 hover:bg-gray-50 ">
                                            <td class="w-4 p-4">
                                                <div class="flex items-center">
                                                    <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{ comment.id }</th>
                                            <td class=" px-4 py-3 flex items-center font-medium text-gray-900 ">
                                                <Tooltip
                                                    className='bg-transparent'
                                                    content={
                                                        <div className='flex flex-row justify-center items-center rounded-md'>
                                                            <img className='w-auto h-36 rounded-lg' src={ picturesUrl + comment.profile_pic } alt='' />
                                                        </div>
                                                    }
                                                    animate={ {
                                                        mount: { scale: 1, y: 0 },
                                                        unmount: { scale: 0, y: 25 },
                                                    } }
                                                >
                                                    <img className='rounded-full w-10 h-10 mr-3' src={ picturesUrl + comment.profile_pic } alt='' />
                                                </Tooltip>
                                                <Tooltip
                                                    className=''
                                                    content={
                                                        <div className='flex flex-col justify-center items-center rounded-md'>
                                                            <h1>{ comment.username }</h1>
                                                            <h1>{ comment.userId }</h1>
                                                        </div>
                                                    }
                                                    animate={ {
                                                        mount: { scale: 1, y: 0 },
                                                        unmount: { scale: 0, y: 25 },
                                                    } }
                                                >
                                                    { comment.email }
                                                </Tooltip>
                                            </td>
                                            <td class="px-4 py-3">
                                                <Tooltip
                                                    className=''
                                                    content={
                                                        <div className='flex flex-col justify-center items-center gap-4 rounded-md'>

                                                            <img className='w-auto h-36 rounded-lg' src={ comment.article_img } alt='' />
                                                            <h1>{ comment.articleId }</h1>
                                                        </div>
                                                    }
                                                    animate={ {
                                                        mount: { scale: 1, y: 0 },
                                                        unmount: { scale: 0, y: 25 },
                                                    } }
                                                >
                                                    { comment.title }
                                                </Tooltip>
                                            </td>
                                            <td class="px-4 py-3">{ comment.date_time }</td>
                                            <td class="px-4 py-3 flex items-center justify-start gap-4">
                                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                                <a onClick={ () => { openDeleteDialog(comment) } } href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
                                                <CommentDeleteDialog
                                                    isOpen={ isDeleteDialogOpen }
                                                    onClose={ closeDeleteDialog }
                                                    selectedComment={ selectedComment }
                                                    comments={ comments }
                                                    setComments={ setComments }
                                                    allComments={ allComments }
                                                    setAllComments={ setAllComments }
                                                    setShowAlert={ setShowAlert }
                                                    setAlertMessage={ setAlertMessage }
                                                />

                                                <a href="#" onClick={ () => { openDialog(comment) } } class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                                <CommentDialog comment={ comment } isOpen={ isDialogOpen } onClose={ closeDialog } />

                                            </td>
                                        </tr>
                                    }) }

                                </tbody>
                            </table>
                        </div>
                        <Pagination totale={comments.length} currentPage={ currentPage } totalPages={ Math.ceil(comments.length / itemsPerPage) } onPageChange={ setCurrentPage } />
                    </div>
                </div>
            </section>

        </motion.div>

    )
}

export default CommentsManagement