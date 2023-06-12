import React, { useState, useEffect } from 'react';
import Search from '../../../components/common/Search';
import ListsCard from '../../../components/common/ListsCard';
import { useDispatch, useSelector } from 'react-redux';
import { paymentActions } from '../../../apis/actions';
import { paymentMutations } from '../../../redux/mutations';
import Loading from '../../../components/global/Loading';
import GreenCard from '../../../components/common/GreenCard';
import PaymentCard from '../../../components/payments/PaymentCard';
import Popup from '../../../components/common/PopupForm';

import './Payments.scss';

const Payments = () => {
  const dispatch = useDispatch();
  const payments = useSelector(state => state.payment.payments);
  const [popupShown, setPopupShown] = useState(false);

  useEffect(() => {
    document.title = 'Payment Methods • Admin Panel';

    dispatch(paymentMutations.setPayments(null));
    dispatch(paymentActions.getPayments());
  }, [dispatch]);

  let content = <Loading />;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const handleSearch = (query, type, filter) => {
    setSearchQuery(query);
    setSearchType(type);
    setSearchStatus(filter.status);
  };

  let cards = [
    { title: 'Payment Methods', content: 0, icon: 'bi bi-wallet2' },
    { title: 'Active Payment Methods', content: 0, icon: 'bi bi-wallet2' },
    { title: 'Inactive Payment Methods', content: 0, icon: 'bi bi-wallet2' },
  ]

  if (payments !== null && payments.length === 0) {
    content = <div className='gray inter size-16px font-bold'>No payments found</div>;
  }

  if (payments !== null && payments.length > 0) {
    const numOfPayments = payments.length;
    const numOfActivePayments = payments.filter(payment => payment.status === 'Active').length;
    const numOfInactivePayments = payments.filter(payment => payment.status === 'InActive').length;


    if (payments && payments.length > 0) {
      const sortedPayments = [...payments].sort((a, b) => { return a.title.localeCompare(b.title) }); // sort by Title

      let filteredPayments = sortedPayments;
      if (searchQuery !== '' && searchType === 'all') {
        filteredPayments = filteredPayments.filter(payment =>
          payment.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (searchStatus !== '' && searchStatus !== 'all') {
        filteredPayments = filteredPayments.filter(payment =>
          payment.status === searchStatus && payment.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      content = filteredPayments.length === 0 ? 'No results found' :
        filteredPayments.map((payment) => {
          return (
            <ListsCard key={payment._id} >
              <PaymentCard payment={payment} />
            </ListsCard >
          );
        });
      cards = [
        { title: 'Payment Methods', content: numOfPayments, icon: 'bi bi-wallet2' },
        { title: 'Active Payment Methods', content: numOfActivePayments, icon: 'bi bi-wallet2' },
        { title: 'Inactive Payment Methods', content: numOfInactivePayments, icon: 'bi bi-wallet2' },
      ]
    }
  }

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
    <div className="payments full-width" >
      {popupShown &&
        <Popup popupToggle={setPopupShown} header={'Add Payment Method'} />
      }

      <div className="payments--braud-cramb gray inter size-16px font-bold">
        Payment Methods
      </div>

      <div className="payments--cards">
        {
          cards.map((card, index) => {
            return (
              <GreenCard title={card.title} key={index}>
                <div className="full-width flex-row-center">
                  <i className={`${card.icon} mint-green size-28px`}></i>
                  <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                </div>
              </GreenCard>
            );
          })
        }
      </div>

      <div className='flex-row-top-start'>
        <Search width={'width-90-100'} page={'Payments'} onSearch={handleSearch} />

        <div className='payments add-icon flex-row-center size-34px mint-green-bg radius-circular pointer' onClick={handleClick}>
          <i className="bi bi-plus-lg white" />
        </div>
      </div >

      <div className='flex-col-left-start inter gray width-80-100'>
        {content}
      </div>
    </div>
  )
}

export default Payments;