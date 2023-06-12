import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { specialityControlActions } from '../../apis/actions';
import './SpecialityMaterialLists.scss';

const SpecialityMaterialLists = ({ material }) => {
  const [editMode, setEditMode] = useState(false);
  const [materialTitle, setMaterialTitle] = useState(material.title.toUpperCase());

  const dispatch = useDispatch();

  const handleEditMaterial = (e) => {
    e.preventDefault();
    dispatch(specialityControlActions.updateMaterial({ _id: material._id, title: materialTitle.toUpperCase() }, () => { setEditMode(false) }))
  }

  const handleDeleteMaterial = () => {
    dispatch(specialityControlActions.deleteMaterial(material._id));
  }

  return (
    <form noValidate onSubmit={handleEditMaterial} className='materials-card lists-card--info gray shadow-5px size-16px margin-10px-V inter radius-15px white-bg flex-row-between2col'>
      <div className='margin-2px-V flex-row-left-start full-width'>
        <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Title: </span>
        <input
          className={`materials-card--input${editMode ? '--editing' : ''} flex-row-left-start flex-wrap`}
          value={materialTitle.toUpperCase()}
          onChange={(e) => setMaterialTitle(e.target.value)}
          disabled={!editMode}
        />
        {editMode ?
          <div className='flex-row-center'>
            <input
              className='pointer white size-14px radius-15px mint-green-bg materials-card--button-edit margin-6px-H'
              onClick={() => {
                setEditMode(false);
                setMaterialTitle(material.title.toUpperCase());
              }}
              value='Cancel'
              type='button'
            />
            <button
              className='pointer size-14px white radius-15px mint-green-bg materials-card--button-edit'
              disabled={materialTitle === material.title}
              type='submit'
            >
              Save
            </button>
          </div>
          :
          <div className='flex-row-center'>
            <i
              className='bi bi-pencil-square pointer white size-18px radius-15px mint-green-bg materials-card--button margin-6px-H'
              onClick={() => setEditMode(true)}
              value='Edit'
              type='button'
            />
            <i
              className='bi bi-trash pointer white size-18px radius-15px mint-green-bg materials-card--button margin-6px-H'
              onClick={handleDeleteMaterial}
              value='Delete'
              type='button'
            />
          </div>
        }
      </div>
    </form>
  )
};

export default SpecialityMaterialLists;
