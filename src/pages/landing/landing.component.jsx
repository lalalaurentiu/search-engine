import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/footer/footer.component';
import { TopBar } from '../../components/header/topbar.component';
import { Search } from '../../components/search/search.component';
import { clearJobs, updateTotalCompanies, updateTotalRomania } from '../../state/jobs.slice';
import { setPageToOne, updatCity, updateCounty, } from '../../state/query.slice';
import { createQueryString } from '../../utils/create-query-string';
import { getTotalCompanies, getTotalRomania } from '../../utils/get-data';
import { Banner } from './components/banner/banner.component';
import { Rocket } from './components/rocket/rocket.component';
import { Title } from './components/title/title.component';
import './landing.style.scss';

export const LandingPage = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const queries = useSelector((state) => state.query);

    const allJobs = useSelector((state) => state.jobs.allJobs);

    useEffect(() => {
        dispatch(setPageToOne());
        dispatch(updatCity(''));
        dispatch(updateCounty(''));
        dispatch(clearJobs());
        getTotalRomania().then((totalRomania) => {
            dispatch(updateTotalRomania(totalRomania))
        });
        getTotalCompanies().then((totalCompanies) => {
            dispatch(updateTotalCompanies(totalCompanies));
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSearchClick = () => {
        navigate(`${queries ? `rezultate?${createQueryString(queries)}` : 'rezultate'}`)
    }

    return (
        <section className='landing-page'>
            <TopBar isBorder={true} />
            <section className='main-wrapper'>
                <main className='main'>
                    <Title allJobs={allJobs} />
                    <Search handleClick={handleSearchClick} queries={queries} />
                </main>
                <Rocket />
            </section>
            <Banner />
            <Footer />
        </section>
    )
};