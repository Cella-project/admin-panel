import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Popup from "../../../components/common/PopupForm";
import OrangeCard from "../../../components/common/OrangeCard";
import { useSelector, useDispatch } from 'react-redux';
import SpecialityCard from "../../../components/speciality/SpecialityCard";
import SpecialityColorLists from "../../../components/speciality/SpecialityColorLists";
import SpecialityTagLists from "../../../components/speciality/SpecialityTagLists";
import SpecialityMaterialLists from "../../../components/speciality/SpecialityMaterialLists";
import SpecialtiesSizeLists from "../../../components/speciality/SpecialitySizeLists";

import { specialityActions, specialityControlActions } from '../../../apis/actions';
import { specialityMutations, specialityControlMutations } from '../../../redux/mutations';
import './SpecialityControl.scss'
import Loading from "../../../components/global/Loading";

const SpecialityControl = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const specialties = useSelector(state => state.speciality.specialties);
	const specialityData = useSelector(state => state.speciality.specialityData);
	const colors = useSelector(state => state.specialityControl.colors);
	const tags = useSelector(state => state.specialityControl.tags);
	const materials = useSelector(state => state.specialityControl.materials);
	const sizes = useSelector(state => state.specialityControl.sizes);
	const [popupShown, setPopupShown] = useState(false);
	const [header, setHeader] = useState('');


	useEffect(() => {
		dispatch(specialityMutations.setSpecialties(null));
		dispatch(specialityActions.getSpecialties());
		dispatch(specialityMutations.setSpecialityData(null));
		dispatch(specialityActions.getSpecialityData(params.id));
		dispatch(specialityControlMutations.setColors(null));
		dispatch(specialityControlMutations.setTags(null));
		dispatch(specialityControlMutations.setMaterials(null));
		dispatch(specialityControlMutations.setSizes(null));
		dispatch(specialityControlActions.getColors(params.id));
		dispatch(specialityControlActions.getTags(params.id));
		dispatch(specialityControlActions.getMaterials(params.id));
		dispatch(specialityControlActions.getSizes(params.id));
	}, [dispatch, params.id]);


	useEffect(() => {
		if (specialityData) {
			specialityData && (document.title = `${specialityData.title} • Speciality Control • Admin Panel`);
		}
	}, [specialityData]);


	const addColor = () => {
		setPopupShown(true);
		setHeader('Add Speciality Color');
		document.getElementById('dashboard-view').style.zIndex = 60;
		const TopScroll = document.documentElement.scrollTop || document.body.scrollTop;
		const LeftScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
		window.onscroll = () => {
			window.scrollTo(LeftScroll, TopScroll);
		};
	}
	const addTag = () => {
		setPopupShown(true);
		setHeader('Add Speciality Tag');
		document.getElementById('dashboard-view').style.zIndex = 60;
		const TopScroll = document.documentElement.scrollTop || document.body.scrollTop;
		const LeftScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
		window.onscroll = () => {
			window.scrollTo(LeftScroll, TopScroll);
		};
	}
	const addMaterial = () => {
		setPopupShown(true);
		setHeader('Add Speciality Material');
		document.getElementById('dashboard-view').style.zIndex = 60;
		const TopScroll = document.documentElement.scrollTop || document.body.scrollTop;
		const LeftScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
		window.onscroll = () => {
			window.scrollTo(LeftScroll, TopScroll);
		};
	}
	const addSize = () => {
		setPopupShown(true);
		setHeader('Add Speciality Size');
		document.getElementById('dashboard-view').style.zIndex = 60;
		const TopScroll = document.documentElement.scrollTop || document.body.scrollTop;
		const LeftScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
		window.onscroll = () => {
			window.scrollTo(LeftScroll, TopScroll);
		};
	}

	let content = <Loading />;

	if (specialties && specialityData && specialityData !== null) {
		content = (
			<>
				<div className="full-width flex-row-left-start2col">
					{
						specialties && specialityData && specialties.filter((speciality) =>
							speciality._id === specialityData._id
						).map((speciality) => (
							<SpecialityCard key={speciality._id} speciality={speciality} />
						))
					}
				</div>
				<div className="full-width flex-row-left-start2col">
					<div className="flex-row-top-between2col full-width">
						<OrangeCard title="Colors" icon={'bi bi-plus-circle'} iconClickHandle={addColor}>
							{colors &&
								colors !== null ? colors.map((color) =>
									<SpecialityColorLists color={color} key={color._id} />
								) : <Loading />
							}
						</OrangeCard>

						<OrangeCard className="speciality-control--tags full-width flex-row-center margin-6px-H flex-wrap" title="Tags" icon={'bi bi-plus-circle'} iconClickHandle={addTag}>
							{tags &&
								tags !== null ? tags.map((tag) =>
									<SpecialityTagLists tag={tag} key={tag._id} />
								) : <Loading />
							}
						</OrangeCard>

						<OrangeCard className="speciality-control--tags full-width flex-row-center margin-6px-H flex-wrap" title="Materials" icon={'bi bi-plus-circle'} iconClickHandle={addMaterial}>
							{materials &&
								materials !== null ? materials.map((material) =>
									<SpecialityMaterialLists material={material} key={material._id} />
								) : <Loading />
							}
						</OrangeCard>

						<OrangeCard className="speciality-control--tags full-width flex-row-center margin-6px-H flex-wrap" title="Sizes" icon={'bi bi-plus-circle'} iconClickHandle={addSize}>
							{sizes &&
								sizes !== null ? sizes.map((size) =>
									<SpecialtiesSizeLists size={size} key={size._id} />
								) : <Loading />
							}
						</OrangeCard>


					</div>
				</div>

			</>
		)
	}

	return (
		<div className="speciality-control--container full-width flex-col-left-start2col">
			{popupShown &&
				<Popup popupToggle={setPopupShown} header={header} data={specialityData} />
			}
			<div className="main-category--braud-cramb gray inter size-16px font-bold">
				{(specialityData && specialityData !== null) && ('Specialties > ' + specialityData.title + ' / Speciality Control')}
			</div>
			{content}
		</div >
	);
};

export default SpecialityControl;