import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import StarBorder from '@material-ui/icons/StarBorder';

import './ReviewCard.scss';
import Canvas from '../common/Canvas';
import { useDispatch, useSelector } from 'react-redux';
import { driverMutations, productMutations } from '../../redux/mutations';
import { driverActions, productActions, reviewActions } from '../../apis/actions';

const ReviewCard = ({ review, visible, role }) => {
    const [reviewShown, setreviewShown] = useState(visible);
    const dispatch = useDispatch();
    const driverData = useSelector(state => state.driver.driverData);
    const productData = useSelector(state => state.product.productData);
    const mode = useSelector(state => state.theme.mode);

    const toggleReview = () => {
        setreviewShown(!reviewShown);
    }

    useEffect(() => {
        if (review.reviewAt === 'Driver' && !role) {
            dispatch(driverMutations.setDriverData(null))
            dispatch(driverActions.getDriverData(review.revieweeId))
        }
        if (review.reviewAt === 'Product' && !role) {
            dispatch(productMutations.setProductData(null))
            dispatch(productActions.getProductData(review.revieweeId))
        }
    }, [dispatch, review.reviewAt, review.revieweeId, role])

    const handleChangeState = () => {
        dispatch(reviewActions.changeReviewState(review._id))
    }

    const handleDelete = () => {
        dispatch(reviewActions.deleteReview(review._id))
    }

    return (
        <>
            <div className='flex-row-left-start full-width'>
                <div className='review-lists-card--img radius-circular flex-row-center'>
                    <Canvas name={review.reviewer.name} borderRadius='50%' width={55} height={55} fontSize={'42px'} />
                    <div className={`${review.status === 'Active' ? 'green' : 'red'}-bg lists-status radius-circular`}></div>
                </div>
                <div className='review-lists-card gray shadow-2px margin-10px-V inter radius-15px white-bg full-width flex-col-left-start flex-wrap'>
                    <div className='review-lists-card--info flex-row-between2col full-width flex-wrap pointer' onClick={toggleReview}>
                        <div className='review-lists-card--cont margin-2px-V'>
                            <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Reviewer: </span>{review.reviewer.name}
                        </div>
                        {review.reviewAt &&
                            <div className='review-lists-card--cont margin-2px-V'>
                                <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Type: </span>
                                <i className={`${review.reviewAt === 'Driver' ? 'bi bi-truck' : 'bi bi-box-seam'} orange size-30px`} />
                            </div>
                        }
                        {review.revieweeId && review.reviewAt &&
                            <div className='review-lists-card--cont margin-2px-V'>
                                <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Reviewee: </span>{review.reviewAt === 'Driver' ? driverData?.name : productData?.title}
                            </div>
                        }
                        <div className='flex-row-between2col review-lists-card--rating-cont flex-wrap'>
                            <div className='review-lists-card--cont margin-2px-V font-bold flex-row-left-start'>
                                <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Rating: </span>
                                <div className='flex-row-left-start flex-wrap'>
                                    <Rating name="rating" emptyIcon={<StarBorder className='gray' fontSize='inherit' />} style={{ color: '#FDCC0D' }} value={review.rate} precision={0.5} size={"small"} readOnly />
                                    <span className='size-12px gray font-bold margin-4px-H'>{review.rate}</span>
                                </div>
                            </div>
                            <div className='review-lists-card--arrow margin-2px-V size-14px font-bold'>
                                <i className={`bi bi-chevron-${reviewShown ? 'up' : 'down'} gray`} />
                            </div>
                        </div>
                    </div>
                    {reviewShown &&
                        <div className='full-width flex-row-between2col review-lists-card--exp'>
                            <div className='review-lists-card--content text-shadow shadow-5px radius-15px size-14px'>
                                {review.comment}
                            </div>
                            <div className='flex-col-center review-lists-card--btns'>
                                <div className={`review-lists-card--btn flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} orange-bg radius-circular pointer`} onClick={handleChangeState}>
                                    <i className="bi bi-arrow-clockwise size-24px"></i>
                                    <div className='review-lists-card--btn--tag change flex-row-center inter size-12px radius-5px shadow-5px'>
                                        Change State
                                    </div>
                                </div>
                                <div className={`review-lists-card--btn flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} orange-bg radius-circular pointer`} onClick={handleDelete}>
                                    <i className="bi bi-trash size-24px"></i>
                                    <div className='review-lists-card--btn--tag delete flex-row-center inter size-12px radius-5px shadow-5px'>
                                        Delete
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>

    )
}

export default ReviewCard;