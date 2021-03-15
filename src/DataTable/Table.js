import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Pagination from "./Pagination";
import {useHistory, useLocation, Link} from "react-router-dom";
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {fetchProducts} from "../redux/actions";
import RepoLink from "../Link";
import "./table.css";


const Table = () => {
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    const dispatch = useDispatch();
    const {products, total} = useSelector((state) => state.products);
    const columns = [
        {
            dataField: 'name',
            text: 'REPO Name',
            filter: textFilter({
                defaultValue: query.get('repository')
            }),
            style: (cell, row) => {
                return {
                    verticalAlign: "middle"
                }
            }
        },
        {
            dataField: 'owner.login',
            text: 'User Name',
            filter: textFilter({
                defaultValue: query.get('repository')
            }),
            style: () => {
                return {
                    verticalAlign: "middle"
                }
            }
        },
        {
            dataField: 'stargazers_count',
            text: 'Stars Count',
            style: () => {
                return {
                    verticalAlign: "middle"
                }
            }
        },
        {
            dataField: 'html_url',
            text: 'Link To Repo',
            formatter: (cell) => <RepoLink link={cell}/>,
            style: () => {
                return {
                    verticalAlign: "middle",
                    wordBreak: "break-all"
                }
            }
        }
    ];
    const [page, setPage] = useState(parseInt(query.get("page")) || 1);

    const pageLimit = (num) => {
        const p = num > 100 ? 1 : num
        setPage(p)
        dispatch(fetchProducts(p, 10, query.get('repository')))
        history.push(`/search?page=${p}&repository=${query.get('repository')}`)
    }
    useEffect(() => {
        pageLimit(parseInt(query.get("page")))
    }, []);


    const onTableChange = (type, {page}) => {
        if (!products.length) return
        pageLimit(page)
    }

    return (
        <React.Fragment>
            <Link to={'/'} className={'back-button'}>Back</Link>
            <Pagination
                columns={columns}
                data={products}
                page={page}
                totalSize={total}
                sizePerPage={10}
                onTableChange={onTableChange}
                filter={filterFactory()}
            />
        </React.Fragment>
    );

}

export default Table



