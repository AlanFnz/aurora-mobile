import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store/index';
import { bootstrapAsync } from '@store/authSlice';
import { setFolders } from '@store/foldersSlice';
import mockData from '@screens/HomeScreen/mockData';

const AppInitializer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(bootstrapAsync());
    dispatch(setFolders(mockData));
  }, [dispatch]);

  return null;
};

export default AppInitializer;
