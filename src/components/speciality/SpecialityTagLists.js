import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { specialityControlActions } from '../../apis/actions';
import './SpecialityTagLists.scss';

const SpecialityTagLists = ({ tag }) => {
  const [editMode, setEditMode] = useState(false);
  const [tagTitle, setTagTitle] = useState(tag.title.toUpperCase());

  const dispatch = useDispatch();

  const handleEditTag = (e) => {
    e.preventDefault();
    dispatch(specialityControlActions.updateTag({ _id: tag._id, title: tagTitle.toUpperCase() }, () => { setEditMode(false) }))
  }

  const handleDeletetag = () => {
    dispatch(specialityControlActions.deleteTag(tag._id));
  }

  return (
    <form noValidate onSubmit={handleEditTag} className='tags-card lists-card--info gray shadow-5px size-16px margin-10px-V inter radius-15px white-bg flex-row-between2col'>
      <div className='margin-2px-V flex-row-left-start full-width'>
        <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Title: </span>
        <input
          className={`tags-card--input${editMode ? '--editing' : ''} flex-row-left-start flex-wrap`}
          value={tagTitle.toUpperCase()}
          onChange={(e) => setTagTitle(e.target.value)}
          disabled={!editMode}
        />
        {editMode ?
          <div className='flex-row-center'>
            <input
              className='pointer white size-14px radius-15px orange-bg tags-card--button-edit margin-6px-H'
              onClick={() => {
                setEditMode(false);
                setTagTitle(tag.title.toUpperCase());
              }}
              value='Cancel'
              type='button'
            />
            <button
              className='pointer size-14px white radius-15px orange-bg tags-card--button-edit'
              disabled={tagTitle === tag.title}
              type='submit'
            >
              Save
            </button>
          </div>
          :
          <div className='flex-row-center'>
            <i
              className='bi bi-pencil-square pointer white size-18px radius-15px orange-bg tags-card--button margin-6px-H'
              onClick={() => setEditMode(true)}
              value='Edit'
              type='button'
            />
            <i
              className='bi bi-trash pointer white size-18px radius-15px orange-bg tags-card--button margin-6px-H'
              onClick={handleDeletetag}
              value='Delete'
              type='button'
            />
          </div>
        }
      </div>
    </form>
  )
}

export default SpecialityTagLists
