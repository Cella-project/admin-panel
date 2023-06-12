import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { specialityControlActions } from '../../apis/actions';
import Popup from '../common/PopupForm';
import './SpecialityColorLists.scss';

const SpecialitycolorLists = ({ color }) => {
    const [header, setHeader] = useState('');
    const [popupShown, setPopupShown] = useState(false);
    const dispatch = useDispatch();

    const handleEditcolor = (e) => {
        setPopupShown(true);
        setHeader('Edit Speciality Color');
        document.getElementById('dashboard-view').style.zIndex = 60;
        const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
        const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
        window.onscroll = () => {
            window.scrollTo(LeftScroll, TopScroll);
        };
    }

    const handleDeletecolor = () => {
        dispatch(specialityControlActions.deleteColor(color._id));
    }

    return (
        <div>
            {popupShown &&
                <Popup popupToggle={setPopupShown} header={header} data={color} />
            }
            <form noValidate className='colors-card lists-card--info gray shadow-5px size-16px margin-10px-V inter radius-15px white-bg flex-row-left-start2col'>
                <div className='margin-2px-V flex-row-left-start full-width'>
                    <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Hex: </span>
                    <div style={{ backgroundColor: color.hexCode }} className={`colors-card--hex flex-row-left-start flex-wrap radius-15px`} />
                    <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Title: </span>
                    <div className={`colors-card--input flex-row-center flex-wrap`}>
                        {color.title.toUpperCase()}
                    </div>
                    <i
                        className='bi bi-pencil-square pointer white size-18px radius-15px mint-green-bg colors-card--button margin-6px-H'
                        onClick={handleEditcolor}
                        value='Edit'
                        type='button'
                    />
                    <i
                        className='bi bi-trash pointer white size-18px radius-15px mint-green-bg colors-card--button margin-6px-H'
                        onClick={handleDeletecolor}
                        value='Delete'
                        type='button'
                    />
                </div>

            </form>
        </div>
    )
}

export default SpecialitycolorLists
