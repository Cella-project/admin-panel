import React, { useEffect, useState } from 'react';
import OrangeCard from '../../../components/common/OrangeCard';
import Search from '../../../components/common/Search';
import ListsCard from '../../../components/common/ListsCard';
import ReviewCard from '../../../components/reviews/ReviewCard';
import { useDispatch, useSelector } from 'react-redux';
import { driverMutations, productMutations, reviewMutations } from '../../../redux/mutations';
import { driverActions, productActions, reviewActions } from '../../../apis/actions';

import './Reviews.scss';
import { Link, useLocation } from 'react-router-dom';

const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.review.reviews);
  const driverData = useSelector(state => state.driver.driverData);
  const productData = useSelector(state => state.product.productData);

  const visible = false;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const driverID = searchParams.get('driver');
  const productID = searchParams.get('product');

  useEffect(() => {
    document.title = 'Reviews • Admin Panel';

    dispatch(reviewMutations.setReviews(null));

    if (driverID) {
      dispatch(reviewActions.getReviewsForDriver(driverID));
      dispatch(driverMutations.setDriverData(null));
      dispatch(driverActions.getDriverData(driverID));
    } else if (productID) {
      dispatch(reviewActions.getReviewsForProduct(productID));
      dispatch(productMutations.setProductData(null));
      dispatch(productActions.getProductData(productID));
    } else {
      dispatch(reviewActions.getReviews());
    }
  }, [dispatch, driverID, productID]);

  let content = <></>;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchReviewee, setSearchReviewee] = useState("");

  const handleSearch = (query, type, filter) => {
    setSearchQuery(query);
    setSearchType(type);
    setSearchStatus(filter.status);
    setSearchReviewee(filter.reviewee);
  };

  let cards = [
    { title: 'All Reviews', content: 0, icon: "bi bi-stars" },
    { title: 'Products Reviews', content: 0, icon: "bi bi-box-seam" },
    { title: 'Drivers Reviews', content: 0, icon: "bi bi-truck" },
    { title: 'Active Reviews', content: 0, icon: "bi bi-stars" },
    { title: 'InActive Reviews', content: 0, icon: "bi bi-stars" },
  ];

  if (reviews !== null && reviews.length === 0) {
    content = <div className='gray inter size-16px font-bold'>No reviews found</div>;
  }

  if (reviews !== null && reviews.length > 0) {
    const numOfReviews = reviews.length;
    const numOfActiveReviews = reviews.filter(review => review.status === 'Active').length;
    const numOfInActiveReviews = reviews.filter(review => review.status === 'InActive').length;
    const numOfProductsReviews = reviews.filter(review => review.reviewAt === 'Product').length;
    const numOfDriversReviews = reviews.filter(review => review.reviewAt === 'Driver').length;

    let filteredReviews = reviews;

    if (searchQuery !== "") {
      if (searchType === 'all') {
        filteredReviews = reviews.filter(review =>
          (review.reviewer.name + review.order.code + review.comment + review.code)?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        filteredReviews = reviews.filter(review =>
          review.reviewer.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    }

    if (searchStatus !== "" && searchStatus !== "all") {
      filteredReviews = filteredReviews.filter(review => {
        return (
          searchQuery === "" ? review.status === searchStatus :
            (review.status === searchStatus && (
              searchType === 'all' ?
                (review.reviewer.name + review.order.code + review.comment + review.code)?.toLowerCase().includes(searchQuery.toLowerCase()) :
                review.reviewer.name?.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        )
      });
    }

    if (searchReviewee !== "" && searchReviewee !== "all") {
      filteredReviews = filteredReviews.filter(review => {
        return (
          searchQuery === "" ? review.reviewAt === searchReviewee :
            (review.reviewAt === searchReviewee && (
              searchType === 'all' ?
                (review.reviewer.name + review.order.code + review.comment + review.code)?.toLowerCase().includes(searchQuery.toLowerCase()) :
                review.reviewer.name?.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        )
      });
    }

    content = filteredReviews.length === 0 ? 'No reviews found' :
      filteredReviews.map((review) => {
        return (
          <ListsCard key={review._id} >
            <ReviewCard review={review} visible={visible} role={false} />
          </ListsCard>
        );
      });

    cards = [
      { title: 'All Reviews', content: numOfReviews, icon: "bi bi-stars" },
      { title: 'Products Reviews', content: numOfProductsReviews, icon: "bi bi-box-seam" },
      { title: 'Drivers Reviews', content: numOfDriversReviews, icon: "bi bi-truck" },
      { title: 'Active Reviews', content: numOfActiveReviews, icon: "bi bi-stars" },
      { title: 'InActive Reviews', content: numOfInActiveReviews, icon: "bi bi-stars" },
    ];
  }

  let braudCramb = 'Reviews';

  if (reviews !== null) {
    if (driverID && driverData) {
      braudCramb = 
      <>
        <Link to={'/admin-panel/reviews'} className="gray inter pointer lists-card--link">
          Reviews
        </Link>
        <span> / </span>
        <span>{driverData.name}</span>
      </>
    } else if (productID && productData) {
      braudCramb =
        <>
          <Link to={'/admin-panel/reviews'} className="gray inter pointer lists-card--link">
            Reviews
          </Link>
          <span> / </span>
          <span>{productData.title}</span>
        </>
    }
  }

  return (
    <div className="reviews full-width" >
      <div className="reviews--braud-cramb gray inter size-16px font-bold">
        {braudCramb}
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
        <Search width={'width-90-100'} onSearch={handleSearch} page={'Reviews'} />
      </div>

      <div className='flex-col-left-start inter gray'>
        {content}
      </div>
    </div>
  )

}

export default Reviews;