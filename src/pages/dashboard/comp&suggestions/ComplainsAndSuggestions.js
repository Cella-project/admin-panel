import React, { useEffect } from 'react';
import GreenCard from '../../../components/common/GreenCard';
import Search from '../../../components/common/Search';
import ListsCard from '../../../components/common/ListsCard';
import CompAndSuggCard from '../../../components/comp&suggestions/CompAndSuggCard';

import './ComplainsAndSuggestions.scss';

const ComplainsAndSuggestions = () => {
  useEffect(() => {
    document.title = 'Complains and Suggestions • Admin Panel';
  }, []);

  const compAndSuggCards = [
    { compORSuggShown: false, type: 'bi bi-lightbulb', title: 'Admin, admin', status: 'new', message: 'I have an idea' },
    { compORSuggShown: false, type: 'bi bi-exclamation-triangle-fill', title: 'Admin, admin', status: 'new', message: 'I have a problem' },
    { compORSuggShown: false, type: 'bi bi-lightbulb', title: 'Admin, admin', status: 'new', message: 'I have an idea' },
    { compORSuggShown: false, type: 'bi bi-exclamation-triangle-fill', title: 'Admin, admin', status: 'new', message: 'I have a problem' },
    { compORSuggShown: false, type: 'bi bi-lightbulb', title: 'Admin, admin', status: 'new', message: 'I have an idea' },
    { compORSuggShown: false, type: 'bi bi-exclamation-triangle-fill', title: 'Admin, admin', status: 'new', message: 'I have a problem' },
  ];

  let complains = 0;
  let suggests = 0;

  compAndSuggCards.map((card) => {
    (card.type === 'bi bi-exclamation-triangle-fill') ?
      complains++
      : suggests++

    return card;
  })

  const cards = [
    { title: 'Complains & Suggestions', content: compAndSuggCards.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: <i className="bi bi-lightbulb mint-green size-28px"> <i className="bi bi-exclamation-triangle-fill mint-green size-28px" style={{ marginLeft: '-20px' }} /> </i> },
    { title: 'Complains', content: complains.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: <i className="bi bi-exclamation-triangle-fill mint-green size-28px" /> },
    { title: 'Suggestions', content: suggests.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: <i className="bi bi-lightbulb mint-green size-28px" /> },
  ];

  return (
    <div className="comp full-width" >
      <div className="comp--braud-cramb gray inter size-16px font-bold">
        Complains & Suggestions
      </div>
      <div className="comp--cards">
        {
          cards.map((card, index) => {
            return (
              <GreenCard title={card.title} key={index}>
                <div className="full-width flex-row-center">
                  {card.icon}
                  <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                </div>
              </GreenCard>
            );
          })
        }
      </div>

      <div className='flex-row-left-start'>
        <Search width={'width-90-100'} />
      </div>

      <div className='flex-col-left-start inter gray'>
        {
          compAndSuggCards.map((compAndSuggCard, index) => {
            return (
              <ListsCard key={index}>
                <CompAndSuggCard
                  visible={compAndSuggCard.compORSuggShown}
                  type={compAndSuggCard.type}
                  title={compAndSuggCard.title}
                  message={compAndSuggCard.message}
                  status={compAndSuggCard.status}
                />
              </ListsCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default ComplainsAndSuggestions;