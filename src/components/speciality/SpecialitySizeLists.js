import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { specialityControlActions } from '../../apis/actions';
import './SpecialitySizeLists.scss';

const SpecialitySizeLists = ({ size }) => {
  const [editMode, setEditMode] = useState(false);
  const [SizeTitle, setSizeTitle] = useState(size.title.toUpperCase());
  

  const dispatch = useDispatch();

  const handleEditSize = (e) => {
    e.preventDefault();
    dispatch(specialityControlActions.updateSize({ _id: size._id, title: SizeTitle.toUpperCase() }, () => { setEditMode(false) }))
  }

  const handleDeleteSize = () => {
    dispatch(specialityControlActions.deleteSize(size._id));
  }

  return (
    <form noValidate onSubmit={handleEditSize} className='sizes-card lists-card--info gray shadow-5px size-16px margin-10px-V inter radius-15px white-bg flex-row-between2col'>
      <div className='margin-2px-V flex-row-left-start full-width'>
        <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Title: </span>
        <input
          className={`sizes-card--input${editMode ? '--editing' : ''} flex-row-left-start flex-wrap`}
          value={SizeTitle.toUpperCase()}
          onChange={(e) => setSizeTitle(e.target.value)}
          disabled={!editMode}
        />
        {editMode ?
          <div className='flex-row-center'>
            <input
              className='pointer white size-14px radius-15px orange-bg sizes-card--button-edit margin-6px-H'
              onClick={() => {
                setEditMode(false);
                setSizeTitle(size.title.toUpperCase());
              }}
              value='Cancel'
              type='button'
            />
            <button
              className='pointer size-14px white radius-15px orange-bg sizes-card--button-edit'
              disabled={SizeTitle === size.title}
              type='submit'
            >
              Save
            </button>
          </div>
          :
          <div className='flex-row-center'>
            <i
              className='bi bi-pencil-square pointer white size-18px radius-15px orange-bg sizes-card--button margin-6px-H'
              onClick={() => setEditMode(true)}
              value='Edit'
              type='button'
            />
            <i
              className='bi bi-trash pointer white size-18px radius-15px orange-bg sizes-card--button margin-6px-H'
              onClick={handleDeleteSize}
              value='Delete'
              type='button'
            />
          </div>
        }
      </div>
    </form>
  )
};

export default SpecialitySizeLists;
