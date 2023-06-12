import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import StarBorder from '@material-ui/icons/StarBorder';
import Canvas from '../common/Canvas';
import { useSelector } from 'react-redux';

import './StoreApplicationCard.scss';

const StoreApplicationCard = ({ storeApplicationCards, index }) => {
    const mode = useSelector(state => state.theme.mode);

    return (
        <div key={index} className='storeApplication-card width-90-100 shadow-5px margin-10px-V inter radius-15px white-bg pointer'>
            <Link to={`/stores/storeApplications/${storeApplicationCards._id}`} className='storeApplication-card--link full-width flex-row-between2col flex-wrap'>
                <div className='storeApplication-card--img flex-row-center'>
                    {storeApplicationCards.logo === 'No Image' ?
                        <Canvas name={storeApplicationCards.storeName} width={130} height={130} fontSize={'100px'} />
                        :
                        <img src={storeApplicationCards.logo} className='white-bg' alt="" />
                    }
                    <div className={`storeApplication-card--status ${storeApplicationCards.status === 'Approved' ? 'green-bg' : (storeApplicationCards.status === 'Pending' ? 'yellow-bg' : 'red-bg')} shadow-5px radius-circular`}></div>
                </div>
                <div className='storeApplication-card--cont flex-row-between2col'>
                    <div className='storeApplication-card--storeApplication-info full-width flex-col-left-start'>
                        <div className='flex-row-left-start full-width'>
                            <span className={`size-22px ${mode === 'dark-mode' ? 'gray' : 'mint-green'} text-shadow font-bold`}>{storeApplicationCards.storeName}</span>
                        </div>
                        <div className='storeApplication-card--owner-info size-14px flex-col-left-start'>
                            <span className='gray margin-2px-V'>
                                <span className='gray'>Owner Name: </span>
                                {storeApplicationCards.owner.name}
                            </span>
                            <span className='gray margin-2px-V'>
                                <span className='gray'>Phone: </span>
                                {storeApplicationCards.owner.phoneNum}
                            </span>
                            <span className='gray margin-2px-V'>
                                <span className='gray'>Specialty: </span>
                                {storeApplicationCards.speciality.title}
                            </span>
                            <span className='gray margin-2px-V'>
                                {storeApplicationCards.addresses && storeApplicationCards.addresses.length > 0 && <span className='gray'>City:  {storeApplicationCards.addresses[0].city}</span>}
                            </span>
                        </div>
                    </div>
                    <div className='flex-row-between storeApplication-card--cont2'>
                        <div className='storeApplication-card--rating flex-row-left-start size-16px font-bold'>
                            <Rating name="rating" emptyIcon={<StarBorder className='gray' fontSize='inherit' />} style={{ color: '#FDCC0D' }} value={storeApplicationCards.rating} precision={0.5} size={"medium"} readOnly />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default StoreApplicationCard;