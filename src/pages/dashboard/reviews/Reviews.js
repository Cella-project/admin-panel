import React, { useEffect } from 'react';
import OrangeCard from '../../../components/common/OrangeCard';
import Search from '../../../components/common/Search';
// import ListsCard from '../../../components/common/ListsCard';
// import ReviewCard from '../../../components/reviews/ReviewCard';
import { useDispatch, useSelector } from 'react-redux';
import { reviewMutations } from '../../../redux/mutations';
import { reviewActions } from '../../../apis/actions';

import './Reviews.scss';

const Reviews = () => {
  const dispatch = useDispatch();
  const reviewCards = useSelector(state => state.review.reviews);
  let active = 0;
  let deactivated = 0;
  let stores = 0;
  let products = 0;
  let drivers = 0;

  useEffect(() => {
    document.title = 'Reviews • Admin Panel';
    dispatch(reviewMutations.setReviews(null));
    dispatch(reviewActions.getReviews());
  }, [dispatch]);

  reviewCards.map((card) => {
    if (card.status === 'green') {
      active++;
    }
    if (card.status === 'red') {
      deactivated++;
    }
    if (card.type === 'bi bi-shop-window') {
      stores++;
    }
    if (card.type === 'bi bi-box-seam') {
      products++;
    }
    if (card.type === 'bi bi-truck') {
      drivers++;
    }

    return card;
  });

  const cards = [
    { title: 'All Reviews', content: reviewCards.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-stars" },
    { title: 'Stores Reviews', content: stores.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-shop-window" },
    { title: 'Products Reviews', content: products.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-box-seam" },
    { title: 'Drivers Reviews', content: drivers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-truck" },
    { title: 'Active Reviews', content: active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-stars" },
    { title: 'Deactivated Reviews', content: deactivated.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-stars" },
  ];

  return (
    <div className="reviews full-width" >
      <div className="reviews--braud-cramb gray inter size-16px font-bold">
        Reviews
      </div>
      <div className="reviews--cards">
        {
          cards.map((card, index) => {
            return (
              <OrangeCard title={card.title} key={index}>
                <div className="full-width flex-row-center">
                  <i className={`${card.icon} orange size-28px`}></i>
                  <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                </div>
              </OrangeCard>
            );
          })
        }
      </div>
      <div className='flex-row-left-start'>
        <Search width={'width-90-100'} />
      </div>

      <div className='flex-col-left-start inter gray'>
        {/* {
          reviewCards.map((reviewCard, index) => {
            return (
              <ListsCard key={index}>
                <ReviewCard
                  visible={reviewCard.reviewShown}
                  customer={reviewCard.customer}
                  type={reviewCard.type}
                  name={reviewCard.name}
                  rating={reviewCard.rating}
                  status={reviewCard.status}
                />
              </ListsCard>
            )
          })
        } */}
      </div>
    </div>
  )

}

export default Reviews