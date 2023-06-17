import React, { useEffect } from 'react';
import OrangeCard from '../../../components/common/OrangeCard';
import ListsCard from '../../../components/common/ListsCard';
import Search from '../../../components/common/Search';
import VoucherCard from '../../../components/vouchers/VoucherCard';
import './Vouchers.scss';

export const voucherCards = [
  { id: '1', type: 'bi bi-shop-window', status: 'red', store: 'Dima', value: '50%', code: '#ssadfds' },
  { id: '2', type: 'bi bi-shop-window', status: 'red', store: 'Open Shop', value: '50%', code: '#ssadfds' },
  { id: '3', type: 'bi bi-shop-window', status: 'red', store: 'Mr & Mrs', value: '50%', code: '#ssadfds' },
  { id: '4', type: 'bi bi-globe', status: 'green', store: 'Any Product', value: '20%', code: '#ssadfds' },
  { id: '5', type: 'bi bi-globe', status: 'red', store: 'Any Product', value: '30%', code: '#ssadfds' },
  { id: '6', type: 'bi bi-shop-window', status: 'green', store: 'Dima', value: '10%', code: '#ssadfds' },
  { id: '7', type: 'bi bi-shop-window', status: 'green', store: 'Open Shop', value: '10%', code: '#ssadfds' },
  { id: '8', type: 'bi bi-shop-window', status: 'green', store: 'Mr & Mrs', value: '10%', code: '#ssadfds' },
];

const Vouchers = () => {
  let active = 0;
  let deactivated = 0;

  useEffect(() => {
    document.title = 'Vouchers • Admin Panel';
  }, []);

  voucherCards.map((card) => {
    if (card.status === 'green') {
      active++;
    }
    if (card.status === 'red') {
      deactivated++;
    }
    return card
  })

  const cards = [
    { title: 'Vouchers', content: voucherCards.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-tags" },
    { title: 'Active Vouchers', content: active, icon: "bi bi-tags" },
    { title: 'Deactivated Vouchers', content: deactivated, icon: "bi bi-tags" },
  ];

  return (
    <div className="vouchers full-width" >
      <div className="vouchers--braud-cramb gray inter size-16px font-bold">
        Vouchers
      </div>
      <div className="vouchers--cards">
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
      <div className='flex-row-top-start'>
        <Search width={'width-90-100'} />

        <div className='vouchers add-icon flex-row-center size-34px orange-bg radius-circular pointer'>
          <i className="bi bi-plus-lg white"></i>
        </div>
      </div>

      <div className='flex-col-left-start inter gray'>
        {
          voucherCards.map((voucherCard, index) => {
            return (
              <ListsCard key={index}>
                <VoucherCard
                  type={voucherCard.type}
                  status={voucherCard.status}
                  store={voucherCard.store}
                  value={voucherCard.value}
                  code={voucherCard.code}
                  img={voucherCard.img}
                />
              </ListsCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default Vouchers;