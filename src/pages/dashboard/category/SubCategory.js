import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrangeCard from '../../../components/common/OrangeCard';
import Search from '../../../components/common/Search';
import CategoryCard from '../../../components/category/SubCategoryCard'
import Popup from '../../../components/common/PopupForm';
import ListsCard from '../../../components/common/ListsCard';
import Loading from '../../../components/global/Loading';
import { mainCategoryActions, subCategoryActions } from '../../../apis/actions';
import { mainCategoryMutations, subCategoryMutations } from '../../../redux/mutations';

import { useDispatch, useSelector } from 'react-redux';

import './SubCategory.scss'

const SubCategory = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const subCategories = useSelector((state) => state.subCategory.subCategories);
    const mainCategoryData = useSelector((state) => state.mainCategory.mainCategoryData);

    useEffect(() => {
        dispatch(subCategoryMutations.setSubCategories(null));
        dispatch(subCategoryActions.getSubCategories(params.id));
        dispatch(mainCategoryMutations.setMainCategoryData(null));
        dispatch(mainCategoryActions.getMainCategoryById(params.id));
    }, [dispatch, params.id]);

    mainCategoryData && mainCategoryData !== null && (document.title = `${mainCategoryData.title} • Admin Panel`);

    let cards = [
        { title: 'Sub Categories', content: 0, icon: 'bi bi-patch-check' },
        { title: 'Active Sub Categories', content: 0, icon: 'bi bi-patch-check' },
        { title: 'Inactive Sub Categories', content: 0, icon: 'bi bi-patch-check' },
    ];

    let content = <Loading />;

    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const handleSearch = (query, type, filter) => {
        setSearchQuery(query);
        setSearchType(type);
        setSearchStatus(filter.status);
    };

    if (subCategories !== null && subCategories.length === 0 && mainCategoryData && mainCategoryData !== null) {
        content = <div className='gray inter size-16px font-bold'>Found no Sub Category.</div>;
    }

    //Before loading the data from the server, show a loading spinner
    if (subCategories !== null && mainCategoryData && mainCategoryData !== null) {
        if (subCategories?.length > 0) {
            const sortedSubCategories = [...subCategories].sort((a, b) => a.title.localeCompare(b.title)); // sort by Title

            let filteredCategories = sortedSubCategories;
            if (searchQuery !== "" && searchType === "all") {
                filteredCategories = filteredCategories.filter((category) => {
                    return category.title?.toLowerCase().includes(searchQuery.toLowerCase());
                });
            }
            if (searchStatus !== "" && searchStatus !== "all") {
                filteredCategories = filteredCategories.filter((category) => {
                    return (
                        category.status === searchStatus && category.title?.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                });
            }

            content = filteredCategories.length === 0 ? 'No results found.' :
                filteredCategories.map((subCategory, index) => {
                    return (
                        <ListsCard key={subCategory._id} >
                            <CategoryCard key={index} category={subCategory} />
                        </ListsCard>
                    );
                });
        }

        cards = [
            { title: 'Sub Categories', content: subCategories.length, icon: 'bi bi-patch-check' },
            { title: 'Active Sub Categories', content: subCategories.filter((subCategory) => subCategory.status === 'Active').length, icon: 'bi bi-patch-check' },
            { title: 'Inactive Sub Categories', content: subCategories.filter((subCategory) => subCategory.status === 'InActive').length, icon: 'bi bi-patch-check' },
        ];
    }

    const [popupShown, setPopupShown] = useState(false);
    const handleClick = () => {
        setPopupShown(true)
        document.getElementById('dashboard-view').style.zIndex = 60;
        const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
        const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
        window.onscroll = () => {
            window.scrollTo(LeftScroll, TopScroll);
        };
    }
    return (
        <div className="sub-category full-width">
            {popupShown &&
                <Popup popupToggle={setPopupShown} header={'Add Sub Category'} data={mainCategoryData} />
            }
            <div className="sub-category--braud-cramb gray inter size-16px font-bold">
                {(mainCategoryData && mainCategoryData !== null) && ('Specialties > ' + mainCategoryData.parent.title + ' > ' + mainCategoryData.title + ' / Sub Categories')}
            </div>

            <div className="sub-category--cards">
                {cards.map((card, index) => {
                    return (
                        <OrangeCard title={card.title} key={index}>
                            <div className="full-width flex-row-center">
                                <i className={`${card.icon} orange size-28px`}></i>
                                <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                            </div>
                        </OrangeCard>
                    );
                })}
            </div>

            <div className="flex-row-top-start">
                <Search width={'width-90-100'} page={'Categories'} onSearch={handleSearch} />

                <div className="sub-category add-icon flex-row-center size-34px orange-bg radius-circular pointer" onClick={handleClick}>
                    <i className="bi bi-plus-lg white" ></i>
                </div>
            </div>

            <div className="flex-col-left-start inter gray width-80-100">
                {content}
            </div>
        </div>
    );
};

export default SubCategory
