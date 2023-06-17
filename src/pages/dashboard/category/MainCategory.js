import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrangeCard from '../../../components/common/OrangeCard';
import Search from '../../../components/common/Search';
import CategoryCard from '../../../components/category/MainCategoryCard'
import Popup from '../../../components/common/PopupForm';
import ListsCard from '../../../components/common/ListsCard';
import Loading from '../../../components/global/Loading';
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { mainCategoryActions } from '../../../apis/actions';
import { mainCategoryMutations } from '../../../redux/mutations';
import { specialityMutations } from '../../../redux/mutations';
import { specialityActions } from '../../../apis/actions';
import './MainCategory.scss'

const MainCategory = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const mainCategories = useSelector((state) => state.mainCategory.mainCategories);
    const specialityData = useSelector((state) => state.speciality.specialityData);

    const mode = useSelector((state) => state.theme.mode);

    useEffect(() => {
        dispatch(mainCategoryMutations.setMainCategories(null));
        dispatch(mainCategoryActions.getMainCategories(params.id));
        dispatch(specialityMutations.setSpecialityData(null));
        dispatch(specialityActions.getSpecialityData(params.id));
    }, [dispatch, params.id]);

    specialityData && specialityData !== null && (document.title = `${specialityData.title} • Admin Panel`);

    let cards = [
        { title: 'Main Categories', content: 0, icon: 'bi bi-patch-check' },
        { title: 'Active Main Categories', content: 0, icon: 'bi bi-patch-check' },
        { title: 'Inactive Main Categories', content: 0, icon: 'bi bi-patch-check' },
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

    if (mainCategories !== null && mainCategories.length === 0 && specialityData && specialityData !== null) {
        content = <div className='gray inter size-16px font-bold'>Found no Main Category.</div>;
    }

    //Before loading the data from the server, show a loading spinner
    if (mainCategories !== null && specialityData && specialityData !== null) {
        if (mainCategories?.length > 0) {
            const sortedMainCategories = [...mainCategories].sort((a, b) => a.title.localeCompare(b.title)); // sort by Title

            let filteredCategories = sortedMainCategories
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

            content = filteredCategories.length === 0 ? 'No resaults found.' :
                filteredCategories.map((mainCategory, index) => {
                    return (
                        <ListsCard key={mainCategory._id} >
                            <CategoryCard key={index} category={mainCategory} />
                        </ListsCard>
                    );
                });
        }

        cards = [
            { title: 'Main Categories', content: mainCategories.length, icon: 'bi bi-patch-check' },
            { title: 'Active Main Categories', content: mainCategories.filter((mainCategory) => mainCategory.status === 'Active').length, icon: 'bi bi-patch-check' },
            { title: 'Inactive Main Categories', content: mainCategories.filter((mainCategory) => mainCategory.status === 'InActive').length, icon: 'bi bi-patch-check' },
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
        <div className="main-category full-width">
            {popupShown &&
                <Popup popupToggle={setPopupShown} header={'Add Main Category'} data={specialityData} />
            }

            <div className="main-category--braud-cramb gray inter size-16px font-bold">
                {(specialityData && specialityData !== null) && ('Specialties > ' + specialityData.title + ' / Main Categories')}
            </div>

            <div className="main-category--cards">
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
                {specialityData && specialityData._id &&
                    <Link to={`/specialty/specialtyControl/${specialityData._id}`} className={`flex-row-center main-category--control full-width orange-bg ${mode === 'dark-mode' ? 'gray' : 'white'} inter pointer radius-10px shadow-2px`}>
                        Speciality Control
                    </Link>
                }
            </div>

            <div className="flex-row-top-start">
                <Search width={'width-90-100'} page={'Categories'} onSearch={handleSearch} />

                <div className="main-category add-icon flex-row-center size-34px orange-bg radius-circular pointer" onClick={handleClick}>
                    <i className="bi bi-plus-lg white" ></i>
                </div>
            </div>

            <div className="flex-col-left-start inter gray width-80-100">
                {content}
            </div>
        </div>
    );
};

export default MainCategory;
