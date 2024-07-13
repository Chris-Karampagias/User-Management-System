import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
// import { useNavigate } from "react-router-dom";
import { updateUser as updateUserApi } from '../api';
import { updateUser } from '../models/user/actions';

export const useEditUser = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { isPending: isLoadingEditUser, mutate: editUser, isSuccess: editUserRequestFinished } = useMutation({
    mutationFn: (userData) => updateUserApi(userData),
    onSuccess: user => {
      dispatch(updateUser(user));
      // navigate(-1);
    }
  });

  return {
    isLoadingEditUser,
    editUser,
    editUserRequestFinished
  }
};