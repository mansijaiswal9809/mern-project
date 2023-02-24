import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from '@mui/material';
import { PaginationItem } from '@mui/lab';
import { Link } from "react-router-dom";
import { getPosts } from "../reducer/posts";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page]);

  return (
    <Pagination
      sx={{display:"flex", justifyContent:"space-around"}}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
