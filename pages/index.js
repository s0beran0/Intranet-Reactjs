import Head from 'next/head';
import React from 'react';
import Nav2 from '@/src/components/nav2/nav2';
import Nav from '@/src/components/nav/nav';
import Cube from '@/src/components/cube/cube';
import Inside from '@/src/components/inside/inside';
import Cubed from '@/src/components/cubed/cubed';
import { setInsideVisible } from '../src/components/moduleVisibilitySlice';
import { useSelector, useDispatch } from 'react-redux';


export default function Home() {


  const dispatch = useDispatch();
  const insideVisible = useSelector(state => state.moduleVisibility.insideVisible);

  const handleShowCubed = () => {
    dispatch(setInsideVisible(true));
  };

  const handleHideCubed = () => {
    dispatch(setInsideVisible(false));
  };


  return (
    <>
      <div>
        <Head>
          <title>Desafio React</title>
          <meta name="description" content="Desafio React para a empresa SEA tecnologia" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo-sea.svg" />
        </Head>
          <Nav2 />
          <Nav />
          <Cube />
          {!insideVisible && <Cubed />}
          {insideVisible && <Inside />}
      </div>
    </>
  );
}
